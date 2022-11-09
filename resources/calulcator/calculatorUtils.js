const Calculator = require('./Calculator')

const chooseOperation = (list, operator) => {
  const { num1, num2 } = list
  const signNum1 = num1.head.element
  const signNum2 = num2.head.element

  const callOperation = {
    '-': subtract,
    '+': sum,
    // '/':,
    '*': multiply
    //'%':
  }

  //if (!['+', '-'].includes(operator)) return new Calculator(operator)

  switch (operator) {
    case '*':
    case '/':
    case '%':
      return callOperation[`${operator}`](list, operator)

    case '+':
      if (signNum1 === -1 && signNum2 === -1) operator = '+'

      if (
        (signNum1 === -1 && signNum2 === 1) ||
        (signNum1 === 1 && signNum2 === -1)
      )
        operator = '-'

      return callOperation[`${operator}`](list, operator)

    case '-':
      if (
        (signNum1 === -1 && signNum2 === 1) ||
        (signNum1 === 1 && signNum2 === -1)
      )
        operator = '+'

      if (signNum1 === -1 && signNum2 === -1) operator = '+'

      return callOperation[`${operator}`](list, operator)
  }
}

/**
 * Get final value from Calculator sum method
 * @param {Record<string, string>} data
 * @param {String} operator
 */
const sum = (data, operator) =>
  new Calculator(operator).sum(data).getResult().reverse().join('')

/**
 *  Get final value from Calculator multiply method
 * @param {Record<string, string>} data
 * @param {String} operator
 */
const multiply = (data, operator) =>
  new Calculator(operator).multiply(data).getResult().reverse().join('')

/**
 *  Get final value from Calculator multiply method
 * @param {Record<string, string>} data
 * @param {String} subtraction
 */
const subtract = (data, operator) =>
  new Calculator(operator)
    .subtraction(data)
    .getResult()
    .reverse()
    .join('')
    .replace(/^0+/, '')

module.exports = { sum, chooseOperation, subtract }
