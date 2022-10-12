type Operation = 'multiply' | 'add' | 'divide';


  export const calculator = (a: number, b: number, op: Operation) : number => {
  switch(op){
    case 'add' :
      return a + b;
    case 'multiply' :
      return a * b;
    case 'divide' :
      if(b === 0 ) throw new Error('Can\'t Divide by 0!!') ;
      return a / b;
    default:
      throw new Error('Operation is not multiply, add or divide');
    }
};

try{
  console.log(calculator(1,0,'divide'));
} catch (error: unknown){
  let errorMessage = 'Something went Wrong. ';
  if(error instanceof Error){
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}



console.log(process.argv);

// console.log(calculator(10,2,'add'));
// console.log(calculator(10,2,'multiply'));
// console.log(calculator(10,2,'divide'));