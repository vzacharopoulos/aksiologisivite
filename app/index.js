import express from 'express';
import cors from 'cors';
import sql from 'mssql';
import {dirname} from 'path'
import path from 'path'
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import os from 'os';


dotenv.config();                // load env before using process.env

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER, // e.g. 'localhost'
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // required for Azure
    trustServerCertificate: true // for local dev
  }
};


  // GET /api/managers
app.get('/query', async (req, res) => {
  const thesi = req.query.thesi;           // e.g. "πριόνι", "αφρός", or "ρολλά"
  if (!thesi) {
    return res.status(400).json({ error: "Missing 'thesi' query parameter" })
  }
  try {
     await sql.connect(dbConfig);  // ensure DB connection
    const request = new sql.Request();
    const result = await request
      .input('thesi', sql.NVarChar, thesi)
      .query(`SELECT firstName, lastName 
              FROM Employees 
              WHERE ThesiErgasias = @thesi`);
      
    // result.recordset is an array of rows
    res.json(result.recordset);
  } catch (error) {
    console.error('Error running query', error);
    res.status(500).json({ message: 'Database error' });
  }
});






// Assuming `sql` from 'mssql' is already connected to the database
app.post('/submit', async (req, res) => {
  const { firstName, lastName, thesiErgasias, sqlDate, currentShift, labeledQuestions,answersArray } = req.body;
 
  if (!Array.isArray(answersArray)) {
    return res.status(400).json({ error: "Invalid payload: 'answers' should be an array." });
  }

  // Validate each answer object
  for (const [index, ans] of answersArray.entries()) {
    if (!ans || ans.questionId == null || ans.answer == null) {
      return res.status(400).json({ error: `Missing questionId or answer in answers[${index}]` });
    }
  }
  
  // …

  if (!firstName || !lastName || !thesiErgasias || !sqlDate || !currentShift || !Array.isArray(labeledQuestions)) {
    return res.status(400).json({ error: "Missing required fields in request body.sdsds", firstName, lastName, thesiErgasias, sqlDate, currentShift, labeledQuestions, answersArray });
 
  }
 await sql.connect(dbConfig);
  const transaction = new sql.Transaction();  // create a new transaction on the global pool
  try {
    
    await transaction.begin();  // begin SQL transaction :contentReference[oaicite:8]{index=8}

    // Step 1: Upsert into Employees table (get or create employee_id)
    let employeeId;
    const request1 = new sql.Request(transaction);
    const mergeEmployeeSQL = `
      MERGE INTO Employees AS target
      USING (VALUES (@firstName, @lastName, @thesiErgasias)) AS source (firstName, lastName, thesiErgasias)
      ON target.firstName = source.firstName 
         AND target.lastName = source.lastName 
         AND target.thesiErgasias = source.thesiErgasias
      WHEN MATCHED THEN 
         UPDATE SET firstName = target.firstName    -- no-op update to allow OUTPUT on match
      WHEN NOT MATCHED THEN 
         INSERT (firstName, lastName, thesiErgasias)
         VALUES (source.firstName, source.lastName, source.thesiErgasias)
      OUTPUT inserted.employee_id;  -- outputs the employee_id of inserted or matched row
    `;
    const result1 = await request1
      .input('firstName', sql.NVarChar, firstName)
      .input('lastName',  sql.NVarChar, lastName)
      .input('thesiErgasias',     sql.NVarChar, thesiErgasias)
      .query(mergeEmployeeSQL);
    employeeId = result1.recordset[0].employee_id;  // get the resulting employee_id

    // Step 2: Upsert each question in the Question table, collect question_ids
    const questionIds = [];
    for (const q of labeledQuestions) {
      const { label: questionText } = q;
      if (!questionText) continue;  // skip if no question text (safety check)
      const requestQ = new sql.Request(transaction);
      const mergeQuestionSQL = `
        MERGE INTO Question AS target
        USING (VALUES (@qText)) AS source (question_text)
        ON target.question_text = source.question_text
        WHEN MATCHED THEN 
           UPDATE SET question_text = target.question_text   -- no-op update
        WHEN NOT MATCHED THEN 
           INSERT (question_text) VALUES (source.question_text)
        OUTPUT inserted.question_id;
      `;
      const resultQ = await requestQ
        .input('qText', sql.NVarChar, questionText)
        .query(mergeQuestionSQL);
      const questionId = resultQ.recordset[0].question_id;
      questionIds.push(questionId);
    }

    // Step 3: Upsert into EmployeeAtShift table (ensure a session record exists)
    let sessionId;
    const request3 = new sql.Request(transaction);
    const mergeSessionSQL = `
      MERGE INTO EmployeeAtShift AS target
      USING (VALUES (@empId, @currentDate, @currentshift)) AS source (employee_id, currentDate, currentShift)
      ON target.employee_id = source.employee_id 
         AND target.currentDate = source.currentDate 
         AND target.currentshift = source.currentshift
      WHEN MATCHED THEN 
         UPDATE SET employee_id = target.employee_id   -- no-op update
      WHEN NOT MATCHED THEN 
         INSERT (employee_id, currentDate, currentshift)
         VALUES (source.employee_id, source.currentDate, source.currentshift)
      OUTPUT inserted.session_id;
    `;
    const result3 = await request3
      .input('empId',    sql.Int,      employeeId)
      .input('currentDate', sql.Date,    sqlDate)
      .input('currentshift',    sql.NVarChar, currentShift)
      .query(mergeSessionSQL);
    sessionId = result3.recordset[0].session_id;

   // Step 4: Upsert each answer into Answer table (for each session-question pair)
for (let i = 0; i < answersArray.length; i++) {
  const { answer } = answersArray[i];
  const questionId   = questionIds[i];      // ← grab the corresponding id
  const requestA     = new sql.Request(transaction);
  const mergeAnswerSQL = `
    MERGE INTO Answer AS target
    USING (VALUES (@sessId, @qId, @answerText)) 
           AS source (session_id, question_id, answer_text)
      ON target.session_id  = source.session_id
     AND target.question_id = source.question_id
    WHEN MATCHED THEN
      UPDATE SET answer_text = source.answer_text
    WHEN NOT MATCHED THEN
      INSERT (session_id, question_id, answer_text)
      VALUES (source.session_id, source.question_id, source.answer_text);
  `;
  
  await requestA
    .input('sessId',     sql.Int,      sessionId)
    .input('qId',        sql.Int,      questionId)
    .input('answerText', sql.NVarChar, answer || '')
    .query(mergeAnswerSQL);
}
    // If all queries succeed, commit the transaction
    await transaction.commit();  // commit all changes :contentReference[oaicite:9]{index=9}
    return res.status(200).json({ employee_id: employeeId, session_id: sessionId });
  } catch (err) {
    // On any error, roll back the transaction and return error response
    await transaction.rollback();  // undo any partial changes on error :contentReference[oaicite:10]{index=10}
    console.error("Form submission failed:", err);
    return res.status(500).json({ error: "Failed to submit form: " + err.message });
  }
});




  
// resolve the “virtual” import.meta.url to a real file path:
const __filename = fileURLToPath(import.meta.url);

// get its directory name:
const __dirname = dirname(__filename);
//    Point to the Vite build output directory
app.use(
  express.static(path.join(__dirname, '../dist'))
);

// 4. SPA “catch-all” — for any GET that isn’t /submit, send index.html


const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name in interfaces) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
};
var myIP=getLocalIP()

const PORT = process.env.PORT || 3013;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running at http://localhost:${PORT}`);
    console.log(`try connecting to ${myIP}:${PORT}`);

});
