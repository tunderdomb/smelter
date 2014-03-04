module.exports = function ( grunt ){

  grunt.config("stylist:dev", {
    options: {
      ignore: ["res/style/*.less", "res/import/*.less"]
    },
    src: "res/pages/*/*.html",
    ext: ".less"
  })

};