import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
export const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on("new-alert", (alert) => {
      setAlerts(prev => [alert, ...prev]);
    });

    return () => {
      socket.off("new-alert");
    };
  }, []);/*
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAlerts();
        setAlerts(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch alerts');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-500 text-red-100 px-4 py-3 rounded-md">
        <p className="flex items-center"><AlertTriangle className="mr-2 h-5 w-5"/> Error: {error}</p>
      </div>
    );
  }*/

  const totalAlerts = alerts.length;
  const activeAlerts = alerts.filter(a => a.status === 'active').length;
  const resolvedAlerts = alerts.filter(a => a.status === 'resolved').length;

  return (
    <div className="space-y-6">
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
            <h2 className="text-slate-400 font-medium">Resolved Alerts</h2>
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <CheckCircle2 className="h-6 w-6" />
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-50 mt-4">{resolvedAlerts}</p>
        </div>
      </div>
      
      <div className="mt-8 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-slate-200">System Status</h3>
        <div className="flex items-center space-x-2 text-slate-300">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <p>The prediction algorithms and camera feeds are operating nominally.</p>
        </div>
      </div>
    </div>
  );
};
