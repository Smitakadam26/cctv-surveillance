import StatsCards from './StatsCards';
import AlertsChart from './AlertsChart';
import CrimePieChart from './CrimePieChart';
//import RecentAlerts from './RecentAlerts';
import Alerts from '../pages/Alerts';

export const Dashbo = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Security Dashboard
        </h1>

        <p className="text-slate-400 mt-1">
          Real-time surveillance monitoring system.
        </p>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AlertsChart />
        <CrimePieChart />
      </div>

      {/* Recent Alerts */}
      <Alerts />
    </div>
  );
};