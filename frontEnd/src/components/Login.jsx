import { useState } from "react";
import axios from "axios"; // Asegúrate de tener axios instalado: npm install axios

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Para mostrar mensajes de éxito o error

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Crear el objeto con los datos a enviar
    const userData = {
      email: email,
      password: password,
    };

    try {
      // Hacer la solicitud POST al backend
      const response = await axios.post("http://localhost:2554/api/users/login", userData);

      // Si la respuesta es exitosa
      setMessage("Inicio de sesión exitoso. ¡Bienvenido!");
      console.log("Datos del usuario autenticado:", response.data);

      // Guardar datos en localStorage (opcional, para tokens o datos de sesión)
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Verificar el rol del usuario y redirigir al dashboard correspondiente
      const userRole = response.data.user.role; // Asegúrate de que el rol esté en la respuesta

      if (userRole === "admin") {
        // Redirigir al dashboard del administrador
        window.location.href = "/adminPanel";
      } else {
        // Redirigir al dashboard normal
        window.location.href = "/dashboard";
      }
    } catch (error) {
      // Manejar errores de la solicitud
      setMessage("Error al iniciar sesión: " + (error.response?.data?.message || error.message));
      console.error("Error:", error.response || error.message);
    }
  };

  const handleGoToRegister = () => {
    // Redirigir al usuario a la página de registro
    window.location.href = "/register";
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {message && <p className="text-red-500 mb-4 text-center">{message}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 mb-4 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 mb-4 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2"
          >
            Iniciar Sesión
          </button>
        </form>
        <button
          onClick={handleGoToRegister}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
        >
          Crear una cuenta
        </button>
      </div>
    </div>
  );
}

export default Login;
