const calculateBmi = ( height: number , weight: number) : string => {
  const heightInM = height/100;
  const bmi = Number((weight/(heightInM*heightInM)).toFixed(1));
  console.log(`Your BMI is ${bmi}`);
  if(bmi < 16.0) return 'Underweight (Severe Thinness)';
  else if (bmi >= 16.0 && bmi <= 16.9 ) return 'Underweight (Moderate Thinness)';
  else if (bmi >= 17.0 && bmi <= 18.4 ) return 'Underweight (Mild Thinness)';
  else if (bmi >= 18.5 && bmi <= 24.9 ) return 'Normal (Healthy Weight)';
  else if (bmi >= 25.0 && bmi <= 29.9 ) return 'Overweight (Pre-obese)';
  else if (bmi >= 30.0 && bmi <= 34.9 ) return 'Obese (Class I)';
  else if (bmi >= 35.0 && bmi <= 39.9 ) return 'Obese (Class II)';
  else if (bmi >= 40.0  ) return 'Obese (Class III)';
}

console.log(calculateBmi(180, 74));

