
// Grunticon test

var path = require("path")

module.exports = function ( grunt ){
  grunt.config("grunticon.generate", {
    options: {
      // The name of the generated CSS file containing SVG data uris.
      datasvgcss: "svg.data.less",
      // The name of the generated CSS file containing PNG data uris
      datapngcss: "png.data.less",
      // The name of the generated CSS file containing external png url references.
      urlpngcss: "png.url.less",
      // The name of the generated HTML file containing PNG data uris.
      previewhtml: "preview.html",
      // The name of the generated text file containing the grunticon loading snippet.
      loadersnippet: "grunticon.js",
      // The name of the generated folder containing the generated PNG images.
      pngfolder: "/static/icon/",
      // a string to prefix all css classes with.
      cssprefix: ".icon-",
      //
      customselectors: {}
    },
    files: [{
      expand: true,
      cwd: 'src/static/icons/',
      src: ['*.svg', '*.png'],
      dest: "gen/grunticon/"
    }]
  })

  grunt.config("clean.grunticon", {
    src: "gen/grunticon/**/*"
  })

  grunt.registerTask("icon", function(  ){
    grunt.task.run("grunticon:generate")
    grunt.file.expand("gen/grunticon/*.less").forEach(function( less ){
      grunt.file.copy(less, path.join("res/import/", path.basename(less)))
    })
    grunt.task.run("grunticon")
    grunt.file.expand("gen/grunticon/static/icon/*.png").forEach(function( png ){
      grunt.file.copy(png, path.join("src/static/icon", path.basename(png)))
    })
    grunt.file.copy("gen/grunticon/grunticon.js", "src/script/grunticon.js")
    grunt.task.run("clean:grunticon")
  })
}