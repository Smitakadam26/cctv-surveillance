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

        // Convert API data into chart format
        const formatted = alerts.map((item, index) => ({
          time: new Date(item.timestamp).toLocaleTimeString(),
          alerts: item.count || 1,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    // Initial fetch
    fetchAlerts();

    // Refresh every 5 sec
    const interval = setInterval(fetchAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full h-[420px]">
      <h2 className="text-xl font-semibold text-white mb-6">
        Real-Time Alerts
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
            dot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}