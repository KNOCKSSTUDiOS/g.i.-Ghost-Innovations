import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import CreatorPanel from "./components/creator/CreatorPanel";
import MetricsPanel from "./components/metrics/MetricsPanel";
import VoicesPanel from "./components/voices/VoicesPanel";
import LanguagePanel from "./components/language/LanguagePanel";
import OsPanel from "./components/os/OsPanel";

export default function App() {
  const [view, setView] = useState("creator");

  return (
    <div className="app">
      <Sidebar setView={setView} />

      <div className="app-content">
        {view === "creator" && <CreatorPanel />}
        {view === "metrics" && <MetricsPanel />}
        {view === "voices" && <VoicesPanel />}
        {view === "language" && <LanguagePanel />}
        {view === "os" && <OsPanel />}
      </div>
    </div>
  );
}
