module.exports = function(grunt) {

    // parameters
    //var private_directory = grunt.option('private_directory');
    var private_directory = '/c/Users/jho/AppData/Local/Screeps/scripts/pouf___21025';
    grunt.loadNpmTasks('grunt-screeps')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-copy')

    var currentdate = new Date();

    grunt.initConfig({
        screeps: {
            options: {
                server: {
                    host: 'pouf',
                    port: 21025,
                    http: true
                },
                email: 'jens.hoffrichter@gmail.com',
                password: '12345' ,
                branch: 'scheduler',
                ptr: false
            },
            dist: {
                src: ['src/*.js']
            }
        },
        // Remove all files from the dist folder.
        clean: {
            'dist': ['dist']
            },
        // Copy all source files into the dist folder, flattening the folder structure by converting path delimiters to underscores
        copy: {
            // Pushes the game code to the dist folder so it can be modified before being send to the screeps server.
            screeps: {
              files: [{
                expand: true,
                cwd: 'src/',
                src: '**',
                dest: 'dist/',
                filter: 'isFile',
                rename: function (dest, src) {
                  // Change the path name utilize underscores for folders
                  return dest + src.replace(/\//g,'_');
                }
              }],
            }
          },      

    })

    grunt.registerTask('private',  ['clean', 'copy:screeps', 'screeps']);
}