import Note from '../models/NotaModel.js';

// Crear una nueva nota
const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;

  try {
    const newNote = await Note.createNote(title, content, userId);
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la nota', error: err.message });
  }
};

// Obtener todas las notas de un usuario
const getNotes = async (req, res) => {
  const userId = req.user.id;

  try {
    const notes = await Note.getNotesByUser(userId);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las notas', error: err.message });
  }
};

// Obtener una nota específica
const getNote = async (req, res) => {
  const { noteId } = req.params;

  try {
    const note = await Note.getNoteById(noteId, req.user.id);
    if (!note) return res.status(404).json({ message: 'Nota no encontrada' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener la nota', error: err.message });
  }
};

// Actualizar una nota
const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { title, content } = req.body;

  try {
    const success = await Note.updateNote(noteId, title, content, req.user.id);
    if (!success) return res.status(404).json({ message: 'Nota no encontrada' });
    res.json({ message: 'Nota actualizada exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la nota', error: err.message });
  }
};

// Eliminar una nota
const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  try {
    const success = await Note.deleteNote(noteId, req.user.id);
    if (!success) return res.status(404).json({ message: 'Nota no encontrada' });
    res.json({ message: 'Nota eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la nota', error: err.message });
  }
};

export default {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};
