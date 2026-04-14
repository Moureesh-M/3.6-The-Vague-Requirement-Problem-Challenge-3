const getTaskWeight = (task) => (task.important ? 2 : 1);

const calculateProductivityScore = (tasks = []) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed);
  const importantTasks = tasks.filter((task) => task.important).length;
  const completedImportantTasks = completedTasks.filter((task) => task.important).length;

  const totalWeight = tasks.reduce((sum, task) => sum + getTaskWeight(task), 0);
  const completedWeight = completedTasks.reduce((sum, task) => sum + getTaskWeight(task), 0);
  const value = totalWeight === 0 ? 0 : Math.round((completedWeight / totalWeight) * 100);

  return {
    value,
    breakdown: {
      totalTasks,
      completedTasks: completedTasks.length,
      importantTasks,
      completedImportantTasks,
      totalWeight,
      completedWeight
    }
  };
};

module.exports = {
  calculateProductivityScore
};
