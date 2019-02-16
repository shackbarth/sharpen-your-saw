// grep.js

const _ = require("lodash");
const program = require("commander");
const grepEngine = require("./grep-engine");

program
  .option("-r, --recursive", "Recusive")
  .option("--exclude-dir <dir>", "Exclude directory")
  .parse(process.argv);

const options = _.pick(program, ["recursive", "excludeDir", "args"]);
grepEngine(options);