// ─── Jalon 5 : TaskDetail sans localStorage ───────────────────────────────────
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const styles = {
  "A faire": { bg: "#fff0f0", color: "#e03131", border: "#ffc9c9" },
  "En cours": { bg: "#fff9e6", color: "#e67700", border: "#ffec99" },
  Termine: { bg: "#ebfbee", color: "#0ca678", border: "#b2f2bb" },
};

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tasks/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setTask(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: 80, color: "#8b8fa8" }}>
        Chargement...
      </p>
    );

  const s = styles[task?.status] || styles["A faire"];

  if (!task)
    return (
      <div
        style={{
          maxWidth: 700,
          margin: "80px auto",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#8b8fa8", marginBottom: 20 }}>Tâche introuvable.</p>
        <Link to="/" style={{ color: "#635bff" }}>
          ← Retour
        </Link>
      </div>
    );

  return (
    <div style={{ maxWidth: 700, margin: "60px auto", padding: "0 24px" }}>
      <Link
        to="/"
        style={{
          color: "#635bff",
          fontSize: 14,
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 32,
        }}
      >
        ← Retour au tableau de bord
      </Link>
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(99,91,255,0.12)",
          borderRadius: 24,
          padding: 48,
          boxShadow: "0 8px 48px rgba(99,91,255,0.1)",
        }}
      >
        <span
          style={{
            background: s.bg,
            color: s.color,
            border: `1px solid ${s.border}`,
            padding: "5px 14px",
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {task.status}
        </span>
        <h1
          style={{
            fontFamily: "'Syne',sans-serif",
            fontWeight: 800,
            fontSize: 34,
            letterSpacing: -1,
            margin: "20px 0 14px",
            color: "#1a1a2e",
          }}
        >
          {task.title}
        </h1>
        <p
          style={{
            color: "#6b6f8a",
            lineHeight: 1.75,
            fontSize: 15,
            marginBottom: 36,
          }}
        >
          {task.description}
        </p>
        <div
          style={{
            borderTop: "1px solid #f0f2ff",
            paddingTop: 20,
            color: "#b0b4cc",
            fontSize: 12,
          }}
        >
          ID : {task._id}
        </div>
      </div>
    </div>
  );
}
