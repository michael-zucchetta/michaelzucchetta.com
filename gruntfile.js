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
					'src/js/initialisation/require/requirejs-bootstrap-body',
					'src/js/initialisation/require/post-requirejs-bootstrap',
				],
				dest: 'src/js/initialisation/requirejs-bootstrap.js'
			},
			"require-test": {
				// karma needs a slightly differenc configuration because it serves files on /base, so two files are built with the same dependecies
				src: [
					'src/js/initialisation/require/pre-requirejs-bootstrap-test',
					'src/js/initialisation/require/requirejs-bootstrap-body',
					'src/js/initialisation/require/post-requirejs-bootstrap-test',
				],
				dest: 'src/js/initialisation/requirejs-bootstrap-test.js'
			}
		},
		'karma': {
			unit: {
				configFile: 'config/karma.unittest.conf.js'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-npm-install');
	grunt.loadNpmTasks('grunt-bower-install-simple');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-karma');
	
	grunt.registerTask("bower-install", ["bower-install-simple"]);
	
	
	grunt.registerTask("default", ["npm-install", "bower-install", "concat", "karma"]);
}
