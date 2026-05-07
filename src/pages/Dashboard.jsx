import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";

import { Analytics } from "./Analytics";

export const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);

  // Dynamic CCTV locations
  const [locations, setLocations] = useState(() => {
    const saved = localStorage.getItem("cctv_locations");
    return saved
      ? JSON.parse(saved)
      : [
          {
            cctv_id: "Gate_CCTV_NORTH_01",
            name: "Exit Gate",
            lat: 18.965088979894606,
            lng: 73.9967724321296,
          },
          {
            cctv_id: "Gate_CCTV_SOUTH_02",
            name: "Front Gate",
            lat: 18.965600743189192,
            lng: 74.00807039797311,
          },
        ];
  });

  // Form state
  const [formData, setFormData] = useState({
    cctv_id: "",
    name: "",
    lat: "",
    lng: "",
  });

  // Save locations in localStorage
  useEffect(() => {
    localStorage.setItem(
      "cctv_locations",
      JSON.stringify(locations)
    );
  }, [locations]);

  // Fetch alerts
  const fetchAlerts = async () => {
    try {
      const res = await fetch(
        "https://cctv-surveillance.vercel.app/api/alerts"
      );

      const data = await res.json();

      setAlerts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAlerts();

    const interval = setInterval(fetchAlerts, 3000);

    return () => clearInterval(interval);
  }, []);

  // Add CCTV
  const handleAddLocation = () => {
    if (
      !formData.cctv_id ||
      !formData.name ||
      !formData.lat ||
      !formData.lng
    ) {
      return alert("Please fill all fields");
    }

    // Prevent duplicates
    const exists = locations.some(
      (loc) => loc.cctv_id === formData.cctv_id
    );

    if (exists) {
      return alert("CCTV ID already exists");
    }

    const newLocation = {
      cctv_id: formData.cctv_id,
      name: formData.name,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
    };

    setLocations((prev) => [...prev, newLocation]);

    // Reset form
    setFormData({
      cctv_id: "",
      name: "",
      lat: "",
      lng: "",
    });
  };

  // Delete CCTV
  const handleDelete = (id) => {
    setLocations((prev) =>
      prev.filter((loc) => loc.cctv_id !== id)
    );
  };

  // Stats
  const totalAlerts = alerts.length;

  const activeAlerts = alerts.filter(
    (a) => a.status === "Active"
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-50">
          Overview
        </h1>

        <p className="text-slate-400 mt-1">
          Real-time statistics of crime detection system.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Alerts */}
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-slate-400 font-medium">
              Total Alerts
            </h2>

            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <Activity className="h-6 w-6" />
            </div>
          </div>

          <p className="text-4xl font-bold text-slate-50 mt-4">
            {totalAlerts}
          </p>
        </div>

        {/* Active Alerts */}
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-slate-400 font-medium">
              Active Alerts
            </h2>

            <div className="p-2 bg-red-500/20 text-red-400 rounded-lg">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>

          <p className="text-4xl font-bold text-slate-50 mt-4">
            {activeAlerts}
          </p>
        </div>

        {/* Monitored Zones */}
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-slate-400 font-medium">
              Monitored Zones
            </h2>

            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
          </div>

          <p className="text-4xl font-bold text-slate-50 mt-4">
            {locations.length}
          </p>
        </div>
      </div>

      {/* Add CCTV Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Plus className="text-blue-400" />
          <h2 className="text-xl font-semibold text-white">
            Add CCTV Location
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* CCTV ID */}
          <input
            type="text"
            placeholder="CCTV ID"
            value={formData.cctv_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                cctv_id: e.target.value,
              })
            }
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
          />

          {/* Name */}
          <input
            type="text"
            placeholder="Location Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
          />

          {/* Latitude */}
          <input
            type="number"
            placeholder="Latitude"
            value={formData.lat}
            onChange={(e) =>
              setFormData({
                ...formData,
                lat: e.target.value,
              })
            }
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
          />

          {/* Longitude */}
          <input
            type="number"
            placeholder="Longitude"
            value={formData.lng}
            onChange={(e) =>
              setFormData({
                ...formData,
                lng: e.target.value,
              })
            }
            className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddLocation}
          className="mt-5 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-white font-medium"
        >
          Add CCTV
        </button>
      </div>

      {/* CCTV List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">
          CCTV Locations
        </h2>

        <div className="space-y-4">
          {locations.length === 0 ? (
            <p className="text-slate-500">
              No CCTV locations added
            </p>
          ) : (
            locations.map((loc) => (
              <div
                key={loc.cctv_id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-800/50 border border-slate-700 rounded-xl p-4"
              >
                <div>
                  <p className="text-white font-semibold">
                    {loc.name}
                  </p>

                  <p className="text-slate-400 text-sm">
                    CCTV ID: {loc.cctv_id}
                  </p>

                  <p className="text-slate-500 text-sm">
                    Lat: {loc.lat} | Lng: {loc.lng}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleDelete(loc.cctv_id)
                  }
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Analytics */}
      <Analytics />
    </div>
  );
};