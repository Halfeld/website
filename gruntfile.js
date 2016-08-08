
const load = require('load-grunt-tasks')

module.exports = grunt => {
  load(grunt)

  grunt.initConfig({

    watch: {
      dist: {
        files: ['src/**/*.js'],
        tasks: ['concat', 'uglify']
      }
    },

    // Uglify
    // ======
    uglify: {

      // Standard task
      // =============
      dist: {
        files: {
          'assets/js/main.min.js': ['assets/js/main.js']
        }
      }
    },

    // Concat
    // ======
    concat: {

      // Standard task
      // =============
      dist: {
        src: [
          'src/js/lib/particles.js/particles.js',
          'src/js/lib/zepto/zepto.js',
          'src/js/zmain.js'
        ],
        dest: 'assets/js/main.js'
      }
    }

  })

  grunt.registerTask('default', ['concat', 'uglify', 'watch'])
}
