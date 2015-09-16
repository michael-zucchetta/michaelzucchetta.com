var filesPath = "dest/files.json";
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
			}
		},
		copy: {
				files: {
					expand: true,
					cwd: 'src/',
					src: '**/*js',
					dest: 'dest/'
				}
		},
		tree: {
			options: {
			},
			js: {
				options: {
					type: ['js'],
					format: true
				},
				files: [
					{
						src: 'dest/js',
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
			all: ['dest/**/*.js']
		},
		coffee: {
			compile_with_maps: {
				options: {
					 sourceMap: true
				},
				src:  ['**/*.coffee'],
				cwd: 'src/js',
				dest: 'dest/js',
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
		'karma': {
			unit: {
				configFile: 'config/karma.unittest.conf.js'
			}
		},
		sass: {
			dist: {
				options: {
				},
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['**/*.scss'],
					dest: 'dest/',
					ext: '.css'
				}]
			}
		},
		watch: {
			coffee: {
				files: ['src/**/*.coffee'],
				tasks: 'newer:coffee'
			},
			sass: {
				files: ['src/css/**/*.scss'],
				task: 'newer:sass'
			}
			//,
			//jshint: {
			//	files: ['dest/js/**/*.js'],
			//	task: 'jshint'
			//}
		}
	});
	//Loading before the others
	grunt.loadNpmTasks('grunt-npm-install');
	
	grunt.loadNpmTasks('grunt-bower-install-simple');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-tree');
	
	grunt.registerTask('bower-install', ["bower-install-simple"]);
	
	grunt.registerTask('build-requirejs', function() {
		var dependencies = grunt.file.read(filesPath);
		dependencies = dependencies.substring(1, dependencies.length - 1).replace(/\.js/g, "");
		console.log("created dependencies files for requirejs!");
		grunt.file.write(filesPath, dependencies);
	});

	grunt.registerTask("default", ["npm-install", "bower-install", "tree", "coffee", "build-requirejs", "concat", "jsbeautifier", "copy", "sass", "jshint"]);
	grunt.registerTask("test", ["default", "karma"]);
	grunt.registerTask("dev", ["default", "watch"]);

}
