#!/usr/bin/env node

var cwd = process.cwd()
var ports = require(__dirname+"/../gen/ports.json")

console.log(ports)