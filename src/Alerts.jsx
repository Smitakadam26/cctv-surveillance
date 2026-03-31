import { useEffect, useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  // ✅ Convert your custom timestamp → JS time
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

        setAlerts((prev) => {
          const now = Date.now();

          // ✅ Merge new + old alerts
          const merged = [...newAlerts, ...prev];

          // ✅ Remove duplicates using ID
          const unique = merged.filter(
            (item, index, self) =>
              index === self.findIndex((a) => a.id === item.id)
          );

          // ✅ Keep only last 5 minutes
          const filtered = unique.filter((a) => {
            const alertTime = parseCustomDate(a.timestamp);
            return now - alertTime <= 5 * 60 * 1000;
          });

          // ✅ Sort by priority + latest time
          const sorted = filtered.sort((a, b) => {
            const priorityOrder = {
              HIGH: 3,
              MEDIUM: 2,
              LOW: 1,
            };

            return (
              (priorityOrder[b.priority] || 0) -
                (priorityOrder[a.priority] || 0) ||
              parseCustomDate(b.timestamp) -
                parseCustomDate(a.timestamp)
            );
          });

          return sorted;
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 3000); // every 3 sec

    return () => clearInterval(interval);
  }, []);

  // ✅ UI Color based on priority
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

          {/* ✅ Optional image preview */}
          {a.image_data && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={`data:image/jpeg;base64,${a.image_data}`}
                alt="alert"
                style={{ width: "200px", borderRadius: "6px" }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Alerts;