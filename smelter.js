
var path = require("path")
var fs = require("fs")

var cwd = process.cwd()

var ports = require("./ports.json")

//console.dir(argv)
//console.log(ports)

var smelter  = module.exports = {}


function reservePort( num ){
  if ( !ports.locations[cwd] ) {
    ports.locations[cwd] = []
    new Array(num).forEach(function(){
      ports.locations[cwd].push(++ports.last)
    })
  }
  return ports.locations[cwd]
}

function mkdir( dir ){
  var parts = dir.split(/[\/|\\]/)
  dir = parts.shift()
  while ( parts.length ) {
    dir = path.join(dir, parts.shift())
    try{
      fs.mkdirSync(dir)
    }
    catch(e){

    }
  }
}

function translateToCwd( src ){
  return path.join(cwd, src)
}

function scaffold(  ){
  [
    "res",
    "res/data",
    "res/helpers",
    "res/pages",
    "res/partials",
    "res/style",
    "res/sprites",
    "res/import",
    "res/modules",
    "src/",
    "src/media",
    "src/media/audio",
    "src/media/image",
    "src/media/video",
    "src/script/",
    "src/script/library",
    "src/script/plugin",
    "src/script/polyfill",
    "src/static/",
    "src/static/css",
    "src/static/font",
    "src/static/icon",
    "tasks"
  ].map(translateToCwd).forEach(mkdir)
}

smelter.init = function ( manifest ){
  scaffold()

  var forge = new Forge
  try{
    manifest.init.call(forge)
    manifest.build.call(forge)
  }
  catch( e ){
    console.warn(e)
  }
}
smelter.build = function ( manifest ){

  var forge = new Forge
  try{
    manifest.build.call(forge)
  }
  catch( e ){
    console.warn(e)
  }
}

function Forge(  ){
  var localPorts = reservePort(3)
    , ports = {
      dev: localPorts[0],
      build: localPorts[1],
      lr: localPorts[2]
    }
    , tasks = {}
  tasks.serve = {
    connect: {
      dev: {
        options: {
          port: ports.dev,
          hostname: "*",
          base: "src/",
          livereload: ports.lr,
          open: "http://localhost:"+ports.dev
        }
      },
      build: {
        options: {
          port: ports.build,
          hostname: "*",
          base: "build/",
          keepalive: true,
          open: "http://localhost:"+ports.build
        }
      }
    },
    watch: {},
    render: {
      bracer: {
        options: {
          partials: "res/partials/",
          localPartials: "partials/",
          data: "res/data/*.json",
          localData: "/*.json",
          helpers: "res/helpers/*.js"
        },
        render: {
          expand: true,
          flatten: true,
          cwd: "res/pages/",
          src: "*/*.mustache",
          dest: "src/",
          ext: ".html"
        }
      },
      stylist: {
        options: {
          ignore: "res/style/**/*.less",
          style: "less"
        },
        dev: {
          expand: true,
          src: "res/pages/*/*.mustache",
          ext: ".less"
        }
      },
      less: {
        dev: {
          options: {
            cleancss: true,
            strictMath: true
          },
          expand: true,
          flatten: true,
          cwd: "res/pages/",
          src: "**/*.less",
          dest: "src/static/css/",
          ext: ".css"
        }
      },
      autprefixer: {
        dev: {
          options: {},
          expand: true,
          cwd: "src/static/css/",
          src: "**/*.css",
          dest: "src/static/css/"
        }
      }
    }
  }

  tasks.make = {}

  tasks.build = {}
}

Forge.prototype = {}

Forge.prototype.base = function(  ){

}

Forge.prototype.copy = function(  ){

}

Forge.prototype.concat = function(  ){

}

Forge.prototype.optimize = function( prop, settings ){

}

Forge.prototype.browsers = function( browsers ){
  this.tasks.render.autprefixer.dev.options.browsers = browsers
}
