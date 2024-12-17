import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const navigate = useNavigate();

  const api = axios.create({
    baseURL: "http://localhost:2554/api/notas", // Reemplaza con tu endpoint
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  // Cargar todas las notas del usuario
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get("/");
      setNotes(response.data);
    } catch (error) {
      console.error("Error al obtener las notas:", error);
    }
  };

  // Crear una nueva nota
  const handleAddNote = async () => {
    if (!title || !content) return;
    try {
      const response = await api.post("/", { title, content });
      setNotes([...notes, response.data]); // Agregar la nueva nota
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error al agregar la nota:", error);
    }
  };

  // Eliminar una nota
  const handleDeleteNote = async (id) => {
    try {
      await api.delete(`/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };

  // Entrar en modo edición
  const handleEditMode = (id, existingTitle, existingContent) => {
    setEditMode(true);
    setEditNoteId(id);
    setTitle(existingTitle);
    setContent(existingContent);
  };

  // Guardar cambios en la nota editada
  const handleEditNote = async () => {
    try {
      const response = await api.put(`/${editNoteId}`, { title, content });
      const updatedNotes = notes.map((note) =>
        note.id === editNoteId ? response.data : note
      );
      setNotes(updatedNotes);
      setEditMode(false);
      setEditNoteId(null);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error al editar la nota:", error);
    }
  };

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="relative min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Mis Notas</h1>

      {/* Formulario para agregar/editar notas */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Título"
          className="px-3 py-2 border rounded w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Contenido"
          className="px-3 py-2 border rounded w-full mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {editMode ? (
          <button
            onClick={handleEditNote}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Guardar Cambios
          </button>
        ) : (
          <button
            onClick={handleAddNote}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Agregar Nota
          </button>
        )}
      </div>

      {/* Lista de notas */}
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex justify-between items-start bg-gray-100 p-3 rounded mb-2"
          >
            <div>
              <h2 className="font-bold">{note.title}</h2>
              <p>{note.content}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleEditMode(note.id, note.title, note.content)
                }
                className="text-yellow-500 hover:text-yellow-700"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteNote(note.id)}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Botón de logout */}
      <button
        onClick={logout}
        className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default Dashboard;
