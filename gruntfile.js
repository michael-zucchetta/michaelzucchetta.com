var baseSrcPath = 'src/';
var filesPath = "dist/files.json";
var tsFilesPath = "dist/tsFiles.json";
var typescriptOptions = {
	/* on version 0.8 basePath is deprecated and the author states that rootDir should be used, but it seems to be not working, so ignoring the warning for now
	*rootDir: baseSrcPath,
	*/
	basePath: baseSrcPath,
	//sourceMap: true,
	//not generating d.ts declaration: true,
	target: 'es5',
	fast: 'never',
	module: 'amd',
	inlineSourceMap: true
};

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		'bower-install-simple': {
			options: {
				color: true,
				directory: "lib"
			},
			"prod": {
				options: {
					production: true
				}
			},
			"dev": {
				options: {
					production: false
				}
			}
		},
		concat: {
			"require": {
				src: [
					'src/js/initialisation/require/pre-requirejs-bootstrap',
					'src/js/initialisation/require/requirejs-bootstrap-body-1',
					filesPath,
					'src/js/initialisation/require/requirejs-bootstrap-body-2',
					'src/js/initialisation/require/post-requirejs-bootstrap'
				],
				dest: 'src/js/initialisation/requirejs-bootstrap.js'
			},
			"require-test": {
				// karma needs a slightly differenc configuration because it serves files on /base, so two files are built with the same dependecies
				src: [
					'src/js/initialisation/require/pre-requirejs-bootstrap-test',
					'src/js/initialisation/require/requirejs-bootstrap-body-1',
					filesPath,
					'src/js/initialisation/require/requirejs-bootstrap-body-2',
					'src/js/initialisation/require/post-requirejs-bootstrap-test'
				],
				dest: 'src/js/initialisation/requirejs-bootstrap-test.js'
			},
			"build-ts": {
				src: [
					'src/js/**/*.ts'
				],
				dest: 'dist/app.ts'
			}
		},
		copy: {
				js: {
					expand: true,
					cwd: 'src/',
					src: '**/*.js',
					dest: 'dist/'
				},
				html: {
					expand: true,
					cwd: 'src/',
					src: '**/*.html',
					dest: 'dist/'
				},
				json: {
					expand: true,
					cwd: 'src/',
					src: '**/*.json',
					dest: 'dist/'
				},
				img_tests: {
					expand: true,
					cwd: 'src/tests',
					src: ['**/*.jpg', '**/*.png', '**/*.jpeg'],
					dest: 'tests/'
				}
		},
		tree: {
			options: {
				format: true
			},
			js: {
				options: {
					type: ['js']
				},
				files: [
					{
						src: ['dist/'],
						dest: filesPath
					}
				]
			}
		},
		jsbeautifier: {
			files: ['src/js/initialisation/requirejs-bootstrap.js', 'src/js/initialisation/requirejs-bootstrap-test.js'],
			options: {
				js: {
					preserveNewlines: false
				}
					
			}
		},
		jshint: {
			all: ['dist/**/*.js']
		},
		coffee: {
			compile_with_maps: {
				options: {
					sourceMap: true
				},
				src:  ['**/*.coffee', '!tests/**'],
				cwd: 'src/',
				dest: 'dist/',
				ext: '.js',
				expand: true,
				flatten: false
			},
			compile_tests_with_maps: {
				options: {
					sourceMap: true
				},
				src:  ['**/*.coffee'],
				cwd: 'src/tests',
				dest: 'tests/',
				ext: '.js',
				expand: true,
				flatten: false
			}
		},
		clean: {
			js: ["dist/**/*.js"]
		},
		"karma": {
			unit: {
				configFile: 'config/karma.unittest.conf.js'
			},
			"unit-ts": {
				configFile: 'config/karma.unittest.ts.conf.js'
			}
		},
		protractor: {
			e2e: {
				configFile: 'config/protractor.e2e.conf.js'
			}
		},
		sass: {
			dest: {
				options: {
					compass: true
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.scss'],
					dest: 'dist/',
					ext: '.css'
				}]
			}
		},
		watch: {
			coffee: {
				files: ['src/**/*.coffee'],
				tasks: 'newer:coffee',
				options: {
					event: ['changed', 'deleted']
				}
			},
			coffee_after_creation: {
				files: ['src/**/*.coffee'],
				tasks: ['newer:coffee', 'build-requirejs', 'concat', 'jsbeautifier', 'newer:copy:json'],
				options: {
					event: ['added']
				}
			},
			sass_after_creation: {
				files: ['src/**/*.sass'],
				tasks: ['newer:sass:dest'],
				options: {
					event: ['added']
				}
			},
			coffee_test: {
				files: ['src/tests/*.coffee'],
				tasks: ['newer:compile_tests_with_maps'],
				options: {
					event: ['added', 'changed']
				}
			},
			sass_watch: {
				files: ['src/**/*.scss'],
				tasks: ['newer:sass:dest'],
				options: {
					event: ['changed', 'deleted']
				}
			},
			json_html: {
				files: ['src/**/*.json'],
				tasks: ['newer:copy:json'],			
				options: {
					event: ['changed', 'added', 'deleted']
				}
			},
			copy_html: {
				files: ['src/**/*.html'],
				tasks: ['newer:copy:html'],			
				options: {
					event: ['changed', 'added', 'deleted']
				}
			},
			jshint: {
				files: ['dist/js/**/*.js'],
				task: 'newer:jshint',
				options: {
					event: ['changed', 'added', 'deleted']
				}
			}
		},
		ts: {
			compile_with_maps: {
				files: [{
					src: ['dist/**/*.ts', '!' + baseSrcPath + 'tests/**/*.ts'],
					dest: 'dist/',
				}],
				options: typescriptOptions
			},
			compile_tests_with_maps: {
				files: [{
					src: [baseSrcPath + 'tests/**/*.ts'],
					dest: 'tests/',
				}],
				options: typescriptOptions
			}
		}
	});
	//Loading before the others
	grunt.loadNpmTasks('grunt-npm-install');
	grunt.loadNpmTasks('grunt-bower-install-simple');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-tree');
	grunt.loadNpmTasks('grunt-ts');
	
	grunt.registerTask('bower-install', ["bower-install-simple"]);
	
	grunt.registerTask('build-requirejs', function() {
		var dependencies = grunt.file.read(filesPath);
		dependencies = dependencies.substring(1, dependencies.length - 1).replace(/\.js/g, "");
		console.log("created dependencies files for requirejs!");
		grunt.file.write(filesPath, dependencies);
	});

	grunt.registerTask("default", [/*"npm-install", "bower-install", "clean",*/ "tree", "coffee", "build-requirejs", "concat", "jsbeautifier", "copy", "sass"/*, "jshint"*/]);
	grunt.registerTask("test", ["default", "karma"]);
	grunt.registerTask("dev", ["default", "watch"]);

}
