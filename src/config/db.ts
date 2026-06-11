import { Pool } from 'pg';
import config from '.';

// connect to neon db
export const pool = new Pool({
  connectionString: config.connection_str,
});
export const initDB = async () => {
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
