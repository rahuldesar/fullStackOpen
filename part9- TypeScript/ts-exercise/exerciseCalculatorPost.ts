interface exerciseValues { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateTrainingDaysP = (days : Array<number>): number => {
  return days.filter(day => day>0).length;
};

const calculateAverageP = (days : Array<number>): number => {
  const sum = days.reduce((sum ,day) => sum+ day , 0);
  return (sum/days.length);
};

const getRatingDetailsP = (achieved : number , goal: number) : {rating: number; ratingDescription : string} => {
  if(achieved > goal){
    if(achieved-goal > 1 ) return { rating : 3 , ratingDescription : 'Slow down Tiger'};
    else return { rating : 3 , ratingDescription : 'Keep Going . ;)'};
  } else {
    const difference = goal - achieved; 
    if(difference> 1 ) return { rating : 1 , ratingDescription : 'Are you even Trying? u fatfuk'};
    else return { rating: 2, ratingDescription: 'I feel like your father, Disappointed.'};
  }
};

export const calculateExerciseP = (dailyHours: Array<number> , target: number) : exerciseValues => {
  const periodLength = dailyHours.length;
  const trainingDays = calculateTrainingDaysP(dailyHours);
  const average = calculateAverageP(dailyHours);
  const success = average > target? true: false;
  const {rating, ratingDescription} = getRatingDetailsP(average, target);

  return { 
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};