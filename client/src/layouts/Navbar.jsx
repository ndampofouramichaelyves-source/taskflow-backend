import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 40px",
        borderBottom: "1px solid rgba(99,91,255,0.12)",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 24px rgba(99,91,255,0.07)",
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "'Syne',sans-serif",
          fontWeight: 800,
          fontSize: 22,
          color: "#1a1a2e",
          textDecoration: "none",
        }}
      >
        Task<span style={{ color: "#635bff" }}>Flow</span>
      </Link>
      <span
        style={{
          background: "rgba(99,91,255,0.08)",
          border: "1px solid rgba(99,91,255,0.2)",
          color: "#635bff",
          padding: "5px 14px",
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        ✦ Gestionnaire de tâches
      </span>
    </nav>
  );
}
