module.exports = function (grunt) {

	var path_mcda_webapp = '../mcda/src/main/webapp/dist/mcda/',
		path_mcda_webdev = '../mcda/src/main/webdev/mcda/';

	grunt.config.merge({
		clean: {
			options: { force: true },
	        mcdaAll: path_mcda_webapp,
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
        			path_mcda_webdev + 'js/modules/*.js',
        			path_mcda_webdev + 'js/services/**/*.js',
        			path_mcda_webdev + 'js/controllers/**/*.js'
        		]
        	}
	    },
	    concat: {
	        mcdaScripts: {
            	src: [ 
						path_mcda_webdev + 'js/modules/app.js', 
						path_mcda_webdev + 'js/services/**/*.js',
						path_mcda_webdev + 'js/controllers/**/*.js'
            		],
            	dest: path_mcda_webapp + 'js/scripts.js'
	        },
	        mcdaLibs: {
            	src: [ 
            			path_mcda_webdev + 'js/jquery/jquery-1.10.2.min.js',
						path_mcda_webdev + 'js/jquery/jquery.easing.min.js',

						
						path_mcda_webdev + 'js/angular/angular.min.js',
						path_mcda_webdev + 'js/angular/angular-route.js',
						path_mcda_webdev + 'js/angular/angular-resource.js',
						path_mcda_webdev + 'js/angular/angular-animate.js',
						path_mcda_webdev + 'js/angular/angular-highlightjs.js',
						path_mcda_webdev + 'js/angular/angular-touch.min.js',
						path_mcda_webdev + 'js/angular/angular-sanitize.js',
						path_mcda_webdev + 'js/angular/angularjs-dropdown-multiselect.js',
						
						
						path_mcda_webdev + 'js/libs/lodash.min.js',
						path_mcda_webdev + 'js/libs/highlight.min.js',
						path_mcda_webdev + 'js/libs/ngDialog.min.js',
						path_mcda_webdev + 'js/libs/angular-input-masks/masks.js',
						path_mcda_webdev + 'js/libs/angular-locale_pt-br.js',
						path_mcda_webdev + 'js/libs/toaster.js',
						
						
						path_mcda_webdev + 'js/bootstrap/ui-bootstrap-tpls.js',
						path_mcda_webdev + 'js/bootstrap/bootstrap.min.js',
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
		      		to: ':8080'
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
	              path_mcda_webdev + 'css/**/**/*.css'
	            ],
	            dest: path_mcda_webapp + 'css/app.min.css'
	        }
	    },
	    htmlmin: {
	    	mcdaFiles: {
	    		options: {
		          removeComments: true,
		          collapseWhitespace: true
		        },
	            expand: true,
	            cwd: path_mcda_webdev + 'views/',
	            src: ['**/*.html'],
	            dest: path_mcda_webapp + 'views'
	    	}
	    },
	    copy: {
	        mcdaIndex: {
	            src: path_mcda_webdev + 'index-prod.html',
	            dest: path_mcda_webapp + 'index.html'
	        },
	        mcdaImages: {
	        	expand: true,
	        	flatten: false,
	        	cwd: path_mcda_webdev + 'images/', 
	        	src: ['**/*'], 
	        	dest: path_mcda_webapp + 'images/'
	        }
	    }
	});

	grunt.registerTask('mcda', ['clean:mcdaAll', 'jshint:mcdaFiles', 'concat:mcdaScripts', 'removeLoggingCalls:mcdaFiles', 'replace:mcdaPort', 'uglify:mcdaFiles', 'concat:mcdaLibs', 'concat:mcdaAll', 'cssmin:mcdaFiles', 'htmlmin:mcdaFiles', 'copy:mcdaIndex', 'copy:mcdaImages', 'clean:mcdaTemp']);
}
