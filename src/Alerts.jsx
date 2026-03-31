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
    <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-800/50 text-xs uppercase text-slate-400 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Crime Type</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-700/50">
            {alerts.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center">
                    <Filter className="h-10 w-10 mb-2 opacity-50" />
                    <p>No alerts found</p>
                  </div>
                </td>
              </tr>
            ) : (
              alerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="hover:bg-slate-800/50 transition group cursor-pointer"
                  
                >
                  <td className="px-6 py-4 text-slate-200 font-medium">
                    {alert.id}
                  </td>

                  <td className="px-6 py-4">
                    {alert.crime_type}
                  </td>

                  <td className="px-6 py-4">
                    {alert.location}
                  </td>

                  <td className="px-6 py-4 text-slate-400">
                    {alert.timestamp}
                  </td>

                  {/* ✅ Priority badge */}
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      alert.priority === "HIGH"
                        ? "bg-red-500/10 text-red-400"
                        : alert.priority === "MEDIUM"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-green-500/10 text-green-400"
                    }`}>
                      {alert.priority}
                    </span>
                  </td>

                  {/* ✅ Status badge */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                      alert.status === "active"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}>
                      {alert.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-md transition">
                      <Eye className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      
    </div>
  );
}

export default Alerts;