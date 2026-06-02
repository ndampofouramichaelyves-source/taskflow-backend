// ─── Jalon 5 : TaskDetail sans localStorage — Modifier statut + Supprimer ──────────────────────
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/tasks";

const styles = {
  "A faire": { bg: "#fff0f0", color: "#e03131", border: "#ffc9c9" },
  "En cours": { bg: "#fff9e6", color: "#e67700", border: "#ffec99" },
  Termine:   { bg: "#ebfbee", color: "#0ca678", border: "#b2f2bb" },
};

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [statut, setStatut]   = useState("");
  const [saving, setSaving]   = useState(false);

  // Charger la tâche depuis l'API
  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setTask(data);
        setStatut(data?.status || "A faire");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Mettre à jour le statut via PUT
  const handleUpdate = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statut }),
      });
      if (res.ok) {
        const updated = await res.json();
        setTask(updated);
        alert("✅ Statut mis à jour !");
      } else {
        alert("❌ Erreur lors de la mise à jour");
      }
    } catch {
      alert("❌ Impossible de joindre le serveur");
    }
    setSaving(false);
  };

  // Supprimer la tâche via DELETE
  const handleDelete = async () => {
    if (!confirm(`Supprimer "${task.title}" ? Cette action est irréversible.`)) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        navigate("/"); // retour au dashboard
      } else {
        alert("❌ Erreur lors de la suppression");
      }
    } catch {
      alert("❌ Impossible de joindre le serveur");
    }
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: 80, color: "#8b8fa8" }}>Chargement...</p>;

  if (!task)
    return (
      <div style={{ maxWidth: 700, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
        <p style={{ color: "#8b8fa8", marginBottom: 20 }}>Tâche introuvable.</p>
        <Link to="/" style={{ color: "#635bff" }}>← Retour</Link>
      </div>
    );

  const s = styles[task.status] || styles["A faire"];

  return (
    <div style={{ maxWidth: 700, margin: "60px auto", padding: "0 24px" }}>
      <Link
        to="/"
        style={{ color: "#635bff", fontSize: 14, textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}
      >
        ← Retour au tableau de bord
      </Link>

      <div style={{ background: "#fff", border: "1px solid rgba(99,91,255,0.12)",
        borderRadius: 24, padding: 48, boxShadow: "0 8px 48px rgba(99,91,255,0.1)" }}>

        {/* Badge statut actuel */}
        <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`,
          padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
          {task.status}
        </span>

        {/* Titre */}
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 34,
          letterSpacing: -1, margin: "20px 0 14px", color: "#1a1a2e" }}>
          {task.title}
        </h1>

        {/* Description */}
        <p style={{ color: "#6b6f8a", lineHeight: 1.75, fontSize: 15, marginBottom: 36 }}>
          {task.description}
        </p>

        {/* ── Zone de modification du statut ── */}
        <div style={{ borderTop: "1px solid #f0f2ff", paddingTop: 28, marginBottom: 16 }}>
          <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14,
            color: "#1a1a2e", marginBottom: 12 }}>
            Modifier le statut
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {["A faire", "En cours", "Termine"].map((s) => (
              <button
                key={s}
                onClick={() => setStatut(s)}
                style={{
                  padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", border: "1.5px solid",
                  borderColor: statut === s ? "#635bff" : "#e4e6f5",
                  background: statut === s ? "rgba(99,91,255,0.08)" : "#f7f8ff",
                  color: statut === s ? "#635bff" : "#8b8fa8",
                  transition: "all 0.15s",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={handleUpdate}
            disabled={saving || statut === task.status}
            style={{
              marginTop: 16, padding: "11px 28px", borderRadius: 12, fontSize: 14,
              fontWeight: 600, cursor: saving || statut === task.status ? "not-allowed" : "pointer",
              border: "none", color: "#fff",
              background: saving || statut === task.status
                ? "#c5c8e0"
                : "linear-gradient(135deg,#635bff,#a78bfa)",
              boxShadow: saving || statut === task.status ? "none" : "0 4px 16px rgba(99,91,255,0.3)",
              transition: "all 0.2s",
            }}
          >
            {saving ? "Enregistrement..." : "✓ Enregistrer"}
          </button>
        </div>

        {/* ── Zone suppression ── */}
        <div style={{ borderTop: "1px solid #f0f2ff", paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#b0b4cc", fontSize: 12 }}>ID : {task._id}</span>
          <button
            onClick={handleDelete}
            style={{
              padding: "9px 20px", borderRadius: 12, fontSize: 13, fontWeight: 600,
              cursor: "pointer", border: "1.5px solid #ffc9c9",
              background: "#fff0f0", color: "#e03131", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#e03131"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#fff0f0"; e.currentTarget.style.color = "#e03131"; }}
          >
            🗑 Supprimer la tâche
          </button>
        </div>

      </div>
    </div>
  );
}
