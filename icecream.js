const { prompt } = require("promptly");
const _ = require("lodash");
const program = require("commander");

program
  .option("-d, --digits <num>", "The digits", parseInt)
  .parse(process.argv);

(async function() {
  const digits = program.digits;
  const secret = String(_.random(Math.pow(10, digits - 1), Math.pow(10, digits)));
  while (true) {
    const guess = await prompt("What is your guess?");
    let perfect = 0;
    let good = 0;
    let bad = 0;
    if (guess.length !== digits) {
      console.log(`Your guess must have ${digits} digits`);
      continue;
    }
    for (let i = 0; i < digits; i++) {
      if (secret[i] === guess[i]) {
        perfect++;
      } else if (_.includes(secret, guess[i])) {
        good++;
      } else {
        bad++;
      }
    }
    if (perfect === digits) {
      console.log("Got it!");
      break;
    }
    console.log(`${perfect} perfect`);
    console.log(`${good} good`);
    console.log(`${bad} bad`);
  }
})();
