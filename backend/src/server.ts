import app from "./app";
import pool from "./db";

const PORT = 5000;

const startServer = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("✅ Database Connected");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database Connection Failed");
    console.error(err);
  }
};

startServer();