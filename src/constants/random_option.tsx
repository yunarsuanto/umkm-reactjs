import shuffle from "./suffle";


const getRandomOptions = (items: any[], correct: any, length: number) => {
  if (!items || !correct) return [correct];
  const others = items.filter(i => i.content !== correct.content);
  let wrong: any[] = [];
  if (others.length > length) {
    wrong = shuffle(others).slice(0, (length-1));
  } else {
    wrong = shuffle(others);
  }
  const result = [correct, ...wrong];
  return result.length > 0 ? shuffle(result) : [correct];
};

export default getRandomOptions;