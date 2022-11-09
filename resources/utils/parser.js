/**
 *
 * @param {Record<string, string>} data
 */
const parser = (data) =>
  Object.entries(data).reduce((prev, [key, value]) => {
    let sign = 1

    const splitted = Array.from(value).reverse()

    if (splitted.includes('-')) {
      sign = -1
      splitted.pop()
    }

    splitted.unshift(sign)

    return {
      ...prev,
      [key]: splitted.map((item) => Number(item))
    }
  }, {})

module.exports = {
  parser
}
