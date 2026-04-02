import { useEffect, useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState();
  const [previewImage, setPreviewImage] = useState(null);
  
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://cctv-surveillance.vercel.app/api/alerts");
      const data = await res.json();
      console.log(data)
      setAlerts(data);

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
  const handleResolve = (id) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "resolved" } : a
      )
    );
  };
  const getImageSrc = (data) => {
    if (!data) return null;

    // If already full data URL
    if (data.startsWith("data:image")) return data;

    // Otherwise add prefix
    return `data:image/jpeg;base64,${data}`;
  }
  return (
    <div>
      <button
        onClick={fetchAlerts}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition disabled:opacity-50"
      >
        {loading ? "Refreshing..." : "🔄 Refresh Alerts"}
      </button>
      <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800">
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-sm text-left text-slate-300">

            <thead className="bg-slate-800/60 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4">✔</th>
                <th className="px-6 py-4">Crime Type</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {alerts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    No alerts found
                  </td>
                </tr>
              ) : (
                alerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className={`group transition-all duration-300 hover:bg-slate-800/40
                  ${alert.priority === "high" ? "border-l-4 border-red-500" : ""}
                  ${alert.priority === "medium" ? "border-l-4 border-yellow-500" : ""}
                  ${alert.priority === "low" ? "border-l-4 border-green-500" : ""}
                  ${alert.status === "resolved" ? "opacity-50 line-through" : ""}
                  `}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={alert.status === "resolved"}
                        onChange={() => handleResolve(alert.id)}
                        className="w-4 h-4 accent-emerald-500 cursor-pointer"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-slate-700/50 text-xs">
                        {alert.crime_type}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-400">
                      📍 {alert.location.replaceAll("_", " ")}
                    </td>

                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(alert.timestamp).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${alert.priority === "high"
                            ? "bg-red-500/10 text-red-400"
                            : alert.priority === "medium"
                              ? "bg-yellow-500/10 text-yellow-400"
                              : "bg-green-500/10 text-green-400"
                          }`}
                      >
                        {alert.priority.toUpperCase()}
                      </span>
                    </td>

                    

                    <td className="px-6 py-4 text-right relative">
                      {alert.image_data ? (
                        <img
                          src={getImageSrc(alert.image_data)}
                          alt="Crime snapshot"
                          className="w-16 h-16 object-cover rounded-lg border border-slate-700"
                          onClick={() => setPreviewImage(getImageSrc(alert.image_data))}
                        />
                      ) : (
                        <div className="text-slate-600 flex flex-col items-center">
                          <Camera className="h-6 w-6 mb-1 opacity-50" />
                          <span className="text-xs">No Image</span>
                        </div>
                      )}

                     
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
      {previewImage && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
    
    {/* Close on background click */}
    <div
      className="absolute inset-0"
      onClick={() => setPreviewImage(null)}
    ></div>

    {/* Image */}
    <div className="relative z-10 max-w-4xl w-full p-4">
      <img
        src={previewImage}
        alt="Preview"
        className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
      />

      {/* Close button */}
      <button
        onClick={() => setPreviewImage(null)}
        className="absolute top-2 right-2 bg-slate-800 text-white p-2 rounded-full hover:bg-red-500"
      >
        ✕
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default Alerts;