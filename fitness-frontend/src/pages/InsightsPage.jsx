import { useEffect, useMemo, useState } from "react";
import { getActivities } from "../services/api";
import { addGoal, deleteGoal, getGoals } from "../services/localGoalsApi";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function InsightsPage() {
  const [activities, setActivities] = useState([]);
  const [goals, setGoals] = useState([]);
  const [goalForm, setGoalForm] = useState({ title: "", target: "" });

  const chartPalette = ["#3b82f6", "#8b5cf6", "#14b8a6", "#f97316", "#ec4899", "#22c55e"];

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getActivities();
        setActivities(response.data || []);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await getGoals();
        setGoals(response || []);
      } catch (error) {
        console.error("Error fetching local goals:", error);
      }
    };

    fetchGoals();
  }, []);

  const typeBreakdown = useMemo(() => {
    return activities.reduce((acc, item) => {
      const key = item.type || "OTHER";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  }, [activities]);

  const topType = useMemo(() => {
    const entries = Object.entries(typeBreakdown);
    if (!entries.length) return "N/A";
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  }, [typeBreakdown]);

  const totalCalories = useMemo(
    () => activities.reduce((sum, item) => sum + Number(item.caloriesBurned || 0), 0),
    [activities],
  );

  const chartTypeBreakdown = useMemo(() => {
    return Object.entries(typeBreakdown).map(([type, count], index) => ({
      type,
      count,
      fill: chartPalette[index % chartPalette.length],
    }));
  }, [typeBreakdown]);

  const caloriesTimeline = useMemo(() => {
    const sorted = [...activities].sort(
      (a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime(),
    );
    return sorted.map((item, index) => ({
      name: `A${index + 1}`,
      calories: Number(item.caloriesBurned || 0),
      duration: Number(item.duration || 0),
    }));
  }, [activities]);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!goalForm.title.trim()) return;
    try {
      const newGoal = await addGoal(goalForm);
      setGoals((prevGoals) => [newGoal, ...prevGoals]);
      setGoalForm({ title: "", target: "" });
    } catch (error) {
      console.error("Error adding local goal:", error);
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      const updatedGoals = await deleteGoal(id);
      setGoals(updatedGoals);
    } catch (error) {
      console.error("Error deleting local goal:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xl shadow-black/20 backdrop-blur-md md:p-6">
        <h2 className="text-xl font-semibold tracking-tight text-[var(--color-text)]">Insights</h2>
        <p className="mt-2 text-sm text-[var(--color-muted)]">
          Premium analytics view with interactive charts and local smart goals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-blue-300">Most Frequent</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">{topType}</p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-purple-300">Total Calories</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">{totalCalories}</p>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p className="text-xs uppercase tracking-[0.16em] text-blue-300">Tracked Types</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--color-text)]">{Object.keys(typeBreakdown).length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xl shadow-black/20 backdrop-blur-md md:p-6">
          <h3 className="mb-4 text-lg font-semibold text-[var(--color-text)]">Calories vs Duration Trend</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={caloriesTimeline}>
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="calories" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCalories)" />
                <Area type="monotone" dataKey="duration" stroke="#8b5cf6" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xl shadow-black/20 backdrop-blur-md md:p-6">
          <h3 className="mb-4 text-lg font-semibold text-[var(--color-text)]">Activity Type Share</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartTypeBreakdown} dataKey="count" nameKey="type" outerRadius={96} label>
                  {chartTypeBreakdown.map((entry) => (
                    <Cell key={`cell-${entry.type}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xl shadow-black/20 backdrop-blur-md md:p-6">
          <h3 className="mb-4 text-lg font-semibold text-[var(--color-text)]">Type Count Chart</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartTypeBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="type" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {chartTypeBreakdown.map((entry) => (
                    <Cell key={`bar-${entry.type}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xl shadow-black/20 backdrop-blur-md md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--color-text)]">Local Smart Goals</h3>
            <span className="rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
              Frontend API
            </span>
          </div>
          <form className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_120px_auto]" onSubmit={handleAddGoal}>
            <input
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-blue-400"
              placeholder="Goal title (e.g. Weekly Calories)"
              value={goalForm.title}
              onChange={(e) => setGoalForm((prev) => ({ ...prev, title: e.target.value }))}
            />
            <input
              type="number"
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-blue-400"
              placeholder="Target"
              value={goalForm.target}
              onChange={(e) => setGoalForm((prev) => ({ ...prev, target: e.target.value }))}
            />
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-blue-500 hover:to-purple-500"
            >
              Add
            </button>
          </form>
          <div className="space-y-2">
            {goals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-3 py-2">
                <p className="text-sm text-[var(--color-text)]">
                  {goal.title} <span className="text-[var(--color-muted)]">({goal.target})</span>
                </p>
                <button
                  type="button"
                  className="rounded-md border border-red-400/40 bg-red-500/10 px-2 py-1 text-xs text-red-300 transition hover:bg-red-500/20"
                  onClick={() => handleDeleteGoal(goal.id)}
                >
                  Delete
                </button>
              </div>
            ))}
            {goals.length === 0 && (
              <p className="rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-surface-soft)] p-3 text-sm text-[var(--color-muted)]">
                No local goals yet. Add one to personalize your tracking.
              </p>
            )}
          </div>
        </div>
      </div>

      {activities.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-sm text-[var(--color-muted)]">
          No activity data available yet. Add activities to unlock chart insights.
        </div>
      )}
    </div>
  );
}

export default InsightsPage;
