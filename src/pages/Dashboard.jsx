import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Analytics } from './Analytics';

import {  MapPin } from 'lucide-react';

export const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading,setLoading] = useState();
  
  const KNOWN_LOCATIONS = [
  { cctv_id: 'Gate_CCTV_NORTH_01', name: "Exit gate", lat: 18.965088979894606 ,lng:73.9967724321296 },
  { cctv_id: 'Gate_CCTV_SOUTH_02', name: "Entry Main gate", lat: 18.965600743189192, lng: 74.00807039797311},
];
   const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://cctv-surveillance.vercel.app/api/alerts");
      const data = await res.json();
      setAlerts(data);
      
    } catch (err) {
      console.error(err);
    }
    finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 3000);

    return () => clearInterval(interval);
  }, []);

  {/*if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
        </div>
      </div>
    );
  }*/}


  const totalAlerts = alerts.length;
  const activeAlerts = alerts.filter(a => a.status === 'Active').length;

  return (
    <div className="space-y-6">
      <button
        onClick={fetchAlerts}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition disabled:opacity-50"
      >
        {loading ? "Refreshing..." : "🔄 Refresh Alerts"}
      </button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-50">Overview</h1>
        <p className="text-slate-400 mt-1">Real-time statistics of crime detection system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors">
          <div className="flex items-center justify-between">
            <h2 className="text-slate-400 font-medium">Total Alerts</h2>
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
              <Activity className="h-6 w-6" />
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-50 mt-4">{totalAlerts}</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors">
          <div className="flex items-center justify-between">
            <h2 className="text-slate-400 font-medium">Active Alerts</h2>
            <div className="p-2 bg-red-500/20 text-red-400 rounded-lg">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-50 mt-4">{activeAlerts}</p>
        </div>
    
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors">
          <div className="flex items-center justify-between">
            <h2 className="text-slate-400 font-medium">Monitored Zones</h2>
            <div className="p-2 bg-red-500/20 text-blue-400 rounded-lg">
             <MapPin className="h-6 w-6" />
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-50 mt-4">{KNOWN_LOCATIONS.length}</p>
        </div>

       
      </div>
      
      
      <Analytics/>
    </div>
  );
};
