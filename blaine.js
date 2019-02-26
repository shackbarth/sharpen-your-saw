'use strict';

const rn = require('random-number');
const program = require('commander');
const promptly = require('promptly');

program
  .version('0.0.1')
  .option('-d, --digit <n>', parseInt)
  .parse(process.argv);


(async function() {

  const target = rn({
    min: 100,
    max: 999,
    integer: true
  });
  while(true) {
    const guess = await promptly.prompt('What\'s your guess?');
    const result = evaluateGuess(guess, target);
  } 
  console.log(result);
})()

function splitNumber(number) {
  const string = String(number)
  return [
    string[0],
    string[1],
    string[2]
  ]
}

function evaluateGuess(guess, target) {
  console.log(guess);

  const guessDigits = splitNumber(guess);
  const targetDigits = splitNumber(target);

  const guessQuality = [];
  // check each number in guess against number in
  // target
  guessDigits.forEach(function(guess, guessIndex) {
    const guessInTargetIndex = targetDigits.findIndex((item => item == guess));
    if (guessInTargetIndex != -1) {
      if (guessIndex == guessInTargetIndex) {
        guessQuality.push({
          number: guess,
          quality: 'Perfect'
        })
      } else {
        guessQuality.push({
          number: guess,
          quality: 'Good'
        })
      }
    } else {
      guessQuality.push({
        number: guess,
        quality: 'Bad'
      });
    }
  });

  return guessQuality
}

