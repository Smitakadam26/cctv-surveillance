import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AlertsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch(
          "https://cctv-surveillance.vercel.app/api/alerts"
        );

        const alerts = await res.json();

        // Count alerts per minute
        const grouped = {};

        alerts.forEach((item) => {
          // Example:
          // "02-April-2026 12:15:05"
          const time = item.timestamp.slice(0, 17);

          grouped[time] = (grouped[time] || 0) + 1;
        });

        // Convert to chart format
        const formatted = Object.keys(grouped).map((time) => ({
          time,
          alerts: grouped[time],
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    fetchAlerts();

    const interval = setInterval(fetchAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full h-[420px]">
      <h2 className="text-xl font-semibold text-white mb-6">
        Alerts Frequency
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
          />

          <XAxis
            dataKey="time"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="alerts"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}