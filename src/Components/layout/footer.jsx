import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white px-4 py-6 text-center text-xs text-slate-400">
      <p className="flex items-center justify-center gap-1.5">
        <MapPin size={14} className="text-indigo-400" />
        TripPlanner — plan smarter, travel better.
      </p>
    </footer>
  );
}