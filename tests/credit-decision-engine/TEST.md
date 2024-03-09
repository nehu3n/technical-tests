# Credit Decision Engine

For a financial company, it is desired to know the appropriate set of loans for a customer. To determine this set, it is necessary to define the minimum and maximum loan amount; additionally, an optimal line of credit recommendation is sought. To characterize the customer, the following variables are available: the type of payroll (value in {A, B, C, D}), the date of the first job, and the gender (value in {m, f}). Both the minimum and maximum loan amounts are selected based on the following 4 tables.

Minimum loan amount based on payroll type and number of months since the first job for male gender.

| Months since first job | A | B | C | D |
|------------------------|---|---|---|---|
| [0-26)                 | 100 | 1000 | 400 | 400 |
| 27                     | 400 | 600 | 200 | 300 |
| 28                     | 900 | 1000 | 200 | 500 |
| 29                     | 100 | 1000 | 1000 | 900 |
| [30 - inf]             | 600 | 1000 | 600 | 1000 |

Minimum loan amount based on payroll type and number of months since the first job for female gender.

| Months since first job | A | B | C | D |
|------------------------|---|---|---|---|
| [0-24)                 | 800 | 800 | 200 | 500 |
| 25                     | 800 | 700 | 900 | 1000 |
| 26                     | 800 | 100 | 700 | 600 |
| 27                     | 600 | 600 | 800 | 400 |
| [28 - inf]             | 200 | 700 | 100 | 700 |

Maximum loan amount based on payroll type and number of months since the first job for male gender.

| Months since first job | A | B | C | D |
|------------------------|---|---|---|---|
| [0-26)                 | 4900 | 4700 | 5000 | 4400 |
| 27                     | 4700 | 4400 | 4700 | 4700 |
| 28                     | 4600 | 5000 | 5000 | 4300 |
| 29                     | 4600 | 4400 | 4200 | 4900 |
| [30 - inf]             | 4500 | 4900 | 4600 | 4300 |

Maximum loan amount based on payroll type and number of months since the first job for female gender.

| Months since first job | A | B | C | D |
|------------------------|---|---|---|---|
| [0-24)                 | 4000 | 4700 | 4600 | 5000 |
| 25                     | 4200 | 4200 | 4900 | 4900 |
| 26                     | 4100 | 4500 | 4600 | 4700 |
| 27                     | 4200 | 4300 | 4700 | 5000 |
| [28 - inf]             | 4500 | 4400 | 4000 | 4300 |

On the other hand, the optimal line of credit is defined as follows:

`optimal credit line = max(p1, p2)`

Where:

`p1 = minimum amount + sqrt(maximum amount - minimum amount)`
`p2 = minimum amount + 0.0175 * (maximum amount - minimum amount)`

## Presentation of Results

The problem must be solved in JavaScript, and a file named `motor.js` must be delivered, where a function `calculoMotor` is defined. This function should take the following input parameters: `tipoNomina` (string), `fechaPrimerEmpleo` (Date), and `genero` (string). The output of the function should be an object containing the attributes: `montoMinimo`, `montoMaximo`, and `recomendacionLinea`, which should contain the minimum and maximum loan amounts and the optimal line of credit recommendation, respectively.

Additionally, the results of evaluating the function using the following data set must be provided. **The delivery format is free.

| Payroll Type | First Job Date | Gender | Minimum Loan Amount | Maximum Loan Amount | Optimal Credit Line |
|--------------|-----------------|--------|----------------------|----------------------|----------------------|
| A            | 12/06/2022      | f      |                     |                     |                      |
| B            | 30/12/1993      | f      |                     |                     |                      |
| C            | 19/09/2020      | m      |                     |                     |                      |
| D            | 15/01/2019      | m      |                     |                     |                      |