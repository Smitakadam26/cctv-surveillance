import { useEffect, useState } from "react";
import { AlertDetailsModal } from "../components/AlertDetailsModal";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState();
  const [open,setopen] = useState(false);
  const [selectedAlert,setSelectedAlert] = useState();
  const [resolvedAlerts, setResolvedAlerts] = useState(() => {
  const saved = localStorage.getItem("resolvedAlerts");
  return saved ? JSON.parse(saved) : [];
});
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://cctv-surveillance.vercel.app/api/alerts");
      const data = await res.json();
      console.log(data)
      setAlerts(prev => {
  const filtered = data.filter(
    newA =>
      !resolvedAlerts.some(r => r.id === newA.id) && // ignore resolved
      !prev.some(old => old.id === newA.id)          // avoid duplicates
  );

  return [...filtered, ...prev];
});

    } catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    localStorage.setItem("resolvedAlerts", JSON.stringify(resolvedAlerts));
  }, [resolvedAlerts]);
  const handleResolve = (id) => {
  const alertToResolve = alerts.find(a => a.id === id);

  // remove from active
  setAlerts(prev => prev.filter(a => a.id !== id));

  // add to resolved
  setResolvedAlerts(prev => [alertToResolve, ...prev]);
};
  const getImageSrc = (data) => {
    if (!data) return null;

    // If already full data URL
    if (data.startsWith("data:image")) return data;

    // Otherwise add prefix
    return `data:image/jpeg;base64,${data}`;
  }
   const allAlerts = [...alerts, ...resolvedAlerts];
  return (
    <div>
      <div className="flex gap-3 mb-4">

     
      </div>
        <div className="flex gap-6 mb-4 text-sm">
        <p className="text-red-400">Active: {alerts.length}</p>
        <p className="text-green-400">Resolved: {resolvedAlerts.length}</p>
      </div>
      <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800">
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-sm text-left text-slate-300">

            <thead className="bg-slate-800/60 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4">✔</th>
                <th className="px-6 py-4">Crime Type</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
             {allAlerts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-500">
                    No alerts found
                  </td>
                </tr>
              ) : (
                allAlerts.map(alert => {
                  const isResolved = resolvedAlerts.some(r => r.id === alert.id);

                  return (
                    <tr
                      key={alert.id}
                      className={`border-b border-slate-800 hover:bg-slate-800/40
                      ${isResolved ? "opacity-50 line-through" : ""}
                      `}
                    >
                      {/* Checkbox */}
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={isResolved}
                          onChange={() => handleResolve(alert.id)}
                          className="w-4 h-4 accent-green-500"
                        />
                      </td>

                      {/* Crime */}
                      <td className="px-6 py-4">
                        {alert.crime_type}
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4">
                        📍 {alert.location?.replaceAll("_", " ")}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs
                          ${alert.priority === "high" ? "bg-red-500/20 text-red-400" :
                            alert.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-green-500/20 text-green-400"}`}>
                          {alert.priority}
                        </span>
                      </td>

                      {/* Image */}
                      <td className="px-6 py-4">
                        {alert.image_data ? (
                          <img
                            src={getImageSrc(alert.image_data)}
                            className="w-16 h-16 rounded object-cover cursor-pointer"
                            onClick={() => setopen(true) ,setSelectedAlert(alert)}
                          />
                        ) : (
                          <span className="text-slate-500 text-xs">No Image</span>
                        )}
                      </td>

                    
                    </tr>
                  );
                })
              )}
            </tbody>

          </table>
        </div>
      </div>
     
{open && (
  <AlertDetailsModal
    alert={selectedAlert}
    onClose={() => setopen(false)}
  />
)}
    </div>
  );
}

export default Alerts;