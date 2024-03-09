/*
Code solution by Nehuen/Neth (https://github.com/nehu3n)
*/

/*
		Not necessary!

		Start of the time to calculate the execution speed
	*/
console.time("Time Execution");

/**
Defines a type for dictionaries.

@type

	key[string]:
	 key[number]:
	  number
*/
type Amount = {
  [key: string]: {
    [key: number]: number;
  };
};

// Define the dictionaries for each amount.

// Minimum amount of the male gender.
let minAmountMale: Amount = {
  A: { 0: 100, 26: 100, 27: 400, 28: 900, 29: 100, 30: 600 },
  B: { 0: 1000, 26: 1000, 27: 600, 28: 1000, 29: 1000, 30: 1000 },
  C: { 0: 400, 26: 400, 27: 200, 28: 200, 29: 1000, 30: 600 },
  D: { 0: 400, 26: 400, 27: 300, 28: 500, 29: 900, 30: 1000 },
};

// Maximum amount of the male gender.
let maxAmountMale: Amount = {
  A: { 0: 4900, 26: 4900, 27: 4700, 28: 4600, 29: 4600, 30: 4500 },
  B: { 0: 4700, 26: 4700, 27: 4400, 28: 5000, 29: 4400, 30: 4900 },
  C: { 0: 5000, 26: 5000, 27: 4700, 28: 5000, 29: 4200, 30: 4600 },
  D: { 0: 4400, 26: 4400, 27: 4700, 28: 4300, 29: 4900, 30: 4300 },
};

// Minimum amount of the female gender.
let minAmountFemale: Amount = {
  A: { 0: 800, 24: 800, 25: 800, 26: 800, 27: 600, 28: 200 },
  B: { 0: 800, 24: 800, 25: 700, 26: 100, 27: 600, 28: 700 },
  C: { 0: 200, 24: 200, 25: 900, 26: 700, 27: 800, 28: 100 },
  D: { 0: 500, 24: 500, 25: 1000, 26: 600, 27: 400, 28: 700 },
};

// Maximum amount of the female gender.
let maxAmountFemale: Amount = {
  A: { 0: 4000, 24: 4000, 25: 4200, 26: 4100, 27: 4200, 28: 4500 },
  B: { 0: 4700, 24: 4700, 25: 4200, 26: 4500, 27: 4300, 28: 4400 },
  C: { 0: 4600, 24: 4600, 25: 4900, 26: 4600, 27: 4700, 28: 4000 },
  D: { 0: 5000, 24: 5000, 25: 4900, 26: 4700, 27: 5000, 28: 4300 },
};

// Extra variable outside the dictionaries. Defines the working time.
let workingTime: number;

/**
Function that adapts the calculated working time to match the dictionary keys.

@param workingTime: working time in months
@param gender: worker's gender (m or f)

@return number: adjusted working time
@return error: error, if any
*/
function fixWorkingTime(workingTime: number, gender: string): number {
  if (gender == "m") {
    if (workingTime >= 0 && workingTime <= 26) {
      return 26;
    } else if (workingTime > 26 && workingTime < 30) {
      return workingTime;
    } else if (workingTime >= 30) {
      return 30;
    }
  } else {
    if (workingTime >= 0 && workingTime <= 24) {
      return 24;
    } else if (workingTime > 24 && workingTime < 28) {
      return workingTime;
    } else if (workingTime >= 28) {
      return 28;
    }
  }

  throw Error("no range has matched"); // If no time matches, returns error.
  return 0;
}

/**
Function that calculates the time elapsed since the first job.

@param firstJobDate: first job date

@return number: working time in months
*/
function calculateWorkingTime(firstJobDate: Date): number {
  const newDate = new Date();

  let years = newDate.getFullYear() - firstJobDate.getFullYear();
  let months = newDate.getMonth() - firstJobDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  return years * 12 + months;
}

