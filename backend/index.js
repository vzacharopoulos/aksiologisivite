import express from 'express';
import cors from 'cors';
import sql from 'mssql';
import {dirname} from 'path'
import path from 'path'
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import os from 'os';

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
  const { firstName, lastName, thesiErgasias,currentShift } = req.body;

  try {
    await sql.connect(dbConfig);
    await sql.query`
      INSERT INTO Employees (FirstName, LastName, Position, currentShift)
      VALUES (${firstName}, ${lastName}, ${thesiErgasias}, ${currentShift})
    `;
    res.json({ message: 'Data inserted successfully' });
  } catch (err) {
    console.error('SQL error', err);
    res.status(500).json({ error: 'Database insert failed' });
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
app.get('/*catchall', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
}); 

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
