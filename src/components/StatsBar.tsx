import { BookOpen, Target, Flame, Layers } from 'lucide-react';
import type { StudyStats } from '../types';

interface StatsBarProps {
  stats: StudyStats;
}

function StatsBar({ stats }: StatsBarProps) {
  const statItems = [
    {
      icon: BookOpen,
      label: 'Cards Studied',
      value: stats.cardsStudied,
      color: 'text-purple-400',
      bg: 'bg-purple-500/20',
    },
    {
      icon: Target,
      label: 'Accuracy',
      value: `${stats.accuracy}%`,
      color: 'text-green-400',
      bg: 'bg-green-500/20',
    },
    {
      icon: Flame,
      label: 'Streak',
      value: stats.streak,
      color: 'text-orange-400',
      bg: 'bg-orange-500/20',
    },
    {
      icon: Layers,
      label: 'Total Cards',
      value: stats.totalCards,
      color: 'text-pink-400',
      bg: 'bg-pink-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <div
          key={item.label}
          className="glass-card p-4 flex items-center gap-3"
        >
          <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
            <item.icon className={`w-5 h-5 ${item.color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{item.value}</p>
            <p className="text-xs text-gray-300">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;
