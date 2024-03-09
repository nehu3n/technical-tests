/*
Code solution by Nehuen/Neth (https://github.com/nehu3n)
*/

package main

import (
	"errors"
	"fmt"
	"math"
	"time"
)

/*
Defines a type for dictionaries.

@type
 map[string]:
  map[int]:
   int
*/
type Amount map[string]map[int]int

// Define the dictionaries for each amount.
var (
	// Minimum amount of the male gender.
	minAmountMale = Amount{
		"A": {0: 100, 26: 100, 27: 400, 28: 900, 29: 100, 30: 600},
		"B": {0: 1000, 26: 1000, 27: 600, 28: 1000, 29: 1000, 30: 1000},
		"C": {0: 400, 26: 400, 27: 200, 28: 200, 29: 1000, 30: 600},
		"D": {0: 400, 26: 400, 27: 300, 28: 500, 29: 900, 30: 1000},
	}

	// Maximum amount of the male gender.
	maxAmountMale = Amount{
		"A": {0: 4900, 26: 4900, 27: 4700, 28: 4600, 29: 4600, 30: 4500},
		"B": {0: 4700, 26: 4700, 27: 4400, 28: 5000, 29: 4400, 30: 4900},
		"C": {0: 5000, 26: 5000, 27: 4700, 28: 5000, 29: 4200, 30: 4600},
		"D": {0: 4400, 26: 4400, 27: 4700, 28: 4300, 29: 4900, 30: 4300},
	}

	// Minimum amount of female gender.
	minAmountFemale = Amount{
		"A": {0: 800, 24: 800, 25: 800, 26: 800, 27: 600, 28: 200},
		"B": {0: 800, 24: 800, 25: 700, 26: 100, 27: 600, 28: 700},
		"C": {0: 200, 24: 200, 25: 900, 26: 700, 27: 800, 28: 100},
		"D": {0: 500, 24: 500, 25: 1000, 26: 600, 27: 400, 28: 700},
	}

	// Maximum amount of female gender.
	maxAmountFemale = Amount{
		"A": {0: 4000, 24: 4000, 25: 4200, 26: 4100, 27: 4200, 28: 4500},
		"B": {0: 4700, 24: 4700, 25: 4200, 26: 4500, 27: 4300, 28: 4400},
		"C": {0: 4600, 24: 4600, 25: 4900, 26: 4600, 27: 4700, 28: 4000},
		"D": {0: 5000, 24: 5000, 25: 4900, 26: 4700, 27: 5000, 28: 4300},
	}

	// Extra variable outside dictionaries. Defines the working time.
	workingTime int
)

/*
Function that adapts the calculated working time to match the dictionary keys.

@param workingTime: working time in months
@param gender: worker's gender (m or f)

@return int8: adjusted working time
@return error: error, if any
*/
func fixWorkingTime(workingTime int, gender string) (int, error) {
	switch gender {
	case "m": // If the gender is male
		switch {
		case workingTime >= 0 && workingTime <= 26:
			return 26, nil
		case workingTime > 26 && workingTime < 30:
			return workingTime, nil
		case workingTime >= 30:
			return 30, nil
		}
	case "f": // If the gender is female
		switch {
		case workingTime >= 0 && workingTime <= 24:
			return 24, nil
		case workingTime > 24 && workingTime < 28:
			return workingTime, nil
		case workingTime >= 28:
			return 28, nil
		}
	}
	return 0, errors.New("no range has matched") // If no time matches, returns 0 and an error.
}

/*
Function that calculates the time elapsed since the first job.

@param firstJobDate: first job date

@return int8: working time in months
*/
func calculateWorkingTime(firstJobDate time.Time) int {
    years := time.Now().Year() - firstJobDate.Year()
    months := int(time.Now().Month()) - int(firstJobDate.Month())

    if months < 0 {
        years--
        months += 12
    }

    return years*12 + months
}

