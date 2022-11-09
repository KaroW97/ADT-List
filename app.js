const listUtils = require('./resources/list/listUtils')
const utils = require('./resources/utils/index')
const calculator = require('./resources/calulcator/calculatorUtils')

module.exports = app = (data, operator) => {
  // First check if proper operator
  utils.checkIfValidSign(operator)

  // Parse data to array of numbers
  const parsed = utils.parser(data)

  // Check if all of data are numbers
  utils.checkIfNumber(parsed)

  // Create linked lists
  const list = listUtils.createList(parsed)

  const result = calculator.chooseOperation(list, operator)

  console.log(result)
  //const calculate = chooseOperation[`${sign.sign}`](list)
}
