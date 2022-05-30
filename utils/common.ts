export const formatDate = (time: number) => {
  return new Date(time + 28800000)
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
};

export const getCoffe = (readingTime: number, zone: number = 900) => {
  let min = Math.ceil(readingTime / zone);
  return {
    num: min,
    coffe: new Array(Math.ceil(min / 6)).fill("☕️").join(""),
  };
};
