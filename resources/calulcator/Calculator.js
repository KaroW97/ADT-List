const LinkedList = require('../list/LinkedList')
const listUtils = require('../list/listUtils')

class Calculator {
  constructor(sign = null) {
    this.sign = sign
    this.isFirst = true
    this.rest = 0
    this.result = []
    this.multiplyResult = []
    this.tempArray = []
    this.addZeros = 0
  }

  clear() {
    this.result = []
    this.rest = 0
    this.isFirst = false
  }

  setRest(rest) {
    this.rest = rest
  }

  getRest() {
    return this.rest
  }

  setResult(result) {
    this.result.push(result)
  }

  getResult() {
    return this.result
  }

  setIsFirst(isFirst = false) {
    this.isFirst = isFirst
  }

  getIsFirst() {
    return this.isFirst
  }

  addressToProperKey(sum, isPositive = true) {
    if (isPositive)
      if (sum >= 10) {
        const [getRest, getResult] = sum.toString().split('')

        this.setRest(+getRest)

        this.setResult(+getResult)
      } else this.setResult(+sum)
    else {
      if (sum < 0) {
        sum += 10

        this.setRest(-1)
      } else this.setRest(0)

      this.setResult(sum)
    }
  }

  decideElementOrder({ num1, num2 }) {
    if (num2.size > num1.size) return { mainElement: num2, secondElement: num1 }
    else return { mainElement: num1, secondElement: num2 }
  }

  secondaryOperation() {
    const mappedLinkedList = listUtils.createMappedLinkedList(this.getResult())

    this.clear()

    while (mappedLinkedList.length) {
      const [first, second] = mappedLinkedList

      if (!this.result.length) {
        mappedLinkedList.splice(0, 2)

        this.sum({ ...first, ...second })
      } else {
        mappedLinkedList.splice(0, 1)

        const list = listUtils.createMappedLinkedList([this.result])

        this.clear()

        this.sum({ ...first, num2: list[0].num1 })
      }
    }
  }

  adjustNumberPosition(position) {
    for (let i = 0; i < position - 2; i++) this.tempArray.push(0)
  }
  /**
   *
   * @param {*} data
   * @returns
   */
  sum(data) {
    const { mainElement, secondElement } = this.decideElementOrder(data)

    while (mainElement.size > 0) {
      if (!this.getIsFirst()) {
        let sumUp = mainElement.head.element + this.rest

        if (secondElement.size > 0) sumUp += secondElement.head.element

        this.setRest(0)

        this.addressToProperKey(sumUp)
      }

      if (secondElement.head.next) secondElement.head = secondElement.head.next

      mainElement.head = mainElement.head.next

      this.setIsFirst()

      mainElement.size--

      secondElement.size--
    }

    return this
  }

  /**
   *
   * @param {*} data
   */
  multiply(data) {
    const { mainElement, secondElement } = this.decideElementOrder(data)

    let deepCopyCount = 1

    while (secondElement.size >= deepCopyCount) {
      let deepBigIfFirst = true

      let deepBigger = JSON.parse(JSON.stringify(mainElement))

      if (deepCopyCount > 2) this.adjustNumberPosition(deepCopyCount)

      while (deepBigger.size && !this.getIsFirst()) {
        if (!deepBigIfFirst) {
          const multiply =
            secondElement.head.element * deepBigger.head.element +
            this.getRest()

          this.setRest(0)

          if (multiply < 10) this.tempArray.push(+multiply)
          if (multiply >= 10) {
            const [getFirst, getSec] = multiply.toString().split('')

            if (!deepBigger.head.next) this.tempArray.push(+getSec, +getFirst)
            if (deepBigger.head.next) {
              this.tempArray.push(+getSec)

              this.setRest(+getFirst)
            }
          }
        }

        deepBigger.head = deepBigger.head.next

        deepBigger.size--

        deepBigIfFirst = false
      }

      if (secondElement.head.next) secondElement.head = secondElement.head.next

      if (this.tempArray.length) this.setResult(this.tempArray)

      this.tempArray = []

      this.setIsFirst()

      deepCopyCount++
    }

    this.secondaryOperation()

    return this
  }

  /**
   *
   * @param {*} data
   * @returns
   */
  subtraction(data) {
    const { num1, num2 } = data

    console.log()
    if (num1.size < num2.size)
      throw new Error('The second value is grater then first')

    while (num1.size > 0) {
      if (!this.getIsFirst()) {
        let sumUp = num1.head.element + this.rest

        if (num2.size > 0) sumUp -= num2.head.element
        if (sumUp < 0 && num1.size === 1)
          throw new Error('The second value is grater then first')

        this.addressToProperKey(sumUp, false)
      }

      if (num2.head.next) num2.head = num2.head.next

      num1.head = num1.head.next

      this.setIsFirst()

      num1.size--

      num2.size--
    }
    return this
  }

  /**
   *
   * @param {LinkedList} data
   */
  division({ num1, num2 }) {
    console.log({ num1, num2 })
    let tempDivider = 0,
      finalIteration = false

    const newNum1 = listUtils.deleteFirstNumber(num1)
    console.log(newNum1)
    //const { numberToDivide, zerosAdded } = listUtils.getElements(newNum1, num2)
    const divider = listUtils.getDivider(listUtils.deleteFirstNumber(num2))

    while (!finalIteration) {
      if (this.tempArray.length < divider.length && newNum1.size > 0)
        this.tempArray.push(newNum1.head.element)

      if (newNum1.size <= 0) {
        this.tempArray.unshift(0)
        this.addZeros++
      }

      if (this.tempArray.length === divider.length) {
        let toBeDivide = this.tempArray.reverse().join('')

        if (toBeDivide / divider < 1.0) {
          this.addZeros++

          toBeDivide = toBeDivide * 10

          const divided = parseInt(toBeDivide / divider) * divider

          this.rest = toBeDivide - divided
        } else {
          const divided = parseInt(toBeDivide / divider) * divider
          console.log('toBeDivide', toBeDivide)
          console.log('divided', divided)
          console.log(toBeDivide - divided)
          this.rest = toBeDivide - divided
        }

        finalIteration = true
      }
      if (newNum1.head.next) newNum1.head = newNum1.head.next
      newNum1.size--
    }
  }

  /**
   *
   * @param {*} data
   */
  modulo(data) {
    while (num1.size > 0) {}
  }
}

module.exports = Calculator
