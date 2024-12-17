import express from 'express';
import notaController from '../controllers/notaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rutas protegidas con autenticación
router.get('/', authMiddleware, notaController.getNotes); // Obtener todas las notas del usuario
router.get('/:noteId', authMiddleware, notaController.getNote); // Obtener una nota específica
router.post('/', authMiddleware, notaController.createNote); // Crear una nueva nota
router.put('/:noteId', authMiddleware, notaController.updateNote); // Actualizar una nota
router.delete('/:noteId', authMiddleware, notaController.deleteNote); // Eliminar una nota

export default router;
