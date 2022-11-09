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

module.exports = { createList, createMappedLinkedList }
