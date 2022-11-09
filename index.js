const readline = require('readline')
const app = require('./app')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Give me first number  ', (num1) => {
  rl.question('choose operation ', (operation) => {
    rl.question('Give me second number ', (num2) => {
      ;(function () {
        app(
          {
            num1,
            num2
          },
          operation
        )

        console.log(`Operation to be done ${num1} ${operation} ${num2}`)
      })()
      rl.close()
    })
  })
})
