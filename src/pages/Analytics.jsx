import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle, MapPin } from 'lucide-react';
const DEFAULT_CENTER = [18.9692, 74.0168];

const KNOWN_LOCATIONS = [
    { cctv_id: 'Gate_CCTV_NORTH_01', name: "Main Entry", lat: 18.965088979894606, lng: 73.9967724321296 },
    { cctv_id: 'CCTV_SOUTH_02', name: "Exit Gate", lat: 18.965600743189192, lng: 74.00807039797311 },
];

const createCustomIcon = (isAlerting) => {
    return L.divIcon({
        className: 'custom-icon border-0 bg-transparent',
        html: `<div class="w-8 h-8 rounded-full border-4 shadow-xl flex items-center justify-center transition-all duration-300 ${isAlerting
                ? 'border-red-500/50 bg-red-500 animate-pulse shadow-red-500/50'
                : 'border-blue-500/30 bg-blue-500 hover:bg-blue-400 shadow-blue-500/30'
            }"><div class="w-2 h-2 rounded-full bg-white"></div></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -16]
    });
};

export const Analytics = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const res = await fetch("https://cctv-surveillance.vercel.app/api/alerts");
                const data = await res.json();
                setAlerts(data);
            } catch (err) {
                console.error("Failed to fetch alerts for map:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();

        const intervalId = setInterval(fetchAlerts, 3000);
        return () => clearInterval(intervalId);
    }, []);

    const hasActiveAlert = (locationName) => {
        return alerts.some(alert =>
            alert.status === 'active' &&
            alert.location &&
            (alert.location.toLowerCase().includes(locationName.toLowerCase()) ||
                locationName.toLowerCase().includes(alert.location.toLowerCase()))
        );
    };


    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-sm relative min-h-[500px]">
                {loading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/50">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                <MapContainer
                    center={DEFAULT_CENTER}
                    zoom={13}
                    style={{ height: '500px', width: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />

                    {KNOWN_LOCATIONS.map((loc) => {
                        const isAlerting = hasActiveAlert(loc.name) || (loc.cctv_id ===alerts);
                        const cameraAlerts = alerts.filter(a =>  a.location.toLowerCase().includes(loc.name.toLowerCase()));

                        return (
                            <Marker
                                key={loc.cctv_id}
                                position={[loc.lat, loc.lng]}
                                icon={createCustomIcon(isAlerting)}
                            >
                                <Popup className="custom-popup">
                                    <div className="p-1">
                                        <h3 className="font-bold text-gray-800 text-lg mb-1">{loc.name}</h3>
                                        {isAlerting ? (
                                            <div className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded border border-red-200 mt-2">
                                                <p className="font-bold flex items-center gap-1">
                                                    <AlertTriangle size={14} /> Active Crime Alert
                                                </p>
                                                {cameraAlerts.length > 0 && <p className="mt-1 text-xs">{cameraAlerts[0].crime_type}</p>}
                                            </div>
                                        ) : (
                                            <div className="bg-emerald-100 text-emerald-800 text-sm px-2 py-1 rounded border border-emerald-200 mt-2">
                                                <p className="font-semibold">Status: Secure</p>
                                            </div>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>

            <style>{`
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
        }
        .leaflet-container {
          background-color: #0f172a;
        }
      `}</style>
        </div>
    );
};
