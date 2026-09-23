import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Receipt } from "lucide-react";
import { useBudget } from "../hooks/useBudget";
import { EXPENSE_CATEGORIES } from "../utils/expenseCategories";
import ExpenseForm from "../Components/budget/ExpenseForm";
import ExpenseRow from "../Components/budget/ExpenseRow";
import BudgetSummary from "../Components/budget/BudgetSummary";

export default function Budget() {
    const { tripId } = useParams();
    const { trip, expenses, totalSpent, remaining, spendingByCategory, addExpense, editExpense, deleteExpense } =
        useBudget(tripId);

    const [isAdding, setIsAdding] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [sortBy, setSortBy] = useState("date-desc");

    const visibleExpenses = useMemo(() => {
        let list = expenses;
        if (categoryFilter !== "All") {
            list = list.filter((e) => e.category === categoryFilter);
        }
        const sorted = [...list].sort((a, b) => {
            if (sortBy === "date-desc") return (b.date || "").localeCompare(a.date || "");
            if (sortBy === "date-asc") return (a.date || "").localeCompare(b.date || "");
            if (sortBy === "amount-desc") return b.amount - a.amount;
            if (sortBy === "amount-asc") return a.amount - b.amount;
            return 0;
        });
        return sorted;
    }, [expenses, categoryFilter, sortBy]);

    if (!trip) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center gap-2 text-center">
                <p className="text-sm text-slate-600">Trip not found.</p>
                <Link to="/trips" className="text-sm font-medium text-indigo-600 hover:underline">← Back to trips</Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <Link to={`/trips/${tripId}`} className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700">
                <ArrowLeft size={16} />
                Back to {trip.name}
            </Link>

            <h1 className="mb-1 text-2xl font-bold text-slate-900">Budget</h1>
            <p className="mb-6 text-sm text-slate-500">{trip.destination}</p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_260px]">
                <div>
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex gap-2">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600"
                            >
                                <option value="All">All Categories</option>
                                {EXPENSE_CATEGORIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600"
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
                            <p className="py-8 text-center text-sm text-slate-400">No expenses match this filter.</p>
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
                                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-slate-300 py-2.5 text-sm font-medium text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
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