/*
Function that calculates the optimal recommendation line

@param minAmount: minimum amount
@param maxAmount: maximum amount

@return int16: optimal line
*/
func calculateOptimalLine(minAmount int, maxAmount int) int {
	/*
	p1 = minimum amount + √(maximum amount - minimum amount)
	*/
    p1 := float64(minAmount) + math.Sqrt(float64(maxAmount)-float64(minAmount))
	/*
	p2 = minimum amount + 0.0175 * (maximum amount - minimum amount)
	*/
    p2 := float64(minAmount) + 0.0175*(float64(maxAmount)-float64(minAmount))

	/*
    optimal credit line = max(p1, p2)
	*/
    return int(math.Max(p1, p2))
}

/*
Function that encompasses all the logic of the test.

@param payrollType: payroll type (A, B, C or D)
@param firstJobDate: first job date
@param gender: worker's gender (m or f)

@return int16: minimum amount
@return int16: maximum amount
@return int16: optimal line recommendation
@return error: error, if any
*/
func calculationEngine(payrollType string, firstJobDate time.Time, gender string) (int, int, int, error) {
	// If the gender is invalid (neither masculine nor feminine)...
	if gender != "m" && gender != "f" {
		return 0, 0, 0, errors.New("invalid gender") // ...returns 0 in the amounts and an error.
	}

	// If the payroll type is invalid (neither A, nor B, nor C, nor D)...
	if payrollType != "A" && payrollType != "B" && payrollType != "C" && payrollType != "D" {
		return 0, 0, 0, errors.New("invalid payroll type") // ...returns 0 in the amounts and an error.
	}

	// Calculates and adapts the working time with the defined functions.
	workingTime = calculateWorkingTime(firstJobDate)
	workingTime, err := fixWorkingTime(workingTime, gender)

	// If there is an error, it returns it next to 0 in the amounts.
	if err != nil {
		return 0, 0, 0, err
	}

	// Minimum and maximum amount variables.
	var minAmount, maxAmount int
	if gender == "m" { // If the gender is male...
		minAmount = minAmountMale[payrollType][workingTime] // ...we take the minimum amount based on your work time and payroll type.
		maxAmount = maxAmountMale[payrollType][workingTime] // ...we take the maximum amount based on your work time and payroll type.
	} else { // If the gender is female...
		minAmount = minAmountFemale[payrollType][workingTime] // ...we take the minimum amount based on your work time and payroll type.
		maxAmount = maxAmountFemale[payrollType][workingTime] // ...we take the maximum amount based on your work time and payroll type. 
	}

	// Calculates the optimal line based on the minimum and maximum amount obtained.
	optimalLine := calculateOptimalLine(minAmount, maxAmount)

	return minAmount, maxAmount, optimalLine, nil
}

func main() {
/*
	Not necessary!

	Start of the time to calculate the execution speed
	*/
	startTime := time.Now()

	payrollType := "A"
	firstJobDate := time.Now().AddDate(-1, -6, -15) // Date 1 year, 6 months and 15 days before the current date.
	gender := "m"

	// The values of the logic function are obtained.
	minAmount, maxAmount, optimalLineRecommendation, err := calculationEngine(payrollType, firstJobDate, gender)
	// If it gives error...
	if err != nil {
		panic(err) // ...program execution is stopped with this one.
	}

	fmt.Println("Gender:", gender)
	fmt.Println("Date:", firstJobDate.Format("2006-01-02"))
	fmt.Printf("Payroll type: %q\n\n", payrollType)

	fmt.Printf("Months Working: %d\n", workingTime)
	fmt.Printf("Minimum Amount: %d\n", minAmount)
	fmt.Printf("Maximum Amount: %d\n", maxAmount)
	fmt.Printf("Optimal Line: %d\n\n", optimalLineRecommendation)

    /*
	Not necessary!
	
	End of time to calculate the execution speed and print it in milliseconds.
	*/
	fmt.Println("Execution Time:", time.Since(startTime))
}