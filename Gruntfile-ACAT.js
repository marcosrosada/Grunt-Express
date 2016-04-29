module.exports = function (grunt) {

	
	require('./GruntConfig');

	grunt.config.merge({
		clean: {
			options: { force: true },
	        acatAll: [ path_acat_webapp + '*', '!' + path_acat_webapp + '/WEB-INF/**' ],
	        acatTemp: [ 
        			path_acat_webapp + 'js/scripts.js', 
        			path_acat_webapp + 'js/scripts.port.js', 
        			path_acat_webapp + 'js/scripts.min.js', 
        			path_acat_webapp + 'js/libs.min.js', 
        			path_acat_webapp + 'css/app.css'
				]
	    },
		jshint: {
        	acatFiles: {
        		src: path_acat_webdev + 'acat/js/**/*.js'
        	}
	    },
	    concat: {
	        acatScripts: {
            	src: [ 
						path_acat_webdev + 'acat/js/app.js',
						path_acat_webdev + 'acat/js/controllers/**/*.js',
						path_acat_webdev + 'acat/js/services/**/*.js',
						path_acat_webdev + 'acat/js/config/**/*.js',
						path_acat_webdev + 'acat/js/filters/**/*.js',
						path_acat_webdev + 'acat/js/directives/**/*.js'
            		],
            	dest: path_acat_webapp + 'js/scripts.js'
	        },
	        acatLibs: {
            	src: [ 
            			path_acat_webdev + 'bower_components/angular/angular.min.js'
					],
            	dest: path_acat_webapp + 'js/libs.min.js'
	        },
	        acatAll: {
	            src: [
	            		path_acat_webapp + 'js/libs.min.js',
	            		path_acat_webapp + 'js/scripts.min.js'
	            	],
	            dest: path_acat_webapp + 'js/app.min.js'
	        }
	    },
		removeLoggingCalls: {
        	acatFiles: path_acat_webapp + 'js/scripts.js',
	        options: {
	            methods: ['log', 'info', 'assert'], 

	            strategy: function(consoleStatement) {
	                return '';
	            },
	            removeSemicolonIfPossible: true
	        }
	    },
		replace: {
		  	acatPort: {
		    	src: path_acat_webapp + 'js/scripts.js',
		    	dest: path_acat_webapp + 'js/scripts.port.js',
		    	replacements: [{
		      		from: ':8080',
		      		to: ''
		    	}]
		  	},
		  	acatPathFonts: {
		    	src: path_acat_webapp + 'css/app.css',
		    	dest: path_acat_webapp + 'css/app.min.css',
		    	replacements: [{
		      		from: '../fonts',
		      		to: 'fonts'
		    	}]
		  	}
		},
	    uglify: {
	    	options: {
		      mangle: false,
		      compress: {
		        drop_console: false
		      }
		    },
	    	acatFiles: {
	            src: path_acat_webapp + 'js/scripts.port.js',
	            dest: path_acat_webapp + 'js/scripts.min.js'
	        }
	    },
	    cssmin: {
	        acatFiles: {
	            src: [
	              path_acat_webdev + 'acat/css/**/*.css'
	            ],
	            dest: path_acat_webapp + 'css/app.css'
	        }
	    },
	    htmlmin: {
	    	acatFiles: {
	    		options: {
		          removeComments: true,
		          collapseWhitespace: true
		        },
	            expand: true,
	            cwd: path_acat_webdev + 'acat/views/',
	            src: ['**/*.html'],
	            dest: path_acat_webapp + 'views'
	    	}
	    },
	    copy: {			
	        acatIndex: {
	            src: path_acat_webdev + 'acat/index-prod.html',
	            dest: path_acat_webapp + 'index.html'
	        },
			acatSecure: {
				expand: true,
	        	cwd: path_acat_webdev + 'acat/secure/', 
	        	src: ['**/*.html'],
	            dest: path_acat_webapp + 'secure'
	        },
	        acatImages: {
	        	expand: true,
	        	flatten: false,
	        	cwd: path_acat_webdev + 'acat/image/', 
	        	src: ['**/*'], 
	        	dest: path_acat_webapp + 'image/'
	        },
	        acatFonts: {
	        	expand: true,
	        	flatten: false,
	        	cwd: path_acat_webdev + 'acat/css/fonts/', 
	        	src: ['**/*'], 
	        	dest: path_acat_webapp + 'css/fonts/'
	        }
	    }
	});

	grunt.registerTask('acat', ['clean:acatAll', 'jshint:acatFiles', 'concat:acatScripts', 'removeLoggingCalls:acatFiles', 'replace:acatPort', 'uglify:acatFiles', 'concat:acatLibs', 'concat:acatAll', 'cssmin:acatFiles', 'replace:acatPathFonts', 'htmlmin:acatFiles', 'copy:acatIndex', 'copy:acatSecure', 'copy:acatImages', 'copy:acatFonts','clean:acatTemp']);
}
