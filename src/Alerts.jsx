import { useEffect, useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    try {
      const res = await fetch("https://cctv-surveillance.vercel.app/api/alerts");
      const data = await res.json();
      console.log(data);
      setAlerts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAlerts(); // initial load

    const interval = setInterval(fetchAlerts, 3000); // every 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {alerts.map((a) => (
        <div key={a.id}>
          {a.crime_type} - {a.location}
        </div>
      ))}
    </div>
  );
}

export default Alerts;