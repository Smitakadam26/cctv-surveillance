import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ShieldAlert, Zap, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  
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
      
      <div className="p-4 mt-auto mb-4 mx-4 bg-slate-800 rounded-xl flex flex-col items-center border border-slate-700">
        <div className="flex items-center space-x-3 w-full mb-3 pb-3 border-b border-slate-700">
          <div className="bg-slate-700 p-2 rounded-full">
            <User className="h-4 w-4 text-slate-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">
              {user?.username || 'Admin'}
            </p>
            <p className="text-xs text-slate-400 flex items-center">
              System 🟢 Online
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-colors duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Secure Logout</span>
        </button>
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
