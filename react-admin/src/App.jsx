import React, { useState } from "react";
import { useRealtime } from "./hooks/useRealtime";
import LogStream from "./components/LogStream";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [view, setView] = useState("logs");
  const events = useRealtime("wss://hollywoodimaging.studio");

  return (
    <div className="admin-container">
      <Sidebar setView={setView} />

      <div className="main-panel">
        {view === "logs" && <LogStream events={events} />}
        {view !== "logs" && (
          <div className="placeholder">Panel "{view}" coming next</div>
        )}
      </div>
    </div>
  );
}

