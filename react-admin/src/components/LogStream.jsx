import React from "react";

export default function LogStream({ events }) {
  return (
    <div className="log-stream">
      {events.map((e, i) => (
        <div key={i} className="log-entry">
          <div className="timestamp">{new Date().toLocaleString()}</div>
          <pre>{JSON.stringify(e, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}

