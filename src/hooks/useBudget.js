import { useTrips } from "./useTrips";

export function useBudget(tripId) {
  const { trips, addExpense, editExpense, deleteExpense } = useTrips();
  const trip = trips.find((t) => t.id === tripId);
  const expenses = trip?.expenses ?? [];

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const remaining = (Number(trip?.budget) || 0) - totalSpent;

  const spendingByCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
    return acc;
  }, {});

  return {
    trip,
    expenses,
    totalSpent,
    remaining,
    spendingByCategory,
    addExpense: (expense) => addExpense(tripId, expense),
    editExpense: (expenseId, updates) => editExpense(tripId, expenseId, updates),
    deleteExpense: (expenseId) => deleteExpense(tripId, expenseId),
  };
}