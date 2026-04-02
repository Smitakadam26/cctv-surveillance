import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, Zap } from 'lucide-react';

const Sidebar = () => {
  
  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed">
      <div className="p-6 flex items-center space-x-3 mb-6">
        <Zap className="h-8 w-8 text-blue-500" />
        <h1 className="text-xl font-bold text-slate-100 uppercase tracking-wider">Crime<span className="text-blue-500">Detect</span></h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-600 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`
          }
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/alerts" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? 'bg-blue-600 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`
          }
        >
          <ShieldAlert className="h-5 w-5" />
          <span>Alerts</span>
        </NavLink>
        
      </nav>
      
      <div className="p-4 mt-auto mb-4 mx-4 bg-slate-800 rounded-lg text-sm text-slate-400 text-center">
        System 🟢 Online
      </div>
    </div>
  );
};

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};
