export const sumOfServeralElement = (tempArray) => {
  tempArray.reverse();
  console.log("tempArray", tempArray);
  const last7DayData = [];
  for (let i = 0; i < 7; i++) {
    // if undefined then return 0
    if (tempArray[i] === undefined) {
      last7DayData[i] = 0;
      continue;
    }

    // several elements sum in each array
    last7DayData[i] = tempArray[i].reduce((acc, doc) => {
      return (acc + doc) / 60;
    });
  }
  return last7DayData;
};
