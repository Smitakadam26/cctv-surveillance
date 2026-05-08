import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", alerts: 12 },
  { day: "Tue", alerts: 18 },
  { day: "Wed", alerts: 9 },
  { day: "Thu", alerts: 22 },
  { day: "Fri", alerts: 16 },
  { day: "Sat", alerts: 28 },
  { day: "Sun", alerts: 14 },
];

export default function AlertsChart() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full overflow-hidden">
      
      <h2 className="text-xl font-semibold text-white mb-6">
        Weekly Alerts
      </h2>

      <div className="overflow-x-auto">
        
        <LineChart
          width={700}
          height={350}
          data={data}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1e293b"
          />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
          />

          <YAxis stroke="#94a3b8" />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="alerts"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>

      </div>
    </div>
  );
}