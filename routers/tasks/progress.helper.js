export const averageScore = (studentTasks) =>
  totalScore(studentTasks) / totalRequiredWeight(studentTasks);

export const averageNowRequiredScore = (studentTasks) =>
  totalScore(studentTasks) / totalRequiredWeightWithDue(studentTasks);

export const totalWeight = (studentTasks) =>
  studentTasks.reduce((acc, current) => {
    return acc + current.weight;
  }, 0);

export const totalRequiredWeight = (studentTasks) =>
  studentTasks.reduce((acc, current) => {
    return Number(acc) + (current.required ? Number(current.weight) : 0);
  }, 0);
export const totalRequiredWeightWithDue = (studentTasks) =>
  studentTasks.reduce((acc, current) => {
    return (
      Number(acc) +
      (current.required && new Date(current.dueDate) < new Date()
        ? Number(current.weight)
        : 0)
    );
  }, 0);

export const totalScore = (studentTasks) =>
  studentTasks.reduce((acc, current) => {
    return acc + (current.submission?.score ?? 0);
  }, 0);

export const totalRequiredScore = (studentTasks) =>
  studentTasks.reduce((acc, current) => {
    let total =
      Number(acc) +
      (current.required ? Number(current.submission?.score ?? 0) : 0);
    return Number(total);
  }, 0);

export const weightedScores = (studentTasks) =>
  studentTasks.map((task) => {
    const weight = task.weight;
    const score = task.submission?.score ?? 0;
    const total = score / weight;
    task.calculatedScore = total;
    return task;
  });

export const numberOfDoneTasksWithType = (studentTasks, taskType) => {
  const reducer = (acc, current) => {
    if (current.type === taskType) {
      return acc + ((current.submission?.status === "done" ? 1 : 0) ?? 0);
    }
    return acc;
  };
  return studentTasks.reduce(reducer, 0);
};
