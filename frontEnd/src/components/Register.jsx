import { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Para mostrar mensajes de éxito o error

  const handleRegister = async (e) => {
    e.preventDefault();

    // Crear el objeto con los datos a enviar
    const userData = {
      name: username,
      email: email,
      password: password,
    
    };

    try {
      // Hacer la solicitud POST al backend
      const response = await axios.post("http://localhost:2554/api/users/register", userData);

      // Si la respuesta es exitosa, mostrar el mensaje
      setMessage("Registro exitoso, ahora puedes iniciar sesión.");
      console.log(response.data);
    } catch (error) {
      // Manejar errores de la solicitud
      setMessage("Error al registrar usuario: " + error.response?.data?.message || error.message);
      console.error(error);
    }
  };

  const handleGoToLogin = () => {
    // Redirigir al usuario a la página de login
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-3 py-2 mb-4 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-2"
          >
            Registrarse
          </button>
        </form>

        <button
          onClick={handleGoToLogin}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
        >
          Volver al Login
        </button>

        {/* Mostrar mensaje de éxito o error */}
        {message && (
          <div className="mt-4 text-center text-sm text-gray-500">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
