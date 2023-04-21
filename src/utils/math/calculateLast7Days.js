// calculate the date of the last 7 days from today ex: 10-01
export const calculateLast7Days = () => {
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const tempDate = new Date();
    tempDate.setDate(tempDate.getDate() - i);
    last7Days.push(tempDate.toISOString().slice(5, 10));
  }
  // reverse the array so that the date is in ascending order
  last7Days.reverse();

  return last7Days;
};
