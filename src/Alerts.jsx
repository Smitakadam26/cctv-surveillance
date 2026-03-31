import { useEffect, useState, useRef } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const alertsMap = useRef(new Map()); // ✅ fast storage

  // ✅ Parse custom timestamp
  const parseCustomDate = (str) => {
    if (!str) return Date.now();

    const [datePart, timePart] = str.split(" ");
    const [day, monthText, year] = datePart.split("-");

    const months = {
      January: 0, February: 1, March: 2, April: 3,
      May: 4, June: 5, July: 6, August: 7,
      September: 8, October: 9, November: 10, December: 11
    };

    return new Date(
      year,
      months[monthText],
      parseInt(day),
      ...timePart.split(":").map(Number)
    ).getTime();
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch("https://cctv-surveillance.vercel.app/api/alerts");
        const data = await res.json();

        const newAlerts = Array.isArray(data) ? data : [data];

        let updated = false;

        newAlerts.forEach((alert) => {
          if (!alertsMap.current.has(alert.id)) {
            alertsMap.current.set(alert.id, alert);
            updated = true;
          }
        });

        if (updated) {
          updateState();
        }

      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    const updateState = () => {
      const now = Date.now();

      // ✅ Remove old alerts (5 min)
      for (let [id, alert] of alertsMap.current) {
        const time = parseCustomDate(alert.timestamp);
        if (now - time > 5 * 60 * 1000) {
          alertsMap.current.delete(id);
        }
      }

      // ✅ Convert to array + sort
      const sorted = Array.from(alertsMap.current.values()).sort((a, b) => {
        const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };

        return (
          (priorityOrder[b.priority] || 0) -
            (priorityOrder[a.priority] || 0) ||
          parseCustomDate(b.timestamp) -
            parseCustomDate(a.timestamp)
        );
      });

      setAlerts(sorted);
    };

    fetchAlerts();

    const fetchInterval = setInterval(fetchAlerts, 5000); // ✅ slower polling
    const cleanupInterval = setInterval(updateState, 10000); // ✅ cleanup separately

    return () => {
      clearInterval(fetchInterval);
      clearInterval(cleanupInterval);
    };
  }, []);

  const getColor = (priority) => {
    if (priority === "HIGH") return "#ffcccc";
    if (priority === "MEDIUM") return "#fff3cd";
    return "#d4edda";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚨 CCTV Alerts</h2>

      {alerts.length === 0 && <p>No recent alerts</p>}

      {alerts.map((a) => (
        <div
          key={a.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
            borderRadius: "8px",
            background: getColor(a.priority),
          }}
        >
          <strong>{a.crime_type}</strong> - {a.location}
          <br />
          📍 CCTV: {a.cctv_id}
          <br />
          ⏰ {a.timestamp}
          <br />
          🚨 Priority: {a.priority}
        </div>
      ))}
    </div>
  );
}

export default Alerts;