const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Give me first number  ', function (num1) {
  rl.question('choose operation ', function (operation) {
    rl.question('Give me second number ', function (num2) {

      (function () {
        console.log(`Operation to be done ${num1} ${operation} ${num2}`);
      })()
      rl.close();
    });
  });

});



