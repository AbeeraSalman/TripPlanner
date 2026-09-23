import { NavLink } from "react-router-dom";
import { Info, CalendarDays, Wallet } from "lucide-react";

export default function TripTabs({ tripId }) {
  const tabs = [
    { to: `/trips/${tripId}`, label: "Overview", icon: Info, end: true },
    { to: `/trips/${tripId}/itinerary`, label: "Itinerary", icon: CalendarDays },
    { to: `/trips/${tripId}/budget`, label: "Budget", icon: Wallet },
  ];

  return (
    <div className="mb-6 flex gap-2 border-b border-slate-200">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-700"
            }`
          }
        >
          <tab.icon size={15} />
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}