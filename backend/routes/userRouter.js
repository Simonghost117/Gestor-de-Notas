import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import UserController from '../controllers/UserController.js';

const router = express.Router();

// Rutas públicas
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Rutas protegidas (requieren autenticación y permisos)
router.get('/admin', authMiddleware, roleMiddleware(['admin']), UserController.getAllUsers);
router.put('/degrade/:userId', authMiddleware, roleMiddleware(['admin']), UserController.degradeToUser);
router.put('/promote/:userId', authMiddleware, roleMiddleware(['admin']), UserController.promoteUserToAdmin);
router.delete('/delete/:userId', authMiddleware, roleMiddleware(['admin']), UserController.deleteUser);

export default router;
