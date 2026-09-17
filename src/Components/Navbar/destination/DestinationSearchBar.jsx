export default function DestinationSearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-md">
      <label htmlFor="destination-search" className="sr-only">
        Search destinations
      </label>
      <input
        id="destination-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a city or place..."
        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}