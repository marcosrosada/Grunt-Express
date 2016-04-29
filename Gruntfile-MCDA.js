module.exports = function (grunt) {

	require('./GruntConfig');

	grunt.config.merge({
		clean: {
			options: { force: true },			
	        mcdaAll: [ path_mcda_webapp + '*', '!' + path_mcda_webapp + '/WEB-INF/**' ],
	        mcdaTemp: [ 
        			path_mcda_webapp + 'js/scripts.js',  
        			path_mcda_webapp + 'js/scripts.port.js',
        			path_mcda_webapp + 'js/scripts.min.js', 
        			path_mcda_webapp + 'js/libs.min.js'
				]
	    },
		jshint: {
        	mcdaFiles: {
        		src: [
        			path_mcda_webdev + '/mcda/js/modules/*.js',
        			path_mcda_webdev + '/mcda/js/services/**/*.js',
        			path_mcda_webdev + '/mcda/js/controllers/**/*.js'
        		]
        	}
	    },
	    concat: {
	        mcdaScripts: {
            	src: [ 
						path_mcda_webdev + '/mcda/js/modules/app.js', 
						path_mcda_webdev + '/mcda/js/services/**/*.js',
						path_mcda_webdev + '/mcda/js/controllers/**/*.js'
            		],
            	dest: path_mcda_webapp + 'js/scripts.js'
	        },
	        mcdaLibs: {
            	src: [ 
            			path_mcda_webdev + '/mcda/js/jquery/jquery-1.10.2.min.js',
						path_mcda_webdev + '/mcda/js/jquery/jquery.easing.min.js',

						
						path_mcda_webdev + '/mcda/js/angular/angular.min.js',
						path_mcda_webdev + '/mcda/js/angular/angular-route.js',
						path_mcda_webdev + '/mcda/js/angular/angular-resource.js',
						path_mcda_webdev + '/mcda/js/angular/angular-animate.js',
						path_mcda_webdev + '/mcda/js/angular/angular-highlightjs.js',
						path_mcda_webdev + '/mcda/js/angular/angular-touch.min.js',
						path_mcda_webdev + '/mcda/js/angular/angular-sanitize.js',
						path_mcda_webdev + '/mcda/js/angular/angularjs-dropdown-multiselect.js',
						
						
						path_mcda_webdev + '/mcda/js/libs/lodash.min.js',
						path_mcda_webdev + '/mcda/js/libs/highlight.min.js',
						path_mcda_webdev + '/mcda/js/libs/ngDialog.min.js',
						path_mcda_webdev + '/mcda/js/libs/angular-input-masks/masks.js',
						path_mcda_webdev + '/mcda/js/libs/angular-locale_pt-br.js',
						path_mcda_webdev + '/mcda/js/libs/toaster.js',
						
						
						path_mcda_webdev + '/mcda/js/bootstrap/ui-bootstrap-tpls.js',
						path_mcda_webdev + '/mcda/js/bootstrap/bootstrap.min.js',
            		],
            	dest: path_mcda_webapp + 'js/libs.min.js'
	        },
	        mcdaAll: {
	            src: [
	            		path_mcda_webapp + 'js/libs.min.js',
	            		path_mcda_webapp + 'js/scripts.min.js'
	            	],
	            dest: path_mcda_webapp + 'js/app.min.js'
	        }
	    },
		removeLoggingCalls: {
        	mcdaFiles: path_mcda_webapp + 'js/scripts.js',
	        options: {
	            methods: ['log', 'info', 'assert'], 

	            strategy: function(consoleStatement) {
	                return '';
	            },
	            removeSemicolonIfPossible: true
	        }
	    },
	    replace: {
		  	mcdaPort: {
		    	src: path_mcda_webapp + 'js/scripts.js',
		    	dest: path_mcda_webapp + 'js/scripts.port.js',
		    	replacements: [{
		      		from: ':8080',
		      		to: ''
		    	}]
		  	},
		  	mcdaPathFonts: {
		    	src: path_mcda_webapp + 'css/app.css',
		    	dest: path_mcda_webapp + 'css/app.min.css',
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
	    	mcdaFiles: {
	            src: [ path_mcda_webapp + 'js/scripts.port.js'],
	            dest: path_mcda_webapp + 'js/scripts.min.js'
	        }
	    },
	    cssmin: {
	        mcdaFiles: {
	            src: [
	              path_mcda_webdev + '/mcda/css/**/**/*.css'
	            ],
	            dest: path_mcda_webapp + 'css/app.css'
	        }
	    },
	    htmlmin: {
	    	mcdaFiles: {
	    		options: {
		          removeComments: true,
		          collapseWhitespace: true
		        },
	            expand: true,
	            cwd: path_mcda_webdev + '/mcda/views/',
	            src: ['**/*.html'],
	            dest: path_mcda_webapp + 'views'
	    	}
	    },
	    copy: {
	        mcdaIndex: {
	            src: path_mcda_webdev + '/mcda/index-prod.html',
	            dest: path_mcda_webapp + 'index.html'
	        },
	        mcdaImages: {
	        	expand: true,
	        	flatten: false,
	        	cwd: path_mcda_webdev + '/mcda/images/', 
	        	src: ['**/*'], 
	        	dest: path_mcda_webapp + 'images/'
	        },
	        mcdaFonts: {
	        	expand: true,
	        	flatten: false,
	        	cwd: path_mcda_webdev + '/mcda/css/fonts/', 
	        	src: ['**/*'], 
	        	dest: path_mcda_webapp + 'css/fonts/'
	        }
	    }
	});

	grunt.registerTask('mcda', ['clean:mcdaAll', 'jshint:mcdaFiles', 'concat:mcdaScripts', 'removeLoggingCalls:mcdaFiles', 'replace:mcdaPort', 'uglify:mcdaFiles', 'concat:mcdaLibs', 'concat:mcdaAll', 'cssmin:mcdaFiles', 'replace:mcdaPathFonts', 'htmlmin:mcdaFiles', 'copy:mcdaIndex', 'copy:mcdaImages', 'copy:mcdaFonts', 'clean:mcdaTemp']);
}
