var path = require("path")
var fs = require("fs")
var async = require("async")
var mkdirp = require("mkdirp")
var prompt = require('prompt')

var cwd = process.cwd()

var ports = require("./ports.json")

//console.dir(argv)
//console.log(ports)

var smelter = module.exports = {}

var template = {}

template.res = {
  data: "",
  helpers: "",
  "import": "",
  pages: "",
  partials: "",
  templates: "",
  spites: "",
  style: ""
}
template.src = {}
template.media = {
  image: "",
  audio: "",
  video: ""
}
template.script = {
  library: "",
  plugin: "",
  polyfill: ""
}
template.static = {
  css: "",
  font: "",
  icon: "",
  template: ""
}

function reservePort( num ){
  if ( !ports.locations[cwd] ) {
    ports.locations[cwd] = []
    new Array(num).forEach(function (){
      ports.locations[cwd].push(++ports.last)
    })
  }
  return ports.locations[cwd]
}

function translateToCwd( src ){
  return path.join(cwd, src)
}

smelter.manifest = function ( defaults, done ){
  if ( defaults ) {

  }
  else {
    prompt.start()
    prompt.get({
      properties: {
        hello: {
          description: 'Enter your password',     // Prompt displayed to the user. If not supplied name will be used.
          type: 'string',                 // Specify the type of input to expect.
          pattern: /^\w+$/,                  // Regular expression that input must be valid against.
          message: 'Password must be letters', // Warning message to display if validation fails.
          hidden: true,                        // If true, characters entered will not be output to console.
          default: 'lamepassword',             // Default value to use if no value is entered.
          required: true,                        // If true, value entered must be non-empty.
          before: function(value) { return 'v' + value; } // Runs before node-prompt callbacks. It modifies user's input
        }
      }
    }, function( err, result ){

    })
  }
}

smelter.init = function ( manifest, done ){
  async.series({
    scaffold: function ( ok ){
      console.log("Creating project structure...")
      var dirs = []
        , dir
      for ( dir in template.res ) { dirs.push("res/" + dir) }
      for ( dir in template.media ) { dirs.push("src/media/" + dir) }
      for ( dir in template.script ) { dirs.push("src/script/" + dir) }
      for ( dir in template.static ) { dirs.push("src/static/" + dir) }
      async.each(dir.map(translateToCwd), mkdirp, function ( err ){
        // if any of the saves produced an error, err would equal that error
        ok(err)
      })
    }
  }, function ( err, result ){
    if ( err ) done(err)
    console.log("Manifesting...")

    var forge = new Forge
    forge.getPorts()
    forge.initTasks()
    try {
      manifest.init.call(forge)
      manifest.build.call(forge)
    }
    catch ( e ) {
      console.warn(e)
    }
  })

}
smelter.build = function ( manifest ){
  var forge = new Forge
  try {
    manifest.build.call(forge)
  }
  catch ( e ) {
    console.warn(e)
  }
}

function Forge(){}

Forge.prototype = {}

Forge.prototype.getPorts = function (){
  var localPorts = reservePort(3)
  this.ports = {
    dev: localPorts[0],
    build: localPorts[1],
    lr: localPorts[2]
  }
}
Forge.prototype.initTasks = function (){
  this.tasks = {}
  this.tasks.serve = {}
  this.tasks.serve.connect = {
    dev: {
      options: {
        port: ports.dev,
        hostname: "*",
        base: "src/",
        livereload: ports.lr,
        open: "http://localhost:" + ports.dev
      }
    },
    build: {
      options: {
        port: ports.build,
        hostname: "*",
        base: "build/",
        keepalive: true,
        open: "http://localhost:" + ports.build
      }
    }
  }
  this.tasks.serve.watch = {}
  this.tasks.serve.render = {
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

Forge.prototype.base = function (){

}

Forge.prototype.copy = function (){

}

Forge.prototype.concat = function (){

}

Forge.prototype.optimize = function ( prop, settings ){

}

Forge.prototype.browsers = function ( browsers ){
  this.tasks.render.autprefixer.dev.options.browsers = browsers
}
