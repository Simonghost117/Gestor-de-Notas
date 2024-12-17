import db from '../config/db.js';
import bcrypt from 'bcryptjs';

class User {
  // Método para crear un nuevo usuario
  static async createUser(name, email, password) {
    try {
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Verificar si existen usuarios en la base de datos
      const [users] = await db.query('SELECT COUNT(*) as count FROM user');
      const isFirstUser = users[0].count === 0; // Si no hay registros, es el primer usuario

      // Asignar el rol: 'admin' para el primer usuario, 'user' para los demás
      const role = isFirstUser ? 'admin' : 'user';

      // Insertar el nuevo usuario
      const query = 'INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)';
      const [results] = await db.query(query, [name, email, hashedPassword, role]);

      return { id: results.insertId, name, email, role };
    } catch (err) {
      throw new Error('Error al crear el usuario: ' + err.message);
    }
  }

  // Método para encontrar un usuario por email
  static async findByEmail(email) {
    try {
      const query = 'SELECT * FROM user WHERE email = ?';
      const [results] = await db.query(query, [email]);
      return results[0];
    } catch (err) {
      throw new Error('Error al buscar el usuario: ' + err.message);
    }
  }

  // Método para verificar la contraseña
  static async verifyPassword(inputPassword, storedPassword) {
    try {
      return await bcrypt.compare(inputPassword, storedPassword);
    } catch (err) {
      throw new Error('Error al verificar la contraseña: ' + err.message);
    }
  }

  // Método para actualizar el rol de un usuario
  static async updateRole(userId, newRole) {
    try {
      const query = 'UPDATE user SET role = ? WHERE id = ?';
      const [results] = await db.query(query, [newRole, userId]);
      return results;
    } catch (err) {
      throw new Error('Error al actualizar el rol del usuario: ' + err.message);
    }
  }

  static async updateRoletoUser(userId, newRole) {
    try {
      const query = 'UPDATE user SET role = ? WHERE id = ?';
      const [results] = await db.query(query, [newRole, userId]);
      return results;
    } catch (err) {
      throw new Error('Error al actualizar el rol del usuario: ' + err.message);
    }
  }

  // Método para eliminar un usuario
  static async deleteUser(userId) {
    try {
      const query = 'DELETE FROM user WHERE id = ?';
      const [results] = await db.query(query, [userId]);
      return results;
    } catch (err) {
      throw new Error('Error al eliminar el usuario: ' + err.message);
    }
  }

  // Método para obtener todos los usuarios
  static async getAllUsers() {
    try {
      const query = 'SELECT id, name, email, role FROM user';
      const [results] = await db.query(query);
      return results; // Devuelve un array de usuarios
    } catch (err) {
      throw new Error('Error al obtener todos los usuarios: ' + err.message);
    }
  }
}

export default User;
