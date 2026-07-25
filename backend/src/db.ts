import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Neon SSL కనెక్షన్ కి ఇది అవసరం
  },
});

// కనెక్షన్ కట్ కాకుండా ఉండటానికి ఎర్రర్ హ్యాండ్లర్
pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err.message);
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;