📝 Gestor de Notas
Descripción
Aplicación full-stack para gestionar notas con autenticación segura y operaciones CRUD (Crear, Leer, Actualizar y Eliminar). Los usuarios pueden registrarse, iniciar sesión y administrar sus notas de forma organizada.
🚀 Tecnologías utilizadas
Frontend: React.js
Backend: Node.js + Express.js
Base de Datos: MySQL
Autenticación: JWT (JSON Web Tokens)
Estilado: Tailwind CSS
⚙️ Instalación y ejecución
Sigue estos pasos para ejecutar la aplicación localmente:
Requisitos previos
Node.js (versión 16+)
MySQL
Instalación
•	Clona el repositorio:
```
git clone https: https://github.com/Simonghost117/Gestor-de-Notas.git
```
•	Instala las dependencias del servidor y cliente:
```
# Backend
cd backend
npm install
npm install express
npm install mysql2
npm install dotenv
npm install bcrypt
npm install jsonwebtoken
npm install cors
npm install --save-dev nodemon

# Frontend
cd ../frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react react-dom
npm install react-router-dom
npm install axios
```
•	Configura las variables de entorno (`.env`) en el backend:
```
PORT=2554
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=nombre_base_datos
JWT_SECRET=tu_secreto
```
•	Inicia la aplicación:
```
# Inicia el backend
cd backend
npm run dev

# Inicia el frontend
cd ../frontend
npm run dev
```
•	La aplicación estará disponible en `http://localhost:5173`.
🧑‍💻 Contribuciones
¡Las contribuciones son bienvenidas! Si deseas mejorar el proyecto, realiza un **fork**, crea una rama y envía tu PR.
•	Realiza un fork del proyecto.
•	Crea una nueva rama:
```
git checkout -b nombre-de-tu-rama
```
•	Realiza tus cambios y guarda:
```
git commit -m "Descripción de los cambios"
```
•	Envía tus cambios al repositorio:
```
git push origin nombre-de-tu-rama
```
📄 Licencia
Este proyecto está bajo la licencia MIT.
📬 Contacto
Creador: **Sebastian**
Correo: sebastianrme87@gmail.com
GitHub: https://github.com/Simonghost117

