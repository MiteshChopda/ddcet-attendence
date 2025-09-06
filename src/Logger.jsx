import React, { useEffect, useRef, useState } from "react";

export default function Logger() {
  const [logs, setLogs] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const logTypes = ["log", "warn", "error", "info"];
    const originals = {};

    logTypes.forEach((type) => {
      originals[type] = console[type];

      console[type] = (...args) => {
        // Keep original behavior in DevTools
        originals[type].apply(console, args);

        // Convert args to a readable string
        const msg = args
          .map((a) => (typeof a === "object" ? JSON.stringify(a, null, 2) : a))
          .join(" ");

        // Push new log into state
        setLogs((prev) => [...prev, { type, msg }]);
      };
    });

    return () => {
      // Restore original console methods when component unmounts
      logTypes.forEach((type) => {
        console[type] = originals[type];
      });
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new log appears
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="p-4 bg-black text-green-400 font-mono rounded-xl shadow-lg h-64 overflow-y-auto" ref={containerRef}>
      {logs.map((log, idx) => (
        <div
          key={idx}
          className={
            log.type === "error"
              ? "text-red-400"
              : log.type === "warn"
              ? "text-yellow-400"
              : log.type === "info"
              ? "text-blue-400"
              : "text-green-400"
          }
        >
          [{log.type.toUpperCase()}] {log.msg}
        </div>
      ))}
    </div>
  );
}
