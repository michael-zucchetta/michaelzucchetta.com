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
					'src/files.json',
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
					'src/files.json',
					'src/js/initialisation/require/requirejs-bootstrap-body-2',
					'src/js/initialisation/require/post-requirejs-bootstrap-test'
				],
				dest: 'src/js/initialisation/requirejs-bootstrap-test.js'
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
						src: 'src/js',
						dest: 'src/files.json'
					}
				]
			}
		},
		jsbeautifier: {
			files: ['src/js/initialisation/requirejs-bootstrap.js', 'src/js/initialisation/requirejs-bootstrap-test.js']
		},
		coffee: {
			compile: {
				files: {
					'src/js/example/result.js': 'src/js/example/source.coffee', // 1:1 compile 
				}
			}
		},
		'karma': {
			unit: {
				configFile: 'config/karma.unittest.conf.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-npm-install');
	grunt.loadNpmTasks('grunt-tree');
	grunt.loadNpmTasks('grunt-bower-install-simple');
	grunt.loadNpmTasks('grunt-jsbeautifier');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-karma');
	grunt.registerTask('bower-install', ["bower-install-simple"]);
	
	grunt.registerTask('build-requirejs', function() {
		var dependencies = grunt.file.read('src/files.json');
		dependencies = dependencies.substring(1, dependencies.length - 1).replace(/\.js/g, "");
		console.log("created dependencies files for requirejs!");
		grunt.file.write('src/files.json', dependencies);
	});

	grunt.registerTask("default", ["npm-install", "bower-install", "tree", "build-requirejs", "concat", "jsbeautifier", "coffee", "karma"]);
}
