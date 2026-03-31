import { useEffect, useState } from 'react';
import { AlertDetailsModal } from '../components/AlertDetailsModal';
import { AlertTriangle, Filter, Eye } from 'lucide-react';

export const AlertsList = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filter, setFilter] = useState('all'); 

  useEffect(() => {
  const interval = setInterval(async () => {
    try {
      const res = await fetch("/api/alerts");
      const data = await res.json();
      setLoading(true);
      setAlerts(prev => [...data, ...prev]); 
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch alerts');
    }
    finally {
        setLoading(false);
      }
  }, 3000); 

  return () => clearInterval(interval);
}, []);
/*
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
*/
  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.status === filter;
  });

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
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">Alerts</h1>
          <p className="text-slate-400 mt-1">Manage and review detected incidents.</p>
        </div>
        
        <div className="flex space-x-2 p-1 bg-slate-900 rounded-lg border border-slate-700">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'all' ? 'bg-slate-700 text-slate-100' : 'text-slate-400 hover:text-slate-200'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'active' ? 'bg-red-900/40 text-red-400 border border-red-800/50' : 'text-slate-400 hover:text-red-400'}`}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('resolved')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'resolved' ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-800/50' : 'text-slate-400 hover:text-emerald-400'}`}
          >
            Resolved
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">ID</th>
                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Crime Type</th>
                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Location</th>
                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Timestamp</th>
                <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Status</th>
                <th scope="col" className="px-6 py-4 font-semibold tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Filter className="h-10 w-10 mb-2 opacity-50" />
                      <p>No alerts found matching the current criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAlerts.map(alert => (
                  <tr 
                    key={alert.id} 
                    className="hover:bg-slate-800/50 transition-colors group cursor-pointer"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-200">
                      {alert.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {alert.crime_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {alert.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                      {new Date(alert.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                        alert.status === 'active' 
                        ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-md transition-all group-hover:text-blue-400"
                        title="View Details"
                      >
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

      {selectedAlert && (
        <AlertDetailsModal 
          alert={selectedAlert} 
          onClose={() => setSelectedAlert(null)} 
        />
      )}
    </div>
  );
};
