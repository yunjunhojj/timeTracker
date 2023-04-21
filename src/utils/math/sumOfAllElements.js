export const sumOfAllElements = (array) => {
  return array.flat().reduce((acc, doc) => {
    return acc + doc;
  }, 0);
};
