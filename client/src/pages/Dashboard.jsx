// ─── Jalon 5 : Intégration Full-Stack ────────────────────────────────────────
// localStorage supprimé → données chargées depuis l'API back-end
import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const API_URL = "http://localhost:5000/api/tasks";

export default function Dashboard() {
  const [tasks, setTasks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // Chargement des tâches au montage du composant (remplace useLocalStorage)
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des tâches");
        return res.json();
      })
      .then((data) => { setTasks(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, []);

  // Ajout via POST — insère dans le state UNIQUEMENT si réponse 201
  const handleAddTask = async ({ title, description, status }) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status }),
      });
      if (res.status === 201) {
        const newTask = await res.json();
        setTasks((prev) => [newTask, ...prev]);
      } else {
        const err = await res.json();
        alert("Erreur : " + err.message);
      }
    } catch (err) {
      alert("Impossible de joindre le serveur : " + err.message);
    }
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 38,
          letterSpacing: -1, color: "#1a1a2e", marginBottom: 8,
        }}>
          Tableau de bord
        </h1>
        <p style={{ color: "#8b8fa8", fontSize: 15 }}>
          Gérez et suivez les livrables de votre équipe
        </p>
      </div>

      <TaskForm onAddTask={handleAddTask} />

      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between", marginBottom: 20,
      }}>
        <span style={{
          fontFamily: "'Syne',sans-serif", fontSize: 20,
          fontWeight: 700, color: "#1a1a2e",
        }}>
          Toutes les tâches
        </span>
        <span style={{
          background: "rgba(99,91,255,0.08)", color: "#635bff",
          border: "1px solid rgba(99,91,255,0.2)", borderRadius: 20,
          padding: "3px 12px", fontSize: 12, fontWeight: 600,
        }}>
          {tasks.length} tâche{tasks.length > 1 ? "s" : ""}
        </span>
      </div>

      {loading && <p style={{ color: "#8b8fa8", textAlign: "center", marginTop: 40 }}>Chargement des tâches...</p>}
      {error   && <p style={{ color: "#e03131", textAlign: "center", marginTop: 40 }}>⚠️ {error}</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
        gap: 18,
      }}>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}
