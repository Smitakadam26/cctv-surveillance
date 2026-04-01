import { X, MapPin, Camera, AlertTriangle, Clock } from 'lucide-react';

export const AlertDetailsModal = ({ alert, onClose }) => {
  if (!alert) return null;
  /*
  const getImageSrc = (data) => {
  if (!data) return null;

  // If already full data URL
  if (data.startsWith("data:image")) return data;

  // Otherwise add prefix
  return `data:image/jpeg;base64,${data}`;
};*/
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-800/50">
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-blue-500" />
            Alert Details
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center relative min-h-48 group">
            {/*{alert.image_data ? (
              <img 
                src={getImageSrc(alert.image_data)} 
                alt="Crime snapshot" 
                className="w-full h-auto object-cover max-h-64"
              />
            ) : (
              <div className="text-slate-600 flex flex-col items-center">
                <Camera className="h-10 w-10 mb-2 opacity-50" />
                <span>No Image Available</span>
              </div>
            )}
            
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border shadow-sm backdrop-blur-md ${
                alert.status === 'active' 
                ? 'bg-red-500/20 text-red-200 border-red-500/50' 
                : 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50'
              }`}>
                {alert.status.toUpperCase()}
              </span>
            </div>*/}
            
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Crime Type</span>
                <p className="font-semibold text-slate-100 text-lg mt-1">{alert.crime_type}</p>
              </div>
              <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Alert ID</span>
                <p className="font-semibold text-slate-300 mt-1">{alert.id}</p>
              </div>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-sm text-slate-400 font-medium block">Location</span>
                  <span className="text-slate-200">{alert.location}</span>
                </div>
              </div>
              
              <div className="w-full h-px bg-slate-700/50" />
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-sm text-slate-400 font-medium block">Timestamp</span>
                  <span className="text-slate-200">
                    {new Date(alert.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
