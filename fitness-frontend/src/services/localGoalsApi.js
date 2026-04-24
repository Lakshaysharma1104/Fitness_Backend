const STORAGE_KEY = "fitness_goals_v1";

const readGoals = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("Error reading local goals:", error);
    return [];
  }
};

const writeGoals = (goals) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
};

export const getGoals = async () => {
  return Promise.resolve(readGoals());
};

export const addGoal = async (goal) => {
  const goals = readGoals();
  const nextGoal = {
    id: Date.now(),
    title: goal.title,
    target: Number(goal.target || 0),
  };
  const updatedGoals = [nextGoal, ...goals];
  writeGoals(updatedGoals);
  return Promise.resolve(nextGoal);
};

export const deleteGoal = async (id) => {
  const goals = readGoals();
  const updatedGoals = goals.filter((goal) => goal.id !== id);
  writeGoals(updatedGoals);
  return Promise.resolve(updatedGoals);
};
