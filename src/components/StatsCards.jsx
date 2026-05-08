import { useEffect, useState } from "react";

import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Camera,
} from "lucide-react";

export default function StatsCards() {
  const [alerts, setAlerts] = useState([]);

  const [locations] = useState(() => {
  const saved = localStorage.getItem("cctv_locations");

  return saved ? JSON.parse(saved) : [];
});

  const fetchAlerts = async () => {
    try {
      const res = await fetch(
        "https://cctv-surveillance.vercel.app/api/alerts"
      );

      const data = await res.json();

      console.log(data);

      setAlerts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    //fetchAlerts();

    // Realtime update every 3 sec
    const interval = setInterval(fetchAlerts, 3000);

    return () => clearInterval(interval);
  }, []);

  const resolvedAlerts = JSON.parse(
    localStorage.getItem("resolvedAlerts") || "[]"
  );

  const totalAlerts = alerts.length;

  const activeAlerts = alerts.filter(
    (a) => a.status !== "resolved"
  ).length;

  const resolvedCount = resolvedAlerts.length;

  const cctvCount = locations.length;
  
  // Dynamic Cards
  const cards = [
    {
      title: "Total Alerts",
      value: totalAlerts,
      icon: Activity,
      bg: "bg-blue-500/20",
      text: "text-blue-400",
    },

    {
      title: "Active Alerts",
      value: activeAlerts,
      icon: AlertTriangle,
      bg: "bg-red-500/20",
      text: "text-red-400",
    },

    {
      title: "Resolved Alerts",
      value: resolvedCount,
      icon: CheckCircle2,
      bg: "bg-green-500/20",
      text: "text-green-400",
    },

    {
      title: "CCTV Cameras",
      value: cctvCount,
      icon: Camera,
      bg: "bg-purple-500/20",
      text: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between">
              
              {/* Text */}
              <div>
                <p className="text-slate-400 text-sm">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold text-white mt-3">
                  {card.value}
                </h2>
              </div>

              {/* Icon */}
              <div
                className={`p-3 rounded-xl ${card.bg}`}
              >
                <Icon
                  className={`w-7 h-7 ${card.text}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}