import { EXPENSE_CATEGORIES } from "../../utils/expenseCategories";
import { formatCurrency } from "../../utils/formatCurrency";
import { usePreferences } from "../../hooks/usePreferences";

const CATEGORY_BARS = {
  Accommodation: "bg-indigo-500",
  Food: "bg-amber-500",
  Transportation: "bg-blue-500",
  Activities: "bg-emerald-500",
  Shopping: "bg-pink-500",
  Miscellaneous: "bg-slate-400",
};

export default function BudgetSummary({ budget, totalSpent, remaining, spendingByCategory }) {
  const { preferences } = usePreferences();
  const percentSpent = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;
  const isOverBudget = remaining < 0;
  const usedCategories = EXPENSE_CATEGORIES.filter((category) => spendingByCategory[category]);
  const maxCategory = Math.max(...usedCategories.map((c) => spendingByCategory[c]), 1);

  return (
    <div className="h-fit rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Budget usage</p>

      <div className="mt-2 flex items-baseline justify-between gap-2">
        <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {formatCurrency(totalSpent, preferences.currency)}
        </p>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          of {formatCurrency(budget, preferences.currency)}
        </p>
      </div>

      <p
        className={`mt-1 text-sm font-semibold ${
          isOverBudget ? "text-red-600" : "text-emerald-600"
        }`}
      >
        {isOverBudget
          ? `${formatCurrency(Math.abs(remaining), preferences.currency)} over budget`
          : `${formatCurrency(remaining, preferences.currency)} remaining`}
      </p>

      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div
          className={`h-full rounded-full transition-all ${
            isOverBudget ? "bg-red-500" : "bg-gradient-to-r from-indigo-500 to-blue-500"
          }`}
          style={{ width: `${percentSpent}%` }}
        />
      </div>
      <p className="mt-1.5 text-right text-[11px] font-bold text-slate-400">
        {Math.round(percentSpent)}% used
      </p>

      <div className="mt-5 space-y-3">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">By category</p>

        {usedCategories.map((category) => (
          <div key={category}>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-300">{category}</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {formatCurrency(spendingByCategory[category], preferences.currency)}
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
              <div
                className={`h-full rounded-full ${CATEGORY_BARS[category] || "bg-indigo-500"}`}
                style={{ width: `${(spendingByCategory[category] / maxCategory) * 100}%` }}
              />
            </div>
          </div>
        ))}

        {usedCategories.length === 0 && (
          <p className="text-sm text-slate-400">No expenses yet.</p>
        )}
      </div>
    </div>
  );
}