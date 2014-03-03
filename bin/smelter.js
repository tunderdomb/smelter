#!/usr/bin/env node

var cwd = process.cwd()
var smelter = require("../smelter")

var argv = require('minimist')(process.argv.slice(2))
var useDefaults = argv.default === true

console.dir(argv)

var manifest
try {
  manifest = require(cwd + "/manifest")
}
catch ( e ) {

}

var task = argv._[0]

switch ( task ) {
  case "init":
    console.log("Let's forge something!")
    if ( manifest || useDefaults ) {
      smelter.init(manifest)
    }
    else{
      smelter.manifest()
    }
    break
  case "build":
    console.log("Let's rebuild this thing!")
    smelter.build(manifest)
    break
  default :
    console.warn("unknown command")
}
