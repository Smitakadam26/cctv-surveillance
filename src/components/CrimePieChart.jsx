import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Theft", value: 35 },
  { name: "Assault", value: 20 },
  { name: "Weapon", value: 15 },
  { name: "Suspicious", value: 30 },
];

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#22c55e",
  "#f59e0b",
];

export default function CrimePieChart() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 overflow-hidden">
      
      <h2 className="text-xl font-semibold text-white mb-6">
        Crime Distribution
      </h2>

      <div className="overflow-x-auto flex justify-center">
        
        <PieChart width={400} height={350}>
          
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
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

      </div>
    </div>
  );
}