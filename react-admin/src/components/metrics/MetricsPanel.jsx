import React, { useEffect, useState } from "react";

export default function MetricsPanel() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = () => {
      fetch("http://localhost:3000/metrics")
        .then(r => r.json())
        .then(setData);
    };

    load();
    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div>Loading metrics...</div>;

  return (
    <div className="metrics-panel">
      <h2>Engine Metrics</h2>

      <h3>System</h3>
      <pre>{JSON.stringify(data.system, null, 2)}</pre>

      <h3>PM2</h3>
      <pre>{JSON.stringify(data.pm2, null, 2)}</pre>

      <h3>Traffic</h3>
      <pre>{JSON.stringify(data.traffic, null, 2)}</pre>
    </div>
  );
}

