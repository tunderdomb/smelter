module.exports = function ( grunt ){

  grunt.initConfig({})

  require('load-grunt-tasks')(grunt)
  grunt.loadTasks("tasks")

  grunt.registerTask("default", "", function(  ){
    console.log("Grunt~~")
    grunt.event.once("connect.dev.listening", function() {
      // and let watch keep it alive
      grunt.task.run("watch")
    })
    // open server
    grunt.task.run("connect:dev")
  })
};