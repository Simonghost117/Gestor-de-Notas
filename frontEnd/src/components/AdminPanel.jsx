import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redireccionar

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const api = axios.create({
    baseURL: "http://localhost:2554/api/users",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/admin");
      setUsers(response.data);
    } catch (error) {
      setError("Error al cargar usuarios.");
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/delete/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      setError("Error al eliminar el usuario.");
      console.error("Error al eliminar el usuario:", error);
    }
  };

  const promoteToAdmin = async (userId) => {
    try {
      await api.put(`/promote/${userId}`);
      fetchUsers();
    } catch (error) {
      setError("Error al promover al usuario.");
      console.error("Error al promover al usuario:", error);
    }
  };

  const degradeToUser = async (userId) => {
    try {
      await api.put(`/degrade/${userId}`);
      fetchUsers(); // Actualizar la lista de usuarios después del cambio
    } catch (error) {
      setError("Error al degradar el usuario.");
      console.error("Error al degradar el usuario:", error);
    }
  };
  

  const logout = () => {
    localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
    navigate("/"); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Panel de Administrador</h2>

      </div>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Rol</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3 flex justify-center gap-2">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => promoteToAdmin(user.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Promover a Admin
                    </button>
                  )}
                  {user.role === "admin" && (
                    <button
                      onClick={() => degradeToUser(user.id)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Degradar a User
                    </button>
                  )}
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={logout}
        className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default AdminPanel;
