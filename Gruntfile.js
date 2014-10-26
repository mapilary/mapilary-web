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
    'grunt-contrib-compass',
    'grunt-contrib-coffee',
    'grunt-contrib-imagemin',
    'grunt-contrib-htmlmin',
    'grunt-usemin',
    'grunt-rev',
    'grunt-targethtml',
    'grunt-uncss'
    ].forEach(function(task) { grunt.loadNpmTasks(task); });


    // setup init config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['.tmp', 'dist']
        },
        copy: {
            prepareUsemin: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/',
                    dest: '.tmp/',
                    src: ['*.html'],
                    filter: 'isFile'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/',
                    dest: 'dist/',
                    src: ['*.html'],
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'src/',
                    dest: 'dist/',
                    src: [
                        'images/*',
                        'assets/js/analytics.js',
                        'assets/css/all-ie-only.css',
                        'assets/css/ie7.css',
                        'assets/css/ie8.css',
                        'assets/ico/**',
                        'robots.txt',
                        'sitemap.xml'
                    ],
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'mapilary-widget/src',
                    dest: 'dist/',
                    src: ['images/*'],
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    cwd: 'bower_components/leaflet-locatecontrol/',
                    dest: 'dist/assets/css/images/',
                    src: ['**/images/*'],
                    filter: 'isFile'
                }, {
                    expand: true,
                    flatten: true,
                    cwd: 'bower_components/Leaflet.awesome-markers/',
                    dest: 'dist/assets/css/images/',
                    src: ['**/images/*'],
                    filter: 'isFile'
                }]
            }
        },
        compass: {
            dist: {
                options: {
                    httpPath: '',
                    sourcemap: true,
                    relativeAssets: true,
                    // basePath: '<%= mapilary.app %>',
                    sassDir: ['src/sass'],
                    cssDir: ['src/css'],
                    imagesDir: ['src/assets']
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
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/assets/'
                }]
            }
        },
        useminPrepare: {
            html: ['.tmp/*.html'],
            options: {
                dest: 'dist/',
                root: 'src'
            }
        },
        usemin: {
            html: ['dist/*.html'],
            css: ['dist/assets/css/**/*.css']
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '*.html',
                    dest: 'dist'
                }]
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
        cssmin: {
            minify: {
                expand: true,
                cwd: '.tmp/assets/css',
                src: ['style.pkg.css'],
                dest: 'dist/assets/css',
                ext: '.pkg.css'
          }
        },
        rev: {
            files: {
              src: ['dist/assets/css/style.pkg.css', 'dist/assets/js/app.pkg.js']
            }
        },
        targethtml: {
            dist: {
                files: {
                    '.tmp/about.html': 'src/about.html',
                    '.tmp/contact.html': 'src/contact.html',
                    '.tmp/features.html': 'src/features.html',
                    '.tmp/price.html': 'src/price.html'
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
            sass: {
                files: 'src/**/*.s[a|c]ss',
                tasks: ['compass', 'change']
            }
        }
    });

grunt.registerTask('test', ['jshint', 'qunit']);

grunt.registerTask('change', [
    'copy:prepareUsemin',
    'targethtml',
    'useminPrepare',
    'concat',
    'uglify',
    'imagemin',
    'cssmin',
    'rev',
    'copy:dist',
    'usemin',
    'htmlmin'
    ]);

grunt.registerTask('default', [
    'clean',
    'compass',
    'coffee',
    'jshint',
    'change'
    ]);
};