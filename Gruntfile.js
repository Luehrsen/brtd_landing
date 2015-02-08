module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
	   xpkg: require('./package.json'),

	   	/*
		 * Compile the needed less files
		 */
		less: {
			dist: {
				options: {
					compress: true,
					plugins: [
						new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
					],
				},
				files: {
					"dist/app.css": "build/less/app.less"
				}
			}
		},

		/*
		 * Join together the js files
		 */
		concat_in_order: {
			main: {
				files: {
					'dist/app.js': ['build/app.js'],
				},
				options: {
				    extractRequired: function(filepath, filecontent) {
					    var path = require('path');

				        var workingdir = path.normalize(filepath).split(path.sep);
				        workingdir.pop();

				        var deps = this.getMatches(/@depend\s"(.*\.js)"/g, filecontent);
				        deps.forEach(function(dep, i) {
				            var dependency = workingdir.concat([dep]);
				            deps[i] = path.join.apply(null, dependency);
				        });
				        return deps;
				    },
				    extractDeclared: function(filepath) {
				        return [filepath];
				    },
				    onlyConcatRequiredFiles: true
				}
			}
		},

		/*
		 * Minify the js files
		 */
		uglify: {
			dist: {
				options: {

				},
				files: {
					'dist/app.js': ['dist/app.js']
				}
			}
		},

		/*
		 * Copy needed HTML files for distribution
		 */
		copy: {
			dist: {
				files: [
					{ expand: true, cwd: 'build/', src: ['**/*.html'], dest: 'dist/', filter: 'isFile' },
				],
			},
			assets: {
				files: [
					{ expand: true, cwd: 'build/', src: ['assets/**/*'], dest: 'dist/', filter: 'isFile' },
				],
			}
		},
		/**/


		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					minifyJS: true,
				},
				expand: true,
			    cwd: 'build/',
			    src: ['**/*.html'],
			    dest: 'dist/'
			}
		},

		/*
		 * The watcher
		 */
	    watch: {
		    js: {
			    files: ['build/**/*.js'],
			    tasks: ['js'],
				options: {
					nospawn: true,
					livereload: true
				},
		    },
			less: {
				files: ['build/less/**/*.less'], // which files to watch
				tasks: ['less'],
				options: {
					nospawn: true,
					livereload: true
				},
			},
			assets: {
				files: ['build/assets/**/*'],
				tasks: ['copy:assets'],
				options: {
					nospawn: true,
					livereload: true
				},
			},
			html: {
				files: ['build/**/*.html'],
				tasks: ['htmlmin:dist'],
				options: {
					nospawn: true,
					livereload: true
				},
			},
	    },


	    /*
		 * Clean certain files
		 */
	    clean: {
		    deploy: ['dist/'],
	    },

		//
		// CODE QUALITY CHECKS
		//

		/*
		 * Check the code quality of our js files
		 */
		jshint: {
		    options: {
				reporter: require('jshint-stylish'),
				force: true,
		    },
			dist: {
				src: ['dist/**/*.min.js']
			}
		},

		/*
		 * Check the code quality of our css files
		 */
		parker: {
			options: {},
			src: [
				'dist/*.css'
			],
		},

  });

  grunt.registerTask( 'default', ['less', 'concat_in_order', 'uglify', 'htmlmin', 'copy:assets'] );
  grunt.registerTask( 'js', ['concat_in_order', 'uglify'] );
  grunt.registerTask( 'deploy', ['clean:deploy', 'less', 'concat_in_order', 'uglify', 'htmlmin', 'copy:assets'])
};

