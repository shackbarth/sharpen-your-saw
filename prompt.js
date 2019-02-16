const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});


/*
const { prompt } = require("promptly");

(async function () {
  const pass = await prompt("What is the password?");
  console.log(pass);
})();
*/