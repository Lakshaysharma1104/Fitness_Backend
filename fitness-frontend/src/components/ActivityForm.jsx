import { useState } from "react";
import { addActivity } from "../services/api";
function ActivityForm({onActivityAdded}) {
  const [activity, setActivity] = useState({
    type: "",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const handleSubmit = async (e)=>{
     e.preventDefault();
     try{
      await addActivity(activity);
      onActivityAdded();
      setActivity({
        type:" ",
        duration:" ",
        caloriesBurned:" ",
        additionalMetrics:{}
      })

     }catch(error){
      console.error("Error adding activity:", error);
     }

  }

  return (
    <div className="mb-8">
      <form
        id="add-activity"
        className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/30 backdrop-blur-md md:p-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight text-white">Add Activity</h2>
          <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-purple-300">
            Fitness Log
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="demo-simple-select-standard">
              Activity Type
            </label>
            <select
              id="demo-simple-select-standard"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
              value={activity.type}
              onChange={(e) => {
                setActivity({ ...activity, type: e.target.value });
              }}
            >
              <option value="">None</option>
              <option value="RUNNING">Running</option>
              <option value="WALKING">Walking</option>
              <option value="CYCLING">Cycling</option>
              <option value="SWIMMING">Swimming</option>
              <option value="WEIGHT_TRAINING">Weight Training</option>
              <option value="YOGA">Yoga</option>
              <option value="HIIT">HIIT</option>
              <option value="STRETCHING">Stretching</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="CaloriesBurned">
              Calories Burned
            </label>
            <input
              id="CaloriesBurned"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40"
              type="number"
              value={activity.caloriesBurned}
              onChange={(e) => {
                setActivity({ ...activity, caloriesBurned: e.target.value });
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300" htmlFor="duration">
              Duration
            </label>
            <input
              id="duration"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
              type="number"
              value={activity.duration}
              onChange={(e) => {
                setActivity({ ...activity, duration: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:scale-[1.02] hover:from-blue-500 hover:to-purple-500"
          >
            Add Activity
          </button>
        </div>
      </form>
    </div>
  );
}

export default ActivityForm;
