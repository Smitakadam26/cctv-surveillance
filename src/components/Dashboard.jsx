import StatsCards from './StatsCards';
import AlertsChart from './AlertsChart';
import CrimePieChart from './CrimePieChart';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Security Dashboard
        </h1>

        <p className="text-slate-400 mt-1">
          Real-time surveillance monitoring system.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AlertsChart />
        <CrimePieChart />
      </div>
    </div>
  );
};