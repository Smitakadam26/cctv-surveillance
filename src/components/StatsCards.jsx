import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Camera,
} from 'lucide-react';

const cards = [
  {
    title: 'Total Alerts',
    value: 120,
    icon: Activity,
    color: 'blue',
  },
  {
    title: 'Active Alerts',
    value: 32,
    icon: AlertTriangle,
    color: 'red',
  },
  {
    title: 'Resolved Alerts',
    value: 88,
    icon: CheckCircle2,
    color: 'green',
  },
  {
    title: 'CCTV Cameras',
    value: 12,
    icon: Camera,
    color: 'purple',
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold text-white mt-3">
                  {card.value}
                </h2>
              </div>

              <div className={`p-3 rounded-xl bg-${card.color}-500/20`}>
                <Icon className={`w-7 h-7 text-${card.color}-400`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}