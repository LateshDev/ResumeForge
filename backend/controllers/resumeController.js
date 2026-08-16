const pool = require('../config/db');

const TEMPLATES = [
  { id: 'classic', name: 'Classic', description: 'Clean single-column layout, great for most industries.' },
  { id: 'modern', name: 'Modern', description: 'Bold headings with a two-column layout.' },
  { id: 'minimal', name: 'Minimal', description: 'Understated typography-first design.' }
];

exports.getTemplates = (req, res) => {
  res.json({ templates: TEMPLATES });
};

exports.createResume = async (req, res, next) => {
  try {
    const { title, templateId, content } = req.body;
    const [result] = await pool.query(
      'INSERT INTO resumes (user_id, title, template_id, content) VALUES (?, ?, ?, ?)',
      [
        req.user.id,
        title || 'Untitled Resume',
        templateId || 'classic',
        JSON.stringify(content || {})
      ]
    );
    const [rows] = await pool.query('SELECT * FROM resumes WHERE id = ?', [result.insertId]);
    res.status(201).json({ resume: rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.getResumes = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, title, template_id, created_at, updated_at FROM resumes WHERE user_id = ? ORDER BY updated_at DESC',
      [req.user.id]
    );
    res.json({ resumes: rows });
  } catch (err) {
    next(err);
  }
};

exports.getResumeById = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM resumes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Resume not found.' });
    res.json({ resume: rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.updateResume = async (req, res, next) => {
  try {
    const { title, templateId, content } = req.body;

    const [existing] = await pool.query(
      'SELECT id FROM resumes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (existing.length === 0) return res.status(404).json({ message: 'Resume not found.' });

    await pool.query(
      'UPDATE resumes SET title = ?, template_id = ?, content = ? WHERE id = ?',
      [title, templateId, JSON.stringify(content), req.params.id]
    );

    const [rows] = await pool.query('SELECT * FROM resumes WHERE id = ?', [req.params.id]);
    res.json({ resume: rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.deleteResume = async (req, res, next) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM resumes WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Resume not found.' });
    res.json({ message: 'Resume deleted.' });
  } catch (err) {
    next(err);
  }
};
