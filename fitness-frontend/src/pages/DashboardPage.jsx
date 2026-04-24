import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getActivities } from "../services/api";

const toughQuotes = [
  { q: "When you think you are done, you are only at 40 percent of your true capability.", a: "David Goggins" },
  { q: "Stay hard. Keep showing up when it hurts.", a: "David Goggins" },
  { q: "The only way to grow is to face what you avoid.", a: "David Goggins" },
  { q: "Discipline is choosing between what you want now and what you want most.", a: "Abraham Lincoln" },
  { q: "Nobody cares. Work harder.", a: "Cam Hanes" },
  { q: "It never gets easier. You just get stronger.", a: "Unknown" },
  { q: "Suffer now and build a mind that does not quit.", a: "Hard Mindset" },
  { q: "Champions are built in the dark before they are seen in the light.", a: "Unknown" },
];

function DashboardPage() {
  const [activities, setActivities] = useState([]);
  const [quote, setQuote] = useState("When you think you are done, you are only at 40 percent of your true capability.");
  const [quoteAuthor, setQuoteAuthor] = useState("David Goggins");

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
    const randomLocalQuote = toughQuotes[Math.floor(Math.random() * toughQuotes.length)];
    setQuote(randomLocalQuote.q);
    setQuoteAuthor(randomLocalQuote.a);

    const fetchQuote = async () => {
      try {
        const response = await fetch("https://zenquotes.io/api/random");
        const data = await response.json();
        if (Array.isArray(data) && data[0]?.q) {
          setQuote(data[0].q);
          setQuoteAuthor(data[0].a || "Unknown");
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();
  }, []);

  const setRandomToughQuote = () => {
    const randomLocalQuote = toughQuotes[Math.floor(Math.random() * toughQuotes.length)];
    setQuote(randomLocalQuote.q);
    setQuoteAuthor(randomLocalQuote.a);
  };

  const stats = useMemo(() => {
    const totalActivities = activities.length;
    const totalCalories = activities.reduce(
      (sum, item) => sum + Number(item.caloriesBurned || 0),
      0,
    );
    const totalDuration = activities.reduce(
      (sum, item) => sum + Number(item.duration || 0),
      0,
    );
    const avgDuration = totalActivities
      ? (totalDuration / totalActivities).toFixed(1)
      : 0;

    return { totalActivities, totalCalories, totalDuration, avgDuration };
  }, [activities]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-xl shadow-black/20 backdrop-blur-md md:p-6">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.16em] text-purple-300">Motivation</p>
          <button
            type="button"
            onClick={setRandomToughQuote}
            className="rounded-lg border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-200 transition hover:bg-purple-500/20"
          >
            New Tough Quote
          </button>
        </div>
        <p className="mt-3 text-lg font-medium italic text-[var(--color-text)] md:text-xl">
          "{quote}"
        </p>
        <p className="mt-2 text-sm text-[var(--color-muted)]">- {quoteAuthor}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.16em] text-blue-300">Activities</p>
          <p className="mt-2 text-3xl font-semibold text-white">{stats.totalActivities}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.16em] text-blue-300">Calories</p>
          <p className="mt-2 text-3xl font-semibold text-white">{stats.totalCalories}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.16em] text-purple-300">Duration</p>
          <p className="mt-2 text-3xl font-semibold text-white">{stats.totalDuration}m</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.16em] text-purple-300">Avg Duration</p>
          <p className="mt-2 text-3xl font-semibold text-white">{stats.avgDuration}m</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-md md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white md:text-xl">Latest Activities</h2>
          <Link
            to="/activities"
            className="rounded-lg border border-blue-400/40 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-200 transition hover:bg-blue-500/20"
          >
            Open Activity Manager
          </Link>
        </div>
        <div className="space-y-3">
          {activities.slice(0, 5).map((item) => (
            <Link
              key={item.id}
              to={`/activities/${item.id}`}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3 transition hover:border-blue-400/50 hover:bg-white/10"
            >
              <p className="font-medium text-white">{item.type}</p>
              <p className="text-sm text-gray-300">
                {item.duration}m • {item.caloriesBurned} cal
              </p>
            </Link>
          ))}
          {activities.length === 0 && (
            <p className="rounded-xl border border-dashed border-white/20 bg-black/20 p-4 text-sm text-gray-400">
              No activities yet. Add your first activity from the Activities page.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
