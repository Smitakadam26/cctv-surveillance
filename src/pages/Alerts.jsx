import { useEffect, useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  // Load resolved alerts from localStorage
  const [resolvedAlerts, setResolvedAlerts] = useState(() => {
    const saved = localStorage.getItem("resolvedAlerts");
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch alerts from API
  const fetchAlerts = async () => {
    try {

      const res = await fetch(
        "https://cctv-surveillance.vercel.app/api/alerts"
      );

      const data = await res.json();

      // Remove alerts already resolved
      const resolvedIds = resolvedAlerts.map((a) => a.id);

      const activeAlerts = data.filter(
        (alert) => !resolvedIds.includes(alert.id)
      );

      // Prevent duplicates
      setAlerts((prev) => {
        const existingIds = prev.map((a) => a.id);

        const newAlerts = activeAlerts.filter(
          (a) => !existingIds.includes(a.id)
        );

        return [...newAlerts, ...prev];
      });
    } catch (err) {
      console.error(err);
    } finally {
      //setLoading(false);
    }
  };

  // Initial load + polling
  useEffect(() => {
    fetchAlerts();

    const interval = setInterval(fetchAlerts, 3000);

    return () => clearInterval(interval);
  });

  // Save resolved alerts permanently
  useEffect(() => {
    localStorage.setItem(
      "resolvedAlerts",
      JSON.stringify(resolvedAlerts)
    );
  }, [resolvedAlerts]);

  // Resolve alert
  const handleResolve = (id) => {
    const alertToResolve = alerts.find((a) => a.id === id);

    if (!alertToResolve) return;

    // Remove from active alerts
    setAlerts((prev) => prev.filter((a) => a.id !== id));

    // Add to resolved alerts
    setResolvedAlerts((prev) => {
      // Prevent duplicates
      if (prev.some((a) => a.id === id)) return prev;

      return [
        {
          ...alertToResolve,
          resolvedAt: new Date().toISOString(),
        },
        ...prev,
      ];
    });
  };

  // Image helper
  const getImageSrc = (data) => {
    if (!data) return null;

    if (data.startsWith("data:image")) return data;

    return `data:image/jpeg;base64,${data}`;
  };

  // Combine both lists
  const allAlerts = [...alerts, ...resolvedAlerts];

  return (
    <div>
      
      {/* Stats */}
      <div className="flex gap-6 mb-4 text-sm">
        <p className="text-red-400">
          Active: {alerts.length}
        </p>

        <p className="text-green-400">
          Resolved: {resolvedAlerts.length}
        </p>
      </div>

      {/* Table */}
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
                <th className="px-6 py-4">Image</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {allAlerts.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-slate-500"
                  >
                    No alerts found
                  </td>
                </tr>
              ) : (
                allAlerts.map((alert) => {
                  const isResolved = resolvedAlerts.some(
                    (r) => r.id === alert.id
                  );

                  return (
                    <tr
                      key={alert.id}
                      className={`
                        hover:bg-slate-800/40
                        ${isResolved
                          ? "opacity-50 line-through"
                          : ""}
                      `}
                    >
                      {/* Checkbox */}
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={isResolved}
                          disabled={isResolved}
                          onChange={() =>
                            handleResolve(alert.id)
                          }
                          className="w-4 h-4 accent-green-500"
                        />
                      </td>

                      {/* Crime */}
                      <td className="px-6 py-4">
                        {alert.crime_type}
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4">
                        📍{" "}
                        {alert.location?.replaceAll(
                          "_",
                          " "
                        )}
                      </td>

                      {/* Timestamp */}
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(
                          alert.timestamp
                        ).toLocaleString()}
                      </td>

                      {/* Priority */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs
                          ${
                            alert.priority === "high"
                              ? "bg-red-500/20 text-red-400"
                              : alert.priority === "medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {alert.priority}
                        </span>
                      </td>

                      {/* Image */}
                      <td className="px-6 py-4">
                        {alert.image_data ? (
                          <img
                            src={getImageSrc(
                              alert.image_data
                            )}
                            alt="alert"
                            className="w-16 h-16 rounded object-cover cursor-pointer"
                            onClick={() =>
                              setPreviewImage(
                                getImageSrc(
                                  alert.image_data
                                )
                              )
                            }
                          />
                        ) : (
                          <span className="text-slate-500 text-xs">
                            No Image
                          </span>
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

      {/* Image Preview */}
      {previewImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setPreviewImage(null)}
          />

          <div className="relative z-10 max-w-4xl w-full p-4">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />

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