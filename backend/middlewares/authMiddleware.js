import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req, res, next) => {
  // Extraer el token del encabezado 'Authorization'
  const token = req.headers['authorization']?.split(' ')[1];

  // Validar si el token existe
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adjuntar los datos del usuario a `req.user` para usarlos en los controladores
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role, // Asegúrate de incluir el rol si lo necesitas
    };

    // Continuar al siguiente middleware o controlador
    next();
  } catch (err) {
    // Manejar errores en caso de un token inválido
    res.status(403).json({ message: 'Token inválido.' });
  }
};

export default authMiddleware;
