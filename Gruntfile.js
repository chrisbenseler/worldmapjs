/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    
    
    jshint: {
      options: {
        jshintrc: '.jshintrc'

      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['src/**/*.js']
      },
      tests: {
        src: ['test/**/*.js']
        
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
     uglify: {
      my_target: {
        files: {"worldmap-min.js": ["src/worldmap.js"]}
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit','uglify']);

  //Travis CI task
  grunt.registerTask('test', ['qunit']);

};
