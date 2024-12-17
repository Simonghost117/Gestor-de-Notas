import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }
    const result = await User.createUser(name, email, password);
    res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const isMatch = await User.verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateRole = async (req, res) => {
  const { userId, newRole } = req.body;
  try {
    const result = await User.updateRole(userId, newRole);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Rol actualizado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const promoteUserToAdmin = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.updateRole(userId, 'admin');
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario promovido a administrador exitosamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const degradeToUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.updateRoletoUser(userId, 'user');
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Administrador degradado a usuario exitosamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await User.deleteUser(userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  registerUser,
  loginUser,
  updateRole,
  promoteUserToAdmin,
  deleteUser,
  getAllUsers,
  degradeToUser,
};
