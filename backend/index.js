import express from 'express';
import cors from 'cors';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();
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

app.post('/submit', async (req, res) => {
  const { firstName, lastName, thesiErgasias } = req.body;

  try {
    await sql.connect(dbConfig);
    await sql.query`
      INSERT INTO Employees (FirstName, LastName, Position)
      VALUES (${firstName}, ${lastName}, ${thesiErgasias})
    `;
    res.json({ message: 'Data inserted successfully' });
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).json({ error: 'Database insert failed' });
  }
});

app.listen(3001, () => {
  console.log('API server running at http://localhost:3001');
});