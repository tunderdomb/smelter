module.exports = function ( grunt ){

  grunt.config("bracer:dev", {
    options: {
      partials: "test/global/partials/",
      data: "test/global/data/*.json",
      helpers: "test/global/helpers/*.js",
      localPartials: "partials/",
      localData: "**/*.json"
    },
    expand: true,
    cwd: "res/pages/",
    src: "*/*.mustache",
    dest: "src/",
    ext: ".html"
  })

};