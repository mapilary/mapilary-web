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
    'grunt-contrib-imagemin',
    'grunt-contrib-htmlmin',
    'grunt-usemin',
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
                    src: [
                    '*.html',
                    ],
                    filter: 'isFile'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
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
                },
                {
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: 'bower_components/leaflet-locatecontrol/',
                    dest: 'dist/assets/css/images/',
                    src: ['**/images/*'],
                    filter: 'isFile'
                },
                {
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: 'bower_components/Leaflet.awesome-markers/',
                    dest: 'dist/assets/css/images/',
                    src: ['**/images/*'],
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
            html: ['.tmp/index.html', '.tmp/track.html'],
            options: {
                dest: 'dist/',
                root: 'src'
            }
        },
        usemin: {
            html: ['.tmp/index.html', '.tmp/track.html']
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '.tmp',
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
        uncss: {
            dist: {
                files: {
                    '.tmp/assets/css/style.pkg.css': [
                        'src/about.html',
                        'src/contact.html',
                        'src/features.html',
                        'src/index.html',
                        'src/price.html'
                    ]
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
    'targethtml',
    'useminPrepare',
    'concat',
    'uglify',
    'imagemin',
    'cssmin',
    'usemin',
    'htmlmin',
    // 'uncss',
    // 'cssmin:minify'
    ]);

grunt.registerTask('default', [
    'clean',
    'less',
    'coffee',
    'jshint',
    'change'
        // 'uglify',
        ]);
};