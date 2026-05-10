import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3b82f6", // blue
  "#ef4444", // red
  "#22c55e", // green
  "#f59e0b", // yellow
  "#a855f7", // purple
  "#06b6d4", // cyan
  "#ec4899", // pink
];

export default function CrimePieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch(
          "https://cctv-surveillance.vercel.app/api/alerts"
        );

        const alerts = await res.json();

        // Count crime types
        const counts = {};

        alerts.forEach((item) => {
          const type = item.crime_type || "Unknown";

          counts[type] = (counts[type] || 0) + 1;
        });

        // Convert object to array for recharts
        const formatted = Object.keys(counts).map((key) => ({
          name: key,
          value: counts[key],
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching alerts:", err);
      }
    };

    // Initial fetch
    fetchAlerts();

    // Fetch every 5 seconds
    const interval = setInterval(fetchAlerts, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full h-[450px]">
      <h2 className="text-xl font-semibold text-white mb-6">
        Real-Time Crime Distribution
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={60}
            paddingAngle={3}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}