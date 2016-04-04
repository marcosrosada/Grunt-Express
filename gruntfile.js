module.exports = function (grunt) {

	var webdev		= "webdev/",
		webapp		= "webapp/",
		path_atr 	= '../requisito/src/main/',
		path_mcda 	= '../mcda/src/main/';

	grunt.initConfig({
		clean: {
	        /*temp: [ path_atr + webapp + 'dist/js/scripts.js', path_mcda + webapp + 'dist/js/scripts.js'],*/
	        all: [ path_atr + webapp + 'dist/']
	    },
		jshint: {	
        	atr: {
        		src: path_atr + webdev + 'atr/js/modules/*.js'
        	},
        	mcda: {
            	src: path_mcda + webdev + 'mcda/js/modules/*.js'
        	}
	    },
	    concat: {
	        atr: {
            	src: [ path_atr + webdev + 'atr/js/**/*.js' ],
            	dest: path_atr + webapp + 'dist/js/scripts.js'
	        },
	        mcda: {
	            src: [ path_mcda + webdev + 'mcda/js/**/*.js' ],
	            dest: path_mcda + webapp + 'dist/js/scripts.js'
            }
	    },
	    uglify: {
	        atr: {
	            src: [ path_atr + webapp + 'dist/js/scripts.js'],
	            dest: path_atr + webapp + 'dist/js/app.min.js'
	        },
	        mcda: {
	            src: [ path_mcda + webapp + 'dist/js/scripts.js'],
	            dest: path_mcda + webapp + 'dist/js/app.min.js'
	        }
	    },
	    cssmin: {
	        atr: {
	            src: [
	              path_atr + webdev + 'atr/css/**/**/*.css'
	            ],
	            dest: path_atr + webapp + 'dist/css/app.min.css'
	        },
	        mcda: {
	            src: [
	              path_mcda + webdev + 'mcda/css/**/**/*.css'
	            ],
	            dest: path_mcda + webapp + 'dist/css/app.min.css'
	        }
	    },
	    htmlmin: {
	    	atr: {
	    		options: {
		          removeComments: true,
		          collapseWhitespace: true
		        },
	            expand: true,
	            cwd: path_atr + webdev + 'atr/views/',
	            src: ['*.html'],
	            dest: path_atr + webapp + 'dist/views'
	    	},
	    	mcda: {
	    		options: {
		          removeComments: true,
		          collapseWhitespace: true
		        },
	            expand: true,
	            cwd: path_mcda + webdev + 'mcda/views/',
	            src: ['*.html'],
	            dest: path_mcda + webapp + 'dist/views'
	    	}
	    },
	    copy: {
	        atr: {
	            src: path_atr + webdev + 'atr/index-prod.html',
	            dest: path_atr + webapp + 'dist/index.html'
	        },
	        mcda: {
	            src: path_mcda + webdev + 'mcda/index-prod.html',
	            dest: path_mcda + webapp + 'dist/index.html'
	        }
	    },
		watch: {
			options: { 
				livereload : true 
			}
		},
		express: {
			all: {
				options: {
					port: 3000,
					hostname: 'localhost',
					bases: [ path_mcda + webapp, path_atr + webdev, path_mcda + webdev],
					livereload: true
				}
			}

		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');



	grunt.registerTask('server', ['express', 'watch']);
	grunt.registerTask('atr', ['clean:all', 'jshint:atr', 'concat:atr', 'uglify:atr', 'cssmin:atr', 'htmlmin:atr', 'copy:atr']);
	grunt.registerTask('mcda', ['clean:all', 'jshint:mcda', 'concat:mcda', 'uglify:mcda', 'cssmin:mcda', 'htmlmin:mcda', 'copy:mcda']);
}