import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpDown, Filter, Plus, Receipt } from "lucide-react";
import { useBudget } from "../hooks/useBudget";
import { EXPENSE_CATEGORIES } from "../utils/expenseCategories";
import ExpenseForm from "../Components/budget/ExpenseForm";
import ExpenseRow from "../Components/budget/ExpenseRow";
import BudgetSummary from "../Components/budget/BudgetSummary";
import TripTabs from "../Components/trip/TripTabs";

const selectClass =
  "rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";

export default function Budget() {
  const { tripId } = useParams();
  const {
    trip,
    expenses,
    totalSpent,
    remaining,
    spendingByCategory,
    addExpense,
    editExpense,
    deleteExpense,
  } = useBudget(tripId);

  const [isAdding, setIsAdding] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");

  const visibleExpenses = useMemo(() => {
    let list = expenses;
    if (categoryFilter !== "All") {
      list = list.filter((expense) => expense.category === categoryFilter);
    }
    return [...list].sort((a, b) => {
      if (sortBy === "date-desc") return (b.date || "").localeCompare(a.date || "");
      if (sortBy === "date-asc") return (a.date || "").localeCompare(b.date || "");
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "amount-asc") return a.amount - b.amount;
      return 0;
    });
  }, [expenses, categoryFilter, sortBy]);

  if (!trip) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Trip not found.</p>
        <Link
          to="/trips"
          className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Back to trips
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link
        to={`/trips/${tripId}`}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeft size={15} /> Back to {trip.name}
      </Link>

      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">Expenses</p>
        <h1 className="mt-1.5 text-3xl font-extrabold text-slate-900 dark:text-white">Budget</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{trip.destination}</p>
      </div>

      <TripTabs tripId={tripId} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_280px]">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Filter size={13} /> Filter
              </span>
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                aria-label="Filter by category"
                className={selectClass}
              >
                <option value="All">All Categories</option>
                {EXPENSE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                <ArrowUpDown size={13} /> Sort
              </span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort expenses"
                className={selectClass}
              >
                <option value="date-desc">Newest first</option>
                <option value="date-asc">Oldest first</option>
                <option value="amount-desc">Highest amount</option>
                <option value="amount-asc">Lowest amount</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            {visibleExpenses.length === 0 && !isAdding && (
              <p className="rounded-2xl border border-dashed border-slate-200 py-8 text-center text-sm text-slate-400 dark:border-slate-700">
                <Receipt size={15} className="mr-1.5 inline" />
                No expenses match this filter.
              </p>
            )}

            {visibleExpenses.map((expense) => (
              <ExpenseRow
                key={expense.id}
                expense={expense}
                minDate={trip.startDate}
                maxDate={trip.endDate}
                onEdit={(updates) => editExpense(expense.id, updates)}
                onDelete={() => deleteExpense(expense.id)}
              />
            ))}

            {isAdding ? (
              <ExpenseForm
                minDate={trip.startDate}
                maxDate={trip.endDate}
                onCancel={() => setIsAdding(false)}
                onSubmit={(expense) => {
                  addExpense(expense);
                  setIsAdding(false);
                }}
              />
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-slate-300 py-3 text-sm font-semibold text-slate-500 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-600 dark:hover:text-indigo-400"
              >
                <Plus size={16} />
                Add Expense
              </button>
            )}
          </div>
        </div>

        <BudgetSummary
          budget={Number(trip.budget)}
          totalSpent={totalSpent}
          remaining={remaining}
          spendingByCategory={spendingByCategory}
        />
      </div>
    </div>
  );
}