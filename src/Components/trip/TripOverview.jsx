import { Link } from "react-router-dom";
import {
  ArrowRight,
  BedDouble,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Circle,
  Clock,
  ListChecks,
  MoreHorizontal,
  Receipt,
  ReceiptText,
  ShoppingBag,
  Sparkles,
  Ticket,
  Utensils,
  Wallet,
} from "lucide-react";
import { EXPENSE_CATEGORIES } from "../../utils/expenseCategories";
import { formatCurrency } from "../../utils/formatCurrency";

const CATEGORY_META = {
  Accommodation: {
    Icon: BedDouble,
    badge: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    bar: "bg-indigo-500",
  },
  Food: {
    Icon: Utensils,
    badge: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    bar: "bg-amber-500",
  },
  Transportation: {
    Icon: CarFront,
    badge: "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
    bar: "bg-blue-500",
  },
  Activities: {
    Icon: Ticket,
    badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    bar: "bg-emerald-500",
  },
  Shopping: {
    Icon: ShoppingBag,
    badge: "bg-pink-50 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300",
    bar: "bg-pink-500",
  },
  Miscellaneous: {
    Icon: MoreHorizontal,
    badge: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
    bar: "bg-slate-500",
  },
};

const FALLBACK_CATEGORY_META = {
  Icon: ReceiptText,
  badge: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  bar: "bg-slate-500",
};

