import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

const app = express();
const port = 5000;

// body parser
app.use(express.json());

// connect to neon db
const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});

// const initDB = async()=>{
//     await pool.query(`
//         CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         email VARCHAR(150) UNIQUE NOT NULL,
//         age INT,
//         phone VARCHAR(15),
//         address VARCHAR(200),
//         created_at TIMESTAMP DEFAULT NOW(),
//         updated_at TIMESTAMP DEFAULT NOW()
//         )
//         `)

//         await pool.query(`
//             CREATE TABLE IF NOT EXISTS todos(
//             id SERIAL PRIMARY KEY,
//             user_id INT REFERENCES users(id) ON DELETE CASCADE,
//             title VARCHAR(200) NOT NULL,
//             description TEXT,
//             completed BOOLEAN DEFAULT FALSE,
//             due_date DATE,
//             created_at TIMESTAMP DEFAULT NOW(),
//             updated_at TIMESTAMP DEFAULT NOW()
//             )
//             `)
// }


const initDB = async () => {
  try {
    console.log("🔄 Initializing database tables...");
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        age INT,
        phone VARCHAR(15),
        address VARCHAR(200),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        due_date DATE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log("✅ Database tables verified/created successfully.");
  } catch (error) {
    console.error("❌ Failed to initialize database:", error);
  }
};

initDB();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.post('/', (req: Request, res: Response) => {
  console.log(req.body);

  res.status(200).json({
    status: 'success',
    message: 'Post request received successfully',
    data: req.body,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});