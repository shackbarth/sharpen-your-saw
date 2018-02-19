const _ = require("lodash");
const { assert } = require("chai");
const fs = require("fs");

function getVowels(word) {
  return _.intersection(word.toLowerCase().split(""), "aeiouy".split(""));
}

function checkWord (state, action) {
  const vowels = _.uniq(_.flatten(_.map(state.list.concat([action.word]), getVowels)));
  if (vowels.length === 1) {
    return _.assign({}, state, { list: state.list.concat([action.word]) });
  }
  return state;
}

const alpha = "abcdefghijklmnopqrstuvwxyz";
function smarterCheckWord (state, action) {
  const isAlpha = _.difference(action.word.toLowerCase().split(""), alpha.split("")).length === 0;
  const isInteresting = _.uniq(action.word.toLowerCase().split("")).length > 1;
  const isAcronym = _.every(action.word, char => char.toUpperCase() === char);
  const hasVowels = !_.isEmpty(getVowels(action.word));
  const vowels = _.uniq(_.flatten(_.map(state.list.concat([action.word]), getVowels)));
  if (isAlpha && isInteresting && !isAcronym && hasVowels && vowels.length === 1) {
    return _.assign({}, state, { list: state.list.concat([action.word]) });
  }
  return state;
}

function generateWords () {
  const dict = fs.readFileSync("/usr/share/dict/words", "utf8");
  const allWords = _.orderBy(dict.split("\n"), () => Math.random());
  let state = { list: [] };
  for (const word of allWords) {
    state = smarterCheckWord(state, { word });
    if (state.list.length >= 100) {
      break;
    }
  }
  return state.list;
}

describe("getVowels", () => {
  it("gets the vowels", () => {
    assert.deepEqual(getVowels("America"), ["a", "e", "i"]);
  })
})

describe("checkWord", () => {
  let state;
  beforeEach(() => {
    state = { list: [] };
  });

  it("adds a new eunoic word", () => {
    state = checkWord(state, { word: "foo" });
    assert.deepEqual(state, { list: ["foo"] });
  });

  it("does not add a new non-eunoic word", () => {
    state = checkWord(state, { word: "about" });
    assert.deepEqual(state, { list: [] });
  });

  it("adds a eunoic word to a compatible list", () => {
    state = { list: ["When", "Helen", "feels", "these", "stresses", "she", "gets", "depressed"] };
    state = checkWord(state, { word: "fee" });
    assert.include(state.list, "fee");
  });

  it("does not add a eunoic word to an incompatible list", () => {
    state = { list: ["When", "Helen", "feels", "these", "stresses", "she", "gets", "depressed"] };
    state = checkWord(state, { word: "foo" });
    assert.notInclude(state.list, "foo");
  });
});

const words = generateWords();
let text = "";
for (const word of words) {
  const isCapitalized = word.charAt(0).toUpperCase() === word.charAt(0);
  if (!isCapitalized && !text) {
    continue;
  } else if (isCapitalized && !text) {
    text += word;
  } else if (isCapitalized) {
    text += `. ${word}`;
  } else {
    text += ` ${word}`;
  }
}
text = `${text}.`;
console.log(text);

/*
Ginni risp. Shii virginitis pilgrimism. Bilskirnir knights minis tink twirls.
Triplicist swigs mirths philhippic spivs inkings linksmith siskins thickwit schtiks.
Viki skirt filings skip dibs chippings. Vivl pigs. Briggs bink.
Phillipp whipstitch stinkbird cinching tiffish. Bring instincts jiggish ictic tibbit.
Thill. Cripps disbind glink gift birring girling. Nitti pricing.
Ziv gists instinct hildings chirking. Idhi whisting. Cdiz immis gimp pimpling.
Witt mispick. Ming thisn linings hippi immingling scillitin lists blinking.
Dwight immi tristichs bim tip. Kilwich switch hint mimic is shim script hicht
skirmish strips didn pitchi. Krti silks. Phil tishri. Milks wistiti siccing.
*/
