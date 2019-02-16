const _ = require("lodash");
const path = require("path");
const cp = require("child_process");

// route-handler.js

function handle(req, res) {
  const args = _.compact([
    req.query.recurse ? "-r" : null, 
    "--exclude-dir", 
    "node_modules", 
    req.query.searchTerm, 
    "."
  ]);
  const worker = cp.fork(path.resolve(__dirname, "./grep.js"), args);
}

handle({ query: { searchTerm: "foo" } });