interface exerciseValues { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateTrainingDays = (days : Array<number>): number => {
  return days.filter(day => day>0).length;
};

const calculateAverage = (days : Array<number>): number => {
  const sum = days.reduce((sum ,day) => sum+ day , 0);
  return (sum/days.length);
};

// ? RETURNING OBJECT using `any` type. instead of INTERFACE.
const getRatingDetails = (achieved : number , goal: number) : any => {
  if(achieved > goal){
    if(achieved-goal > 1 ) return { rating : 3 , ratingDescription : 'Slow down Tiger'};
    else return { rating : 3 , ratingDescription : 'Keep Going . ;)'};
  } else {
    const difference = goal - achieved; 
    if(difference> 1 ) return { rating : 1 , ratingDescription : 'Are you even Trying? u fatfuk'};
    else return { rating: 2, ratingDescription: 'I feel like your father, Disappointed.'} 
  }
}

const calculateExercise = (dailyHours: Array<number> , target: number) : exerciseValues => {
  const periodLength = dailyHours.length;
  const trainingDays = calculateTrainingDays(dailyHours);
  const average = calculateAverage(dailyHours);
  const success = average > target? true: false;
  const {rating, ratingDescription} = getRatingDetails(average, target);

  return { 
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}


interface parsedArguments { 
  days : Array<number>,
  target: number
}

const parseArgumentValues = (args : Array<string>) : parsedArguments => {
  let target;
  if(!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  } else {
    throw new Error("First value is not Number");
  }

  let arr=[];
  for (let i = 3; i < args.length; i++) {
    if(!isNaN(Number(args[i]))){
      arr.push(Number(args[i]));
    } else {
      throw new Error('ALL EXERCISE HOURS MUST BE A NUMBER');
    }
  }
  return {
    days : arr,
    target
  }  
}


console.log("==================================================");
console.log("HARDCODED calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2) = >");
console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1], 2));
console.log("==================================================");


try { 
  let {target, days } = parseArgumentValues(process.argv);
  console.log(calculateExercise(days, target));
} catch (error : unknown)  {
  let errorMessage = "Oooops ... There has been an Error :";
  if(error instanceof Error) 
    errorMessage += ' ERROR ' + error.message;
  console.log(errorMessage);
}






// try{
//   let {value1, value2} = parseArgumentValues(process.argv);
//   calculateYo(value1, value2);
// } catch (error : unknown ) {
//   let errorMessage : string = "Ooops.. Some Error Happened";
//   if(error instanceof Error) 
//     errorMessage += ' ERROR ' + error.message;

//   console.log(errorMessage);

// }

