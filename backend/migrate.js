const pool = require('./db');

async function runMigrations() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        email VARCHAR(180) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS resumes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(180) NOT NULL DEFAULT 'Untitled Resume',
        template_id VARCHAR(50) NOT NULL DEFAULT 'classic',
        content JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT fk_resumes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Index creation can fail if it already exists — that's fine, ignore that specific error.
    try {
      await pool.query('CREATE INDEX idx_resumes_user ON resumes(user_id)');
    } catch (err) {
      if (err.code !== 'ER_DUP_KEYNAME') {
        throw err;
      }
    }

    console.log('Database migrations complete: users and resumes tables are ready.');
  } catch (err) {
    console.error('Database migration failed:', err.message);
    throw err;
  }
}

module.exports = runMigrations;
