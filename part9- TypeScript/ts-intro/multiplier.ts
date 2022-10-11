
const multiplicator = (a: number, b: number, printText: string) : string => {
  return `${printText}, ${a*b}`;
}

console.log(typeof(process.argv[2]));
console.log(typeof(process.argv[3]));
const a : number = Number(process.argv[2]);
const b : number = Number(process.argv[3]);


console.log(multiplicator(a, b, `Multiplied numbers ${a} and ${b}, the result is:`));