function parseDateOnly(value) {
  const [year, month, day] = String(value || "").split("-").map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(dateValue, amount) {
  const date = parseDateOnly(dateValue);
  if (!date) return "";
  date.setDate(date.getDate() + amount);
  return toDateKey(date);
}

function getTripDayCount(trip, plannedDayCount) {
  const start = parseDateOnly(trip.startDate);
  const end = parseDateOnly(trip.endDate);
  if (!start || !end || end < start) return Math.max(plannedDayCount, 1);
  const dateRangeDays = Math.floor((end - start) / 86400000) + 1;
  return Math.max(dateRangeDays, plannedDayCount, 1);
}

function formatDate(dateValue, options = {}) {
  const date = parseDateOnly(dateValue);
  if (!date) return "Date not set";
  return new Intl.DateTimeFormat("en", {
    weekday: options.short ? "short" : "long",
    month: options.short ? "short" : "long",
    day: "numeric",
    year: options.short ? undefined : "numeric",
  }).format(date);
}

function getLocalToday() {
  return toDateKey(new Date());
}

function amountOf(value) {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
}

function percentage(amount, total) {
  if (total <= 0) return 0;
  return Math.max(0, (amount / total) * 100);
}

function getTripPhase(trip, today) {
  if (trip.startDate && today < trip.startDate) return "Upcoming";
  if (trip.endDate && today > trip.endDate) return "Completed";
  return "In progress";
}

function SummaryCard({ icon: Icon, label, value, detail, tone = "indigo" }) {
  const tones = {
    indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300",
    emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    rose: "bg-rose-50 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300",
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-start gap-3">
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon size={19} />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
          <p className="mt-0.5 truncate text-xl font-extrabold text-slate-900 dark:text-white">{value}</p>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{detail}</p>
        </div>
      </div>
    </div>
  );
}

function getDateKey(value) {
  return String(value || "").slice(0, 10);
}

function getDayNumber(day, index) {
  const number = Number(day?.dayNumber);
  return Number.isInteger(number) && number > 0 ? number : index + 1;
}

function getDayDate(trip, day, index) {
  const savedDate = getDateKey(day?.date);
  if (parseDateOnly(savedDate)) return savedDate;
  return addDays(trip.startDate, getDayNumber(day, index) - 1);
}

function getDayStatus(date, today) {
  if (!date) return "Planning";
  if (date < today) return "Past";
  if (date > today) return "Upcoming";
  return "Today";
}

function buildCategoryTotals(expenses) {
  const totals = new Map(EXPENSE_CATEGORIES.map((category) => [category, 0]));

  expenses.forEach((expense) => {
    const category = expense.category || "Miscellaneous";
    totals.set(category, (totals.get(category) || 0) + amountOf(expense.amount));
  });

  return [...totals.entries()]
    .map(([category, amount]) => ({ category, amount }))
    .filter(({ amount }) => amount > 0);
}

function CategoryBreakdown({ expenses, currency }) {
  const categoryTotals = buildCategoryTotals(expenses);
  const total = expenses.reduce((sum, expense) => sum + amountOf(expense.amount), 0);
  const visibleCategories = categoryTotals.filter(({ amount }) => amount > 0);

  if (visibleCategories.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-5 text-center text-xs text-slate-400 dark:border-slate-700">
        No expenses recorded for this day.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {visibleCategories.map(({ category, amount }) => {
        const meta = CATEGORY_META[category] || FALLBACK_CATEGORY_META;
        const Icon = meta.Icon;

        return (
          <div key={category}>
            <div className="mb-1.5 flex items-center gap-2">
              <span className={`flex h-6 w-6 items-center justify-center rounded-lg ${meta.badge}`}>
                <Icon size={13} />
              </span>
              <span className="min-w-0 flex-1 truncate text-xs font-semibold text-slate-600 dark:text-slate-300">
                {category}
              </span>
              <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                {formatCurrency(amount, currency)}
              </span>
              <span className="w-9 text-right text-[10px] font-semibold text-slate-400">
                {Math.round(percentage(amount, total))}%
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
              <div
                className={`h-full rounded-full ${meta.bar}`}
                style={{ width: `${Math.min(100, percentage(amount, total))}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ActivityOverviewItem({ activity }) {
  const StatusIcon = activity.completed ? CheckCircle2 : Circle;
  const notes = String(activity.notes || "").trim();

  return (
    <li className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-700 dark:bg-slate-900/40">
      <StatusIcon
        size={18}
        className={`mt-0.5 shrink-0 ${activity.completed ? "text-emerald-500" : "text-slate-300 dark:text-slate-600"}`}
        aria-label={activity.completed ? "Completed" : "Not completed"}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <Clock size={12} /> {activity.time || "Flexible time"}
          </span>
          {activity.completed && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              Completed
            </span>
          )}
        </div>
        <p className={`mt-1 text-sm font-bold ${activity.completed ? "text-slate-400 line-through" : "text-slate-800 dark:text-slate-100"}`}>
          {activity.title || "Untitled activity"}
        </p>
        {notes && (
          <p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-slate-500 dark:text-slate-400">
            {notes}
          </p>
        )}
      </div>
    </li>
  );
}

function ExpenseOverviewItem({ expense, currency }) {
  const category = expense.category || "Miscellaneous";
  const meta = CATEGORY_META[category] || FALLBACK_CATEGORY_META;
  const Icon = meta.Icon;
  const notes = String(expense.notes || "").trim();

  return (
    <li className="flex items-start gap-3 rounded-xl border border-slate-100 px-3 py-2.5 dark:border-slate-700">
      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${meta.badge}`}>
        <Icon size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">
          {expense.description || category}
        </p>
        <p className="mt-0.5 text-[10px] font-semibold text-slate-400">{category}</p>
        {notes && (
          <p className="mt-1 whitespace-pre-wrap text-[11px] leading-4 text-slate-500 dark:text-slate-400">
            {notes}
          </p>
        )}
      </div>
      <span className="shrink-0 pt-0.5 text-xs font-extrabold text-slate-900 dark:text-white">
        {formatCurrency(amountOf(expense.amount), currency)}
      </span>
    </li>
  );
}

function EmptyPanel({ children }) {
  return (
    <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-6 text-center text-xs text-slate-400 dark:border-slate-700">
      {children}
    </p>
  );
}

function DayOverviewCard({ day, date, expenses, currency, tripId, today }) {
  const activities = [...(day.activities || [])].sort((a, b) =>
    (a.time || "99:99").localeCompare(b.time || "99:99")
  );
  const completedCount = activities.filter((activity) => activity.completed).length;
  const daySpent = expenses.reduce((sum, expense) => sum + amountOf(expense.amount), 0);
  const status = getDayStatus(date, today);
  const statusClasses = {
    Today: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    Upcoming: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    Past: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
    Planning: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <header className="border-b border-slate-100 p-5 dark:border-slate-700 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-sm font-extrabold text-white shadow-md shadow-indigo-500/20">
              D{day.dayNumber}
            </span>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Day {day.dayNumber}</h3>
              <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                {formatDate(date)}
              </p>
            </div>
          </div>
          <span className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${statusClasses[status]}`}>
            {status}
          </span>
        </div>
        <p className="mt-4 rounded-2xl bg-slate-50 px-3.5 py-2.5 text-xs text-slate-500 dark:bg-slate-900/50 dark:text-slate-400">
          <strong className="text-slate-700 dark:text-slate-200">Day summary:</strong>{" "}
          {completedCount} of {activities.length} activities completed · {expenses.length}{" "}
          {expenses.length === 1 ? "expense" : "expenses"} · {formatCurrency(daySpent, currency)} spent
        </p>
      </header>

      <div className="grid gap-0 lg:grid-cols-2">
        <section className="border-b border-slate-100 p-5 dark:border-slate-700 sm:p-6 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h4 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <ListChecks size={15} className="text-indigo-500" /> Activities
            </h4>
            <Link to={`/trips/${tripId}/itinerary`} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
              Manage
            </Link>
          </div>
          {activities.length > 0 ? (
            <ul className="space-y-2.5">
              {activities.map((activity) => (
                <ActivityOverviewItem key={activity.id || `${activity.time}-${activity.title}`} activity={activity} />
              ))}
            </ul>
          ) : (
            <EmptyPanel>No activities planned for this day yet.</EmptyPanel>
          )}
        </section>

        <section className="p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h4 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <Receipt size={15} className="text-indigo-500" /> Expenses
            </h4>
            <Link to={`/trips/${tripId}/budget`} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
              Manage
            </Link>
          </div>
          {expenses.length > 0 && (
            <ul className="mb-5 space-y-2">
              {expenses.map((expense) => (
                <ExpenseOverviewItem key={expense.id || `${expense.date}-${expense.description}`} expense={expense} currency={currency} />
              ))}
            </ul>
          )}
          <div className={expenses.length > 0 ? "border-t border-slate-100 pt-5 dark:border-slate-700" : ""}>
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Category split</p>
            <CategoryBreakdown expenses={expenses} currency={currency} />
          </div>
        </section>
      </div>

      <footer className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-5 py-4 dark:border-slate-700 dark:bg-slate-900/40 sm:px-6">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total spent on Day {day.dayNumber}</span>
        <span className="text-lg font-extrabold text-slate-900 dark:text-white">{formatCurrency(daySpent, currency)}</span>
      </footer>
    </article>
  );
}

function BudgetOverview({ tripId, budget, expenses, currency }) {
  const totalSpent = expenses.reduce((sum, expense) => sum + amountOf(expense.amount), 0);
  const remaining = budget - totalSpent;
  const usedPercentage = percentage(totalSpent, budget);
  const isOverBudget = remaining < 0;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <header className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 px-5 py-5 text-white sm:px-6">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-indigo-200">Budget snapshot</p>
          <h2 className="mt-1 text-lg font-extrabold">Where your trip budget is going</h2>
        </div>
        <Link
          to={`/trips/${tripId}/budget`}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-white/20"
        >
          Open budget <ArrowRight size={14} />
        </Link>
      </header>

      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-slate-100 p-5 dark:border-slate-700 sm:p-6 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total trip budget</p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
            {formatCurrency(budget, currency)}
          </p>

          <div className="mt-5 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Spent</p>
              <p className="mt-0.5 text-lg font-extrabold text-slate-900 dark:text-white">
                {formatCurrency(totalSpent, currency)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                {isOverBudget ? "Over budget" : "Remaining"}
              </p>
              <p className={`mt-0.5 text-lg font-extrabold ${isOverBudget ? "text-rose-600" : "text-emerald-600"}`}>
                {formatCurrency(Math.abs(remaining), currency)}
              </p>
            </div>
          </div>

          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
            <div
              className={`h-full rounded-full ${isOverBudget ? "bg-rose-500" : "bg-gradient-to-r from-indigo-500 to-blue-500"}`}
              style={{ width: `${Math.min(100, usedPercentage)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {Math.round(usedPercentage)}% of the total budget used
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Spending by category
            </h3>
            <span className="text-xs font-semibold text-slate-400">{expenses.length} recorded</span>
          </div>
          <CategoryBreakdown expenses={expenses} currency={currency} />
        </div>
      </div>
    </section>
  );
}

function UnassignedExpenses({ expenses, currency }) {
  if (expenses.length === 0) return null;
  const total = expenses.reduce((sum, expense) => sum + amountOf(expense.amount), 0);

  return (
    <section className="rounded-3xl border border-amber-200 bg-amber-50/60 p-5 dark:border-amber-500/30 dark:bg-amber-500/5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-base font-extrabold text-amber-900 dark:text-amber-200">
            <ReceiptText size={17} /> Unassigned expenses
          </h2>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-amber-800/75 dark:text-amber-200/70">
            These expenses are included in your trip totals, but have no date or fall outside the trip dates, so they cannot be assigned to a day safely.
          </p>
        </div>
        <span className="text-lg font-extrabold text-amber-900 dark:text-amber-200">{formatCurrency(total, currency)}</span>
      </div>
      <ul className="mt-4 grid gap-2 md:grid-cols-2">
        {expenses.map((expense) => (
          <ExpenseOverviewItem key={expense.id || `${expense.date}-${expense.description}`} expense={expense} currency={currency} />
        ))}
      </ul>
    </section>
  );
}

export default function TripOverview({ trip, currency }) {
  const today = getLocalToday();
  const tripDays = Array.isArray(trip.days) ? trip.days : [];
  const tripExpenses = Array.isArray(trip.expenses) ? trip.expenses : [];
  const budget = amountOf(trip.budget);
  const totalSpent = tripExpenses.reduce((sum, expense) => sum + amountOf(expense.amount), 0);
  const remaining = budget - totalSpent;
  const dayCount = getTripDayCount(trip, tripDays.length);
  const activities = tripDays.flatMap((day) => day.activities || []);
  const completedActivities = activities.filter((activity) => activity.completed).length;
  const averageDailySpend = dayCount > 0 ? totalSpent / dayCount : 0;
  const phase = getTripPhase(trip, today);

  const overviewDays = Array.from({ length: dayCount }, (_, index) => {
    const dayNumber = index + 1;
    const savedDay = tripDays.find(
      (day, dayIndex) => getDayNumber(day, dayIndex) === dayNumber
    ) || { id: `overview-day-${dayNumber}`, dayNumber, activities: [] };
    const date = getDayDate(trip, savedDay, index);
    const expenses = date
      ? tripExpenses.filter((expense) => getDateKey(expense.date) === date)
      : [];

    return { day: { ...savedDay, dayNumber }, date, expenses };
  });

  const assignedDates = new Set(overviewDays.map(({ date }) => date).filter(Boolean));
  const unassignedExpenses = tripExpenses.filter((expense) => {
    const expenseDate = getDateKey(expense.date);
    return !expenseDate || !assignedDates.has(expenseDate);
  });

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-5 dark:border-indigo-500/20 dark:from-indigo-500/10 dark:via-slate-800 dark:to-blue-500/10 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
            <Sparkles size={20} />
          </span>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">Complete trip overview</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">Your plan, activities and spending in one place</h2>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Expenses are grouped by their calendar date. Add or edit details in Itinerary and Budget.</p>
          </div>
        </div>
        <span className="w-fit shrink-0 rounded-full bg-white px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-indigo-700 shadow-sm dark:bg-slate-800 dark:text-indigo-300">
          {phase}
        </span>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={CalendarDays} label="Trip duration" value={`${dayCount} ${dayCount === 1 ? "day" : "days"}`} detail={`${formatDate(trip.startDate, { short: true })} – ${formatDate(trip.endDate, { short: true })}`} />
        <SummaryCard icon={CheckCircle2} label="Activity progress" value={`${completedActivities}/${activities.length}`} detail={`${percentage(completedActivities, activities.length).toFixed(0)}% completed`} tone="emerald" />
        <SummaryCard icon={Wallet} label="Total spent" value={formatCurrency(totalSpent, currency)} detail={`${percentage(totalSpent, budget).toFixed(0)}% of total budget`} tone="amber" />
        <SummaryCard icon={ReceiptText} label="Money remaining" value={formatCurrency(Math.abs(remaining), currency)} detail={remaining < 0 ? "Budget exceeded" : `${formatCurrency(averageDailySpend, currency)} average per day`} tone={remaining < 0 ? "rose" : "indigo"} />
      </section>

      <BudgetOverview tripId={trip.id} budget={budget} expenses={tripExpenses} currency={currency} />

      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">Day-by-day picture</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">Activities and expenses for every day</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Each card includes its schedule, activity notes, itemized costs, category split, and daily total.</p>
          </div>
          <Link to={`/trips/${trip.id}/itinerary`} className="inline-flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
            Edit itinerary <ArrowRight size={14} />
          </Link>
        </div>
        <div className="space-y-5">
          {overviewDays.map((overviewDay) => (
            <DayOverviewCard key={`${overviewDay.day.dayNumber}-${overviewDay.date}`} {...overviewDay} currency={currency} tripId={trip.id} today={today} />
          ))}
        </div>
      </section>

      <UnassignedExpenses expenses={unassignedExpenses} currency={currency} />
    </div>
  );
}
