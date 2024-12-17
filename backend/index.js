import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRouter.js';
import notaRouter from './routes/notaRouter.js'
import errorMiddleware from './middlewares/errorMiddleware.js';

// Configurar variables de entorno
dotenv.config();

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Permitir solicitudes desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  credentials: true, // Permitir envío de cookies o cabeceras de autorización
};

app.use(cors(corsOptions)); // Habilitar CORS con las opciones

// Middleware para manejar solicitudes preflight (OPTIONS)
app.options('*', cors(corsOptions));

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/notas', notaRouter)

// Middleware de manejo de errores al final
app.use(errorMiddleware);

// Iniciar el servidor
const port = process.env.PORT || 3000; // Puerto por defecto si no está configurado
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
