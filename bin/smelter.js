#!/usr/bin/env node

var cwd = process.cwd()
var smelter = require("../smelter")
var ports = require(__dirname+"/../ports.json")
var argv = require('minimist')(process.argv.slice(2))
var manifest = require(cwd+"/manifest")

var task = argv._[0]

switch( task ){
  case "init":
    console.log("Let's forge something!")
    smelter.init(manifest)
    break
  case "build":
    console.log("Let's rebuild this thing!")
    smelter.build(manifest)
    break
  default :
    console.log("unknown command")

}