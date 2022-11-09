module.exports = {
  errors: require('./errors'),
  parser: require('./parser').parser,
  checkIfNumber: require('./validation').checkIfNumber,
  checkIfValidSign: require('./validation').checkIfValidSign
}
