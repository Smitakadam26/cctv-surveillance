import { X, MapPin, Camera, AlertTriangle, Clock } from 'lucide-react';
import { useState } from 'react';

export const AlertDetailsModal = ({ alert, onClose }) => {
  if (!alert) return null;
  const [previewImage, setPreviewImage] = useState(null);
  const getImageSrc = (data) => {
    if (!data) return null;

    // If already full data URL
    if (data.startsWith("data:image")) return data;

    // Otherwise add prefix
    return `data:image/jpeg;base64,${data}`;
  }
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
          <div className="mb-6 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center relative min-h-[300px] group p-2">
  
  {alert.image_data ? (
    <>
      {/* Main Image */}
      <img
        src={getImageSrc(alert.image_data)}
        alt="Alert"
        className="w-full max-h-[400px] object-contain rounded-lg cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        onClick={() =>
          setPreviewImage(getImageSrc(alert.image_data))
        }
      />

      {/* Fullscreen Preview */}
      {previewImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm">
          
          {/* Background Click Close */}
          <div
            className="absolute inset-0"
            onClick={() => setPreviewImage(null)}
          ></div>

          {/* Preview Container */}
          <div className="relative z-10 w-[95vw] h-[95vh] flex items-center justify-center">
            
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />

            {/* Close Button */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 bg-slate-800 text-white p-3 rounded-full hover:bg-red-500 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  ) : (
    <span className="text-slate-500 text-sm">
      No Image Available
    </span>
  )}
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
