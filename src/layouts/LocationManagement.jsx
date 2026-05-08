import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, Zap, LogOut, User } from 'lucide-react';


import { useEffect, useState} from "react";
import {
  Activity,
  AlertTriangle,
  MapPin,
  Plus,
  Trash2,
  X
} from "lucide-react";
import { ShieldCloseIcon } from 'lucide-react';
import { Analytics } from '../pages/Analytics';
export const  LocationManagement = () => {
    const [showPopup,setShowPopup] = useState(false);

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

  const [formData, setFormData] = useState({
    cctv_id: "",
    name: "",
    lat: "",
    lng: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "cctv_locations",
      JSON.stringify(locations)
    );
  }, [locations]);

  

    const handleAddLocation = (e) => {
    e.preventDefault();

    const newLocation = {
      id: Date.now(),
      cctv_id: formData.cctv_id,
      name: formData.name,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
    };

    setLocations((prev) => [...prev, newLocation]);

    // Reset
    setFormData({
      cctv_id: "",
      name: "",
      lat: "",
      lng: "",
    });

    setShowPopup(false);
  };

  const handleDelete = (id) => {
    setLocations((prev) =>
      prev.filter((loc) => loc.id !== id)
    );
  };
  return (
    <div className="space-y-6">
      
      <div>
        <h1 className="text-3xl font-bold text-white">
          CCTV Locations
        </h1>

        <p className="text-slate-400 mt-1">
          Manage CCTV cameras and surveillance zones.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              CCTV Location List
            </h2>

            <button
              onClick={() => setShowPopup(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
            >
              <Plus className="w-4 h-4" />
              Add CCTV
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {locations.length === 0 ? (
              <p className="text-slate-500">
                No CCTV locations added
              </p>
            ) : (
              locations.map((loc) => (
                <div
                  key={loc.id}
                  className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-400" />

                      <p className="text-white font-medium">
                        {loc.name}
                      </p>
                    </div>

                    <p className="text-slate-400 text-sm mt-2">
                      CCTV ID: {loc.cctv_id}
                    </p>

                    <p className="text-slate-500 text-sm">
                      Lat: {loc.lat}
                    </p>

                    <p className="text-slate-500 text-sm">
                      Lng: {loc.lng}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(loc.id)
                    }
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-3 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

       <Analytics locations={locations}/>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          
          <div
            className="absolute inset-0"
            onClick={() => setShowPopup(false)}
          />

          <div className="relative z-10 w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Add New CCTV
              </h2>

             <button
                onClick={() => setShowPopup(false)}
                className="text-slate-400 hover:text-white"
              >
                  <X/>
              </button>
            </div>

            <form
              onSubmit={handleAddLocation}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="CCTV ID"
                required
                value={formData.cctv_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    cctv_id: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
              />

              <input
                type="text"
                placeholder="Location Name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
              />

              <input
                type="number"
                step="any"
                placeholder="Latitude"
                required
                value={formData.lat}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lat: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
              />

              <input
                type="number"
                step="any"
                placeholder="Longitude"
                required
                value={formData.lng}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    lng: e.target.value,
                  })
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-xl text-white font-semibold"
              >
                Add CCTV
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};