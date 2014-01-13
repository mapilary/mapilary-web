module.exports = function(grunt) {

    // load tasks
    [
        'grunt-contrib-jshint',
        'grunt-contrib-qunit',
        'grunt-contrib-watch',
        'grunt-contrib-clean',
        'grunt-contrib-copy',
        'grunt-contrib-uglify',
        'grunt-contrib-cssmin',
        'grunt-contrib-concat',
        'grunt-contrib-less',
        'grunt-contrib-coffee',
        'grunt-usemin'
    ].forEach(function(task) { grunt.loadNpmTasks(task); });


    // setup init config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist']
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/',
                    dest: 'dist/',
                    src: [
                        'assets/**',
                        'css/**',
                        'js/**',
                        'ico/**',
                        '*.html'
                    ],
                    filter: 'isFile'
                }]
            }
        },
        less: {
            dist: {
                files: {
                    'src/css/main.min.css': [
                        'src/less/style.less',
                        'src/less/track.less'
                ]
            },
            options: {
                compress: false,
                // LESS source maps
                // To enable, set sourceMap to true and update sourceMapRootpath based on your install
                sourceMap: true,
                sourceMapFilename: 'src/css/main.min.css.map',
                sourceMapRootpath: '/mapilary-web'
            }
          }
        },
        coffee: {
            glob_to_multiple: {
                expand: true,
                //flatten: true,
                cwd: 'src/coffee',
                src: ['**/*.coffee'],
                dest: 'src/js',
                ext: '.js'
            }
        },
        useminPrepare: {
            html: ['dist/track.html']
        },
        usemin: {
            html: ['dist/track.html'],
            options: {
                dirs: ['dist/']
            }
        },
        // TODO - support qunit
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['src/*.html'],
                task: ['change']
            },
            coffee: {
                files: ['src/**/*.coffee'],
                tasks: ['coffee', 'jshint', 'change']
            },
            less: {
                files: ['src/**/*.less'],
                tasks: ['less', 'change']
            },
            css: {
                files: '**/*.sass',
                tasks: ['sass', 'change']
            }
        }
    });

    grunt.registerTask('test', ['jshint', 'qunit']);

    grunt.registerTask('change', [
        'copy',
        'useminPrepare',
        'concat',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'less',
        'coffee',
        'jshint',
        'clean',
        'change'
        // 'uglify',
    ]);
};
