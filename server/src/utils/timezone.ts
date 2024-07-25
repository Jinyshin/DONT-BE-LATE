export const toSeoulTime = (date: Date): Date => {
  const offset = 9 * 60;
  return new Date(date.getTime() + offset * 60 * 1000);
};
