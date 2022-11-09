const validSigns = ['-', '+', '/', '*', '%']

const checkIfNumber = (data) => {
  const reg = new RegExp(
    '^-?([0]{1}.{1}[0-9]+|[1-9]{1}[0-9]*.{1}[0-9]+|[0-9]+|0)$'
  )

  return Object.values(data).filter((array, index) => {
    if (!array.length)
      throw new Error(`${index === 0 ? 'First' : 'Second'} is empty`)

    array.forEach((item) => {
      if (!reg.test(item)) throw new Error('Not a number')
    })
  })
}

const checkIfValidSign = (sign) => {
  if (!validSigns.includes(sign)) throw new Error(`Invalid sign: ${sign}`)
}

module.exports = {
  checkIfNumber,
  checkIfValidSign
}
