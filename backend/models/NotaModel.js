import db from '../config/db.js';

const createNote = async (title, content, userId) => {
  const query = 'INSERT INTO note (title, content, user_id) VALUES (?, ?, ?)';
  const [result] = await db.query(query, [title, content, userId]);
  return { id: result.insertId, title, content };
};

const getNotesByUser = async (userId) => {
  const query = 'SELECT * FROM note WHERE user_id = ?';
  const [rows] = await db.query(query, [userId]);
  return rows;
};

const getNoteById = async (noteId, userId) => {
  const query = 'SELECT * FROM note WHERE id = ? AND user_id = ?';
  const [rows] = await db.query(query, [noteId, userId]);
  return rows[0];
};

const updateNote = async (noteId, title, content, userId) => {
  const query = 'UPDATE note SET title = ?, content = ? WHERE id = ? AND user_id = ?';
  const [result] = await db.query(query, [title, content, noteId, userId]);
  return result.affectedRows > 0;
};

const deleteNote = async (noteId, userId) => {
  const query = 'DELETE FROM note WHERE id = ? AND user_id = ?';
  const [result] = await db.query(query, [noteId, userId]);
  return result.affectedRows > 0;
};

export default {
  createNote,
  getNotesByUser,
  getNoteById,
  updateNote,
  deleteNote,
};
