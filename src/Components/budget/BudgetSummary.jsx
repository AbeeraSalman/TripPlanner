import { EXPENSE_CATEGORIES } from "../../utils/expenseCategories";
import { formatCurrency } from "../../utils/formatCurrency";
import { usePreferences } from "../../hooks/usePreferences";

export default function BudgetSummary({ budget, totalSpent, remaining, spendingByCategory }) {
  const { preferences } = usePreferences();
  const percentSpent = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;
  const isOverBudget = remaining < 0;

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-sm text-slate-500">Total Spent</p>
        <p className="text-sm text-slate-500">Budget: {formatCurrency(budget, preferences.currency)}</p>
      </div>
      <p className={`text-3xl font-bold ${isOverBudget ? "text-red-600" : "text-slate-900"}`}>
        {formatCurrency(totalSpent, preferences.currency)}
      </p>
      <p className={`mt-1 text-sm font-medium ${isOverBudget ? "text-red-600" : "text-emerald-600"}`}>
        {isOverBudget
          ? `${formatCurrency(Math.abs(remaining), preferences.currency)} over budget`
          : `${formatCurrency(remaining, preferences.currency)} remaining`}
      </p>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full ${isOverBudget ? "bg-red-500" : "bg-indigo-500"}`}
          style={{ width: `${percentSpent}%` }}
        />
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">By Category</p>
        {EXPENSE_CATEGORIES.filter((c) => spendingByCategory[c]).map((c) => (
          <div key={c} className="flex items-center justify-between text-sm">
            <span className="text-slate-600">{c}</span>
            <span className="font-medium text-slate-900">{formatCurrency(spendingByCategory[c], preferences.currency)}</span>
          </div>
        ))}
        {Object.keys(spendingByCategory).length === 0 && (
          <p className="text-sm text-slate-400">No expenses yet.</p>
        )}
      </div>
    </div>
  );
}