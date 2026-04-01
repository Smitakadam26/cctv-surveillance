import { useEffect, useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    try {
      const res = await fetch("https://cctv-surveillance.vercel.app/api/alerts");
      const data = await res.json();
      console.log(data)
      setAlerts(data);
    } catch (err) {
      console.error(err);
    }
  };
<<<<<<< HEAD

  useEffect(() => {
    fetchAlerts(); // initial load

=======

  useEffect(() => {
    fetchAlerts(); // initial load

>>>>>>> 120b42b06d52f0b4a2fdc430fad365edd38d626b
    const interval = setInterval(fetchAlerts, 3000); // every 3 sec

    return () => clearInterval(interval);
  }, []);
const handleResolve = (id) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "resolved" } : a
      )
    );
  };
  return (
    <div>
     <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800">
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-sm text-left text-slate-300">

          {/* Header */}
          <thead className="bg-slate-800/60 text-xs uppercase text-slate-400 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">✔</th>
              <th className="px-6 py-4">Crime Type</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-800">
            {alerts.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                  No alerts found
                </td>
              </tr>
            ) : (
              aler.map((alert) => (
                <tr
                  key={alert.id}
                  className={`group transition-all duration-300 hover:bg-slate-800/40
                  ${alert.priority === "high" ? "border-l-4 border-red-500" : ""}
                  ${alert.priority === "medium" ? "border-l-4 border-yellow-500" : ""}
                  ${alert.priority === "low" ? "border-l-4 border-green-500" : ""}
                  ${alert.status === "resolved" ? "opacity-50 line-through" : ""}
                  `}
                >
                  {/* ✅ Checkbox */}
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={alert.status === "resolved"}
                      onChange={() => handleResolve(alert.id)}
                      className="w-4 h-4 accent-emerald-500 cursor-pointer"
                    />
                  </td>

                  {/* Crime Type */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-slate-700/50 text-xs">
                      {alert.crime_type}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4 text-slate-400">
                    📍 {alert.location.replaceAll("_", " ")}
                  </td>

                  {/* Timestamp */}
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {new Date(alert.timestamp).toLocaleString()}
                  </td>

                  {/* Priority */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        alert.priority === "high"
                          ? "bg-red-500/10 text-red-400"
                          : alert.priority === "medium"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-green-500/10 text-green-400"
                      }`}
                    >
                      {alert.priority.toUpperCase()}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border
                      ${
                        alert.status === "active"
                          ? "bg-red-500/10 text-red-400 border-red-500/30"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      {alert.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg bg-slate-800 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition">
                      👁️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
    </div>
  );
}

export default Alerts;