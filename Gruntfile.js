module.exports = function ( grunt ){

  grunt.initConfig({})

  require('load-grunt-tasks')(grunt)
  grunt.loadTasks("tasks")

  grunt.registerTask("default", "", function(  ){
    console.log("Grunt~~")
  })
};