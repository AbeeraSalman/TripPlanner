import { NavLink } from "react-router-dom";
import { CalendarDays, Info, Wallet } from "lucide-react";

const tabs = [
  { key: "overview", label: "Overview", icon: Info },
  { key: "itinerary", label: "Itinerary", icon: CalendarDays },
  { key: "budget", label: "Budget", icon: Wallet },
];

export default function TripTabs({ tripId }) {
  return (
    <div className="mb-6 inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
      {tabs.map((tab) => {
        const to =
          tab.key === "overview" ? `/trips/${tripId}` : `/trips/${tripId}/${tab.key}`;
        return (
          <NavLink
            key={tab.key}
            to={to}
            end={tab.key === "overview"}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`
            }
          >
            <tab.icon size={15} />
            {tab.label}
          </NavLink>
        );
      })}
    </div>
  );
}