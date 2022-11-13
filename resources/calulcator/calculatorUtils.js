const Calculator = require('./Calculator')

const chooseOperation = (list, operator) => {
  const { num1, num2 } = list
  const signNum1 = num1.head.element
  const signNum2 = num2.head.element

  const callOperation = {
    '-': subtract,
    '+': sum,
    '/': division,
    '*': multiply
    //'%':
  }

  switch (operator) {
    case '*':
    case '/':
    case '%':
      let sign = '+'
      if (signNum1 === -1 && signNum2 === -1) sign = '+'

      if (
        (signNum1 === -1 && signNum2 === 1) ||
        (signNum1 === 1 && signNum2 === -1)
      )
        sign = '-'

      return callOperation[`${operator}`](list, sign)

    case '+':
      if (signNum1 === -1 && signNum2 === -1) operator = '+'

      if (
        (signNum1 === -1 && signNum2 === 1) ||
        (signNum1 === 1 && signNum2 === -1)
      )
        operator = '-'

      return callOperation[`${operator}`](list)

    case '-':
      if (
        (signNum1 === -1 && signNum2 === 1) ||
        (signNum1 === 1 && signNum2 === -1)
      )
        operator = '+'

      if (signNum1 === -1 && signNum2 === -1) operator = '+'

      return callOperation[`${operator}`](list)
  }
}

const division = (data, sign) => new Calculator(sign).division(data).getResult()
/**
 * Get final value from Calculator sum method
 * @param {Record<string, string>} data
 * @param {String} operator
 */
const sum = (data) => new Calculator().sum(data).getResult().reverse().join('')

/**
 *  Get final value from Calculator multiply method
 * @param {Record<string, string>} data
 * @param {String} operator
 */
const multiply = (data) =>
  new Calculator().multiply(data).getResult().reverse().join('')

/**
 *  Get final value from Calculator multiply method
 * @param {Record<string, string>} data
 * @param {String} subtraction
 */
const subtract = (data) =>
  new Calculator()
    .subtraction(data)
    .getResult()
    .reverse()
    .join('')
    .replace(/^0+/, '')

module.exports = { chooseOperation }
