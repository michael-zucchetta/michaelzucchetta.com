var baseSrcPath = "src/";
var filesPath = "dist/files.json";
var tsFilesPath = "dist/tsFiles.json";

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		"bower-install-simple": {
			options: {
				color: true,
				directory: "lib"
			},
			"prod": {
				options: {
					production: true
				}
			}
		},
		concurrent: {
			debug: ['watch:sass', 'watch:html', 'watch:json', 'webpack-dev-server'],
			options: {
				logConcurrentOutput: true,
			},
		},
		instrument: {
			ignore: [],                   /* [1] */
			files: [
			{
				src: 'src/**/*.js',       /* [2] */
				expand: true,
				cwd: 'lib',           /* [3] */
				dest: 'test/src'      /* [4] */
			}
			]
		},
		report: {
			reports: ['html', 'text-summary'],    /* [5] */
			dest: 'coverage'                      /* [6] */
		},
		concat: {
			"build-ts": {
				src: [
					"dist/js/**/*.js",
					"dist/directives/**/*.js"
				],
				dest: "dist/app.js"
			},
			"build-libs": {
				src: [
					"lib/jquery/dist/jquery.min.js",
					"lib/lodash/lodash.js",
					"lib/angular/angular.min.js",
					"lib/angular-route/angular-route.min.js",
					"lib/angular-css/angular-css.min.js"
				],
				dest: "dist/libs.js"
			}
		},
		copy: {
			html: {
				expand: true,
				cwd: "src/",
				src: "**/*.html",
				dest: "dist/"
			},
			json: {
				expand: true,
				cwd: "src/",
				src: "**/*.json",
				dest: "dist/"
			},
			img_tests: {
				expand: true,
				cwd: "src/tests",
				src: ["**/*.jpg", "**/*.png", "**/*.jpeg"],
				dest: "tests/"
			}
		},
		jshint: {
			all: ["dist/**/*.js"]
		},
		clean: {
			js: ["dist/**/*.js"]
		},
		"karma": {
			"unit-ts": {
				configFile: "config/karma.unittest.ts.conf.js"
			}
		},
    run: {
      "webpack-dev": {
        cmd: 'npm',
        args: ['run', 'dev'],
      }
    },
    protractor: {
			e2e: {
				configFile: "config/protractor.e2e.conf.js"
			}
		},
		sass: {
			dest: {
				options: {
					compass: true
				},
				files: [{
					expand: true,
					cwd: "src/",
					src: ["**/*.scss"],
					dest: "dist/",
					ext: ".css"
				}]
			}
		},
		watch: {
			ts: {
				files: ["src/**/*.ts"],
				tasks: ["newer:ts:main", "concat:build-ts", "tslint"],
				options: {
					event: ["changed", "deleted", "newer"]
				}
			},
			sass_added: {
				files: ["src/**/*.sass"],
				tasks: ["newer:sass:dest"],
				options: {
					event: ["added"]
				}
			},
			sass: {
				files: ["src/**/*.scss"],
				tasks: ["newer:sass:dest"],
				options: {
					event: ["changed", "deleted"]
				}
			},
			json: {
				files: ["src/**/*.json"],
				tasks: ["newer:copy:json"],			
				options: {
					event: ["changed", "added", "deleted"]
				}
			},
			html: {
				files: ["src/**/*.html"],
				tasks: ["newer:copy:html"],			
				options: {
					event: ["changed", "added", "deleted"]
				}
			}
		},
		ts: {
			main: {
				files: [{
					src: [baseSrcPath + "**/*.ts"], 
					dest: "dist/"
				}],
				tsconfig: true
			}
		},
		"typings": {
			install: {}
		},
		"tslint": {
			options: {
				configuration: "tslint.json"
			},
			files: {
				src: ["src/**/*.ts"]
			}
		},
		webpack: {
			options: require("./webpack.config.js"),
			start: {
				keepalive: true,
				inline: true,
				failOnError: false,
				watch: true,
			},
		},
		"webpack-dev-server": {
			options: {
        			webpack: require("./webpack.config.js"),
				contentBase: 'dist/',
				port: 12310,
				host: 'localhost',
			},
			start: {
				keepalive: true,
				hot: true,
				failOnError: false,
				inline: true,
			}, 
		},
	});
	//Loading before the others
	grunt.loadNpmTasks("grunt-npm-install");
	grunt.loadNpmTasks("grunt-bower-install-simple");
	grunt.loadNpmTasks("grunt-contrib-coffee");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-concurrent");
	grunt.loadNpmTasks("grunt-istanbul");
	grunt.loadNpmTasks("grunt-karma");
	grunt.loadNpmTasks("grunt-newer");
	grunt.loadNpmTasks("grunt-protractor-runner");
	grunt.loadNpmTasks("grunt-run");
	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks("grunt-tslint");
	grunt.loadNpmTasks("grunt-typings");
	grunt.loadNpmTasks('grunt-webpack');

	grunt.registerTask("bower-install", function() {
		grunt.task.run(["bower-install-simple"]);
	});

	grunt.registerTask("build-requirejs", function() {
		var dependencies = grunt.file.read(filesPath);
		dependencies = dependencies.substring(1, dependencies.length - 1).replace(/\.js/g, "");
		console.log("created dependencies files for requirejs!");
		grunt.file.write(filesPath, dependencies);
	});

	grunt.registerTask("compile-and-lint", function() {
		grunt.task.run(["ts", "tslint"]);
	});

	grunt.registerTask("test", ["default", "karma"]);
	grunt.registerTask("dev", ["default", "watch"]);
	// grunt.registerTask("default", ["bower-install", "typings", "copy", "sass", "clean", "ts", "watch"]);
	grunt.registerTask("default", ["bower-install", "clean", "copy", "sass", "concurrent"]);
}