/**
Function that calculates the optimal recommendation line

@param minAmount: minimum amount
@param maxAmount: maximum amount

@return number: optimal line
*/
function calculateOptimalLine(minAmount: number, maxAmount: number): number {
  /*
		p1 = minimum amount + √(maximum amount - minimum amount)
	*/
  const p1 = minAmount + Math.sqrt(maxAmount - minAmount);
  /*
		p2 = minimum amount + 0.0175 * (maximum amount - minimum amount)
	*/
  const p2 = minAmount + 0.0175 * (maxAmount - minAmount);

  /*
	   optimal credit line = max(p1, p2)
	*/
  return Math.max(p1, p2);
}

interface CalculationEngineOutput {
  amountMinimum: number;
  amountMaximum: number;
  recommendationLine: number;
}

/**
Function that encompasses all the logic of the test.

@param typePayroll: payroll type (A, B, C or D)
@param firstJobDate: first job date
@param gender: worker's gender (m or f)

@return number: minimum amount
@return number: maximum amount
@return number: optimal line recommendation
@return error: error, if any
*/
function calculationEngine(opts: {
  typePayroll: string;
  firstJobDate: Date;
  gender: string;
}): CalculationEngineOutput {
  const { typePayroll, firstJobDate, gender } = opts;

  // If the gender is invalid (neither masculine nor feminine)...
  if (!["m", "f"].includes(gender)) {
    throw Error("invalid gender"); // ...returns error.
  }

  // If the payroll type is invalid (neither A, nor B, nor C, nor D)...
  if (!["A", "B", "C", "D"].includes(typePayroll)) {
    throw Error("invalid payroll type"); // ...returns error.
  }

  // Calculates and adapts the working time with the defined functions.
  workingTime = fixWorkingTime(calculateWorkingTime(firstJobDate), gender);

  // Minimum and maximum amount variables.
  let minAmount, maxAmount: number;

  let optimalLine: number;

  if (gender == "m") {
    // If the gender is male...
    minAmount = minAmountMale[typePayroll][workingTime]; // ...we take the minimum amount based on your work time and payroll type.
    maxAmount = maxAmountMale[typePayroll][workingTime]; // ...we take the maximum amount based on your work time and payroll type.
  } else {
    // If the gender is female...
    minAmount = minAmountFemale[typePayroll][workingTime]; // ...we take the minimum amount based on your work time and payroll type.
    maxAmount = maxAmountFemale[typePayroll][workingTime]; // ...we take the maximum amount based on your work time and payroll type.
  }

  // Calculates the optimal line based on the minimum and maximum amount obtained.
  optimalLine = calculateOptimalLine(minAmount, maxAmount);

  return {
    amountMinimum: minAmount,
    amountMaximum: maxAmount,
    recommendationLine: optimalLine,
  };
}

const typePayroll = "B";

// Date 1 year, 6 months and 15 days before the current date.
const firstJobDate = new Date();
firstJobDate.setFullYear(firstJobDate.getFullYear() - 1);
firstJobDate.setMonth(firstJobDate.getMonth() - 6);
firstJobDate.setDate(firstJobDate.getDate() - 15);

const gender = "m";

// The values of the logic function are obtained.
const { amountMinimum, amountMaximum, recommendationLine } = calculationEngine({
  typePayroll,
  firstJobDate,
  gender,
});

workingTime = fixWorkingTime(calculateWorkingTime(firstJobDate), gender);

console.log({
  "Gender:": gender,
  "Date:": firstJobDate.toISOString().slice(0, 10),
  "Payroll Type:": typePayroll,

  "Months Working:": workingTime,
  "Minimum Amount:": amountMinimum,
  "Maximum Amount:": amountMaximum,
  "Optimal Line:": Math.ceil(recommendationLine),
});

/*
		Not necessary!

		End of time to calculate the execution speed and print it in milliseconds.
	*/
console.timeEnd("Time Execution");
