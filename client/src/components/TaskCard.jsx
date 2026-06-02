import { Link } from "react-router-dom";

const styles = {
  "A faire": {
    bg: "#fff0f0", color: "#e03131", border: "#ffc9c9",
    bar: "linear-gradient(90deg,#ff6b6b,#ff8e8e)",
  },
  "En cours": {
    bg: "#fff9e6", color: "#e67700", border: "#ffec99",
    bar: "linear-gradient(90deg,#f59f00,#fcc419)",
  },
  Termine: {
    bg: "#ebfbee", color: "#0ca678", border: "#b2f2bb",
    bar: "linear-gradient(90deg,#12b886,#38d9a9)",
  },
};

export default function TaskCard({ task }) {
  // MongoDB → task.status / task.title / task._id
  const s = styles[task.status] || styles["A faire"];

  return (
    <Link
      to={`/task/${task._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          background: "#fff", border: "1.5px solid #e8eaf5",
          borderRadius: 18, padding: 24, cursor: "pointer",
          position: "relative", overflow: "hidden", transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#635bff";
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 12px 36px rgba(99,91,255,0.13)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#e8eaf5";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: s.bar, borderRadius: "18px 18px 0 0",
        }} />
        <div style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 700,
          fontSize: 16, marginBottom: 8, color: "#1a1a2e",
        }}>
          {task.title}
        </div>
        <div style={{
          fontSize: 13, color: "#8b8fa8", lineHeight: 1.65, marginBottom: 18,
        }}>
          {task.description}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
            background: s.bg, color: s.color, border: `1px solid ${s.border}`,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: s.color, display: "inline-block",
            }} />
            {task.status}
          </span>
          <span style={{ color: "#c5c8e0" }}>→</span>
        </div>
      </div>
    </Link>
  );
}
