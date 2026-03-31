import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("new-alert", (alert) => {
      setAlerts(prev => [alert, ...prev]);
    });

    return () => {
      socket.off("new-alert");
    };
  }, []);

  return (
    <div>
      {alerts.map((a, i) => (
        <div key={i}>
          {a.crime_type} - {a.location}
        </div>
      ))}
    </div>
  );
}

export default Alerts;