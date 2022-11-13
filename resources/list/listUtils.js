const LinkedList = require('./LinkedList')

// Zrobic petle i zwrocic element z klasy
const createList = (data) =>
  Object.entries(data).reduce((prev, [key, value]) => {
    const linkedList = new LinkedList()

    value.forEach((item) => linkedList.add(item))

    return {
      ...prev,
      [key]: linkedList
    }
  }, {})

const createMappedLinkedList = (calculatorResult) =>
  calculatorResult.map((item, index) =>
    createList({ [`num${index % 2 === 0 ? 1 : 2}`]: item })
  )

/**
 *
 * @param {LinkedList} list
 * @param {Number} size
 * @returns
 */
const getElements = (list, { size }) => {
  let counter = 0,
    zerosAdded = 0,
    result = ''

  while (counter < size - 1) {
    if (list.size > 0) result += list.head.element

    if (list.head.next) list.head = list.head.next
    if (list.size <= 0) {
      zerosAdded++
      result = '0' + result
    }

    counter++
    list.size--
  }
  return { numberToDivide: [...result].reverse().join(''), zerosAdded }
}

/**
 *
 * @param {LinkedList} param0
 * @returns {String}
 */
const getDivider = ({ head, size }) => {
  let result = ''

  while (size) {
    result += head.element

    head = head.next

    size--
  }

  return [...result].reverse().join('')
  //return
}
const deleteFirstNumber = ({ head, size }) => ({
  head: head.next,
  size: size - 1
})

module.exports = {
  createList,
  createMappedLinkedList,
  getElements,
  deleteFirstNumber,
  getDivider
}
