import { useState } from "react";

const inp = {
  width: "100%", background: "#f7f8ff", border: "1.5px solid #e4e6f5",
  borderRadius: 12, padding: "13px 16px", color: "#1a1a2e",
  fontFamily: "'DM Sans',sans-serif", fontSize: 14, outline: "none",
};

export default function TaskForm({ onAddTask }) {
  const [title, setTitle]             = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus]           = useState("A faire");

  const handleSubmit = () => {
    if (!title.trim()) return;
    // Envoie les bons noms de champs attendus par le back-end Mongoose
    onAddTask({ title, description, status });
    setTitle("");
    setDescription("");
    setStatus("A faire");
  };

  return (
    <div style={{
      background: "#fff", border: "1px solid rgba(99,91,255,0.12)",
      borderRadius: 20, padding: 32, marginBottom: 48,
      boxShadow: "0 4px 32px rgba(99,91,255,0.08)",
    }}>
      <h2 style={{
        fontFamily: "'Syne',sans-serif", fontSize: 17,
        fontWeight: 700, marginBottom: 22, color: "#1a1a2e",
      }}>
        ✦ Nouvelle tâche
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input
          style={inp} type="text" placeholder="Titre de la tâche..."
          value={title} onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          style={{ ...inp, resize: "none", height: 80 }}
          placeholder="Description..."
          value={description} onChange={(e) => setDescription(e.target.value)}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12 }}>
          <select style={inp} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="A faire">A faire</option>
            <option value="En cours">En cours</option>
            <option value="Termine">Termine</option>
          </select>
          <button
            onClick={handleSubmit}
            style={{
              background: "linear-gradient(135deg,#635bff,#a78bfa)", color: "#fff",
              border: "none", borderRadius: 12, padding: "13px 28px",
              fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14,
              cursor: "pointer", boxShadow: "0 4px 16px rgba(99,91,255,0.3)",
              whiteSpace: "nowrap",
            }}
          >
            + Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
