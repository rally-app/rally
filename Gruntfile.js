module.exports = function (grunt) {
  
  grunt.initConfig({

    jshint: {
      all: [ 'public/scripts/**/*.js' ]
    },

    watch: {
      scripts: {
        files: [ 'public/scripts/**/*.js' ],
        tasks: [ 'jshint' ],
        options: {
          spawn: false,
        },
      },
    },

  });

  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );

  grunt.registerTask( 'default', [ 'jshint', 'watch' ] );

};
