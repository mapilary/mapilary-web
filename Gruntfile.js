module.exports = function(grunt) {

    // load tasks
    [
    'grunt-contrib-jshint',
    'grunt-contrib-watch',
    'grunt-contrib-clean',
    'grunt-contrib-copy',
    'grunt-contrib-uglify',
    'grunt-contrib-cssmin',
    'grunt-contrib-concat',
    'grunt-contrib-compass',
    'grunt-contrib-imagemin',
    'grunt-contrib-htmlmin',
    'grunt-usemin',
    'grunt-rev',
    'grunt-aws',
    'grunt-targethtml'
    ].forEach(function(task) { grunt.loadNpmTasks(task); });


    // setup init config
    grunt.initConfig({
        aws: grunt.file.readJSON('credentials.json'),
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['.tmp', 'dist'],
            dev: ['src/css']
        },
        copy: {
            prepare: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    dest: '.tmp',
                    src: ['assets/{js,css}/*']               
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    dest: 'dist',
                    src: [
                        'assets/js/analytics.js',
                        'assets/css/all-ie-only.css',
                        'assets/css/ie7.css',
                        'assets/css/ie8.css',
                        'assets/ico/**',
                        'assets/font/*',
                        'robots.txt',
                        'sitemap.xml'
                    ],
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'mapilary-widget/dist',
                    dest: 'dist',
                    src: ['images/*', 'css/widget-loader.bundle*', 'css/preload.css', 'js/widget-loader.bundle*'],
                    filter: 'isFile'
                }, {    
                    expand: true,
                    flatten: true,
                    cwd: '.tmp',
                    dest: 'dist',
                    src: ['*.html'],
                    filter: 'isFile'
                }]
            }
        },
        compass: {
            dev: {
                options: {
                    httpPath: '',
                    sourcemap: true,
                    relativeAssets: true,
                    // basePath: '<%= mapilary.app %>',
                    sassDir: ['src/sass'],
                    cssDir: ['src/css'],
                    imagesDir: ['src/assets/img'],
                }
            },
            dist: {
                options: {
                    httpPath: '',
                    sourcemap: false,
                    relativeAssets: true,
                    assetCacheBuster: false,
                    // basePath: 'dist/assets/css',
                    sassDir: ['src/sass'],
                    cssDir: ['.tmp/css'],
                    imagesDir: ['.tmp/img']
                }
            }
        },
        useminPrepare: {
            dist: ['.tmp/*.html'],
            options: {
                root: '.tmp',
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/*.html']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/assets',
                    src: ['**/*.{png,jpg,gif}', '!masterslider/**'],
                    dest: 'dist/assets'
                }]
            }
        },
        htmlmin: {
            deploy: {
                options: {
                    collapseWhitespace: true,
                    removeComments: false
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '*.html',
                    dest: 'dist'
                }]
            }
        },
        rev: {
            files: {
              src: ['dist/assets/css/style.pkg.css', 'dist/assets/js/app.pkg.js']
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
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
        targethtml: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '*.html',
                    dest: '.tmp'
                }]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['src/*.html'],
                task: ['build']
            },
            sass: {
                files: 'src/**/*.s[a|c]ss',
                tasks: ['compass:dev', 'build']
            }
        },
        s3: {
            options: {
                accessKeyId: '<%= aws.accessKeyId %>',
                secretAccessKey: '<%= aws.secretAccessKey %>',
                bucket: 'www.mapilary.com',
                region: 'eu-west-1',
                gzip: false,
                cache: false
            },
            html: {
                cwd: 'dist',
                src: ['**', '!**/*.{css,js,jpg,png,jpeg,gif}']
            },
            assets: {
                options: {
                    headers: {
                        CacheControl: 'public,max-age=31536000'
                    }
                },
                cwd: 'dist',
                src: '**/*.{css,js,jpg,png,jpeg,gif}'
            }
        }
    });

grunt.registerTask('build', [
    'copy:prepare',
    'targethtml',
    'useminPrepare',
    'imagemin',
    'concat',
    'uglify',
    'cssmin',
    'copy:dist',
    'rev',
    'usemin',
    'htmlmin:deploy'
    ]);

grunt.registerTask('default', [
    'clean:dist',
    'compass:dist',
    'jshint',
    'build'
    ]);
};