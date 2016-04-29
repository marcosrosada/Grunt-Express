module.exports = function (grunt) {

	
	require('./GruntConfig');

	grunt.config.merge({
		clean: {
			options: { force: true },
	        atrAll: [ path_atr_webapp + '*', '!' + path_atr_webapp + '/WEB-INF/**' ],
	        atrTemp: [ 
        			path_atr_webapp + 'js/scripts.js', 
        			path_atr_webapp + 'js/scripts.port.js', 
        			path_atr_webapp + 'js/scripts.min.js', 
        			path_atr_webapp + 'js/libs.min.js', 
        			path_atr_webapp + 'css/app.css'
				]
	    },
		jshint: {
        	atrFiles: {
        		src: [
        			path_atr_webdev + 'atr/js/modules/**/*.js',
        			path_atr_webdev + 'atr/js/controllers/**/*.js',
        			path_atr_webdev + 'atr/js/services/**/*.js'
        		]
        	}
	    },
	    concat: {
	        atrScripts: {
            	src: [ 
						path_atr_webdev + 'atr/js/modules/app.js',
            		   	path_atr_webdev + 'atr/js/modules/form-input-data.js',						
						path_atr_webdev + 'atr/js/modules/universe-elements.js',	
						path_atr_webdev + 'atr/js/modules/project.js',
						path_atr_webdev + 'atr/js/modules/header.js', 
						path_atr_webdev + 'atr/js/services/**/*.js',
						path_atr_webdev + 'atr/js/controllers/**/*.js'
            		],
            	dest: path_atr_webapp + 'js/scripts.js'
	        },
	        atrLibs: {
            	src: [ 
            			path_atr_webdev + 'atr/js/Chart.js',		
						path_atr_webdev + 'atr/js/jquery/jquery.min.js',
						path_atr_webdev + 'atr/js/jquery/jquery-ui.min.js',
						
						path_atr_webdev + 'atr/js/angular/angular.min.js',						
						path_atr_webdev + 'atr/js/angular/angular-resource.js',
						path_atr_webdev + 'atr/js/angular/angular-route.js',
						path_atr_webdev + 'atr/js/angular/angular-filter.js',
						path_atr_webdev + 'atr/js/angular/angular-animate.js',
						path_atr_webdev + 'atr/js/angular/angularjs-dropdown-multiselect.js',
						path_atr_webdev + 'atr/js/angular/angular-highlightjs.js',
						path_atr_webdev + 'atr/js/angular/angularjs-dropdown-multiselect-custom.js',
						path_atr_webdev + 'atr/js/angular/angularjs-dropdown-multiselect-auto-complete.js',
						path_atr_webdev + 'atr/js/angular/angularjs-dropdown-multiselect-docs.js',		
						
						path_atr_webdev + 'atr/js/libs/ngDialog.min.js',
						path_atr_webdev + 'atr/js/libs/angular-chart.js',
						path_atr_webdev + 'atr/js/libs/lodash.min.js',
						path_atr_webdev + 'atr/js/libs/highlight.min.js',
						path_atr_webdev + 'atr/js/libs/angular-ui-tree.js',
						path_atr_webdev + 'atr/js/libs/widgets/module.js',
						path_atr_webdev + 'atr/js/libs/widgets/jqdialog.js',		
						path_atr_webdev + 'atr/js/libs/angular-tooltips.min.js',
						path_atr_webdev + 'atr/js/libs/toaster.js',					
						
						path_atr_webdev + 'atr/js/bootstrap/bootstrap.min.js',	
						path_atr_webdev + 'atr/js/bootstrap/ui-bootstrap-tpls-0.9.0.min.js'
            		],
            	dest: path_atr_webapp + 'js/libs.min.js'
	        },
	        atrAll: {
	            src: [
	            		path_atr_webapp + 'js/libs.min.js',
	            		path_atr_webapp + 'js/scripts.min.js'
	            	],
	            dest: path_atr_webapp + 'js/app.min.js'
	        }
	    },
		removeLoggingCalls: {
        	atrFiles: path_atr_webapp + 'js/scripts.js',
	        options: {
	            methods: ['log', 'info', 'assert'], 

	            strategy: function(consoleStatement) {
	                return '';
	            },
	            removeSemicolonIfPossible: true
	        }
	    },
		replace: {
		  	atrPort: {
		    	src: path_atr_webapp + 'js/scripts.js',
		    	dest: path_atr_webapp + 'js/scripts.port.js',
		    	replacements: [{
		      		from: ':8080',
		      		to: ''
		    	}]
		  	},
		  	atrPathFonts: {
		    	src: path_atr_webapp + 'css/app.css',
		    	dest: path_atr_webapp + 'css/app.min.css',
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
	    	atrFiles: {
	            src: path_atr_webapp + 'js/scripts.port.js',
	            dest: path_atr_webapp + 'js/scripts.min.js'
	        }
	    },
	    cssmin: {
	        atrFiles: {
	            src: [
	              path_atr_webdev + 'atr/css/**/**/*.css'
	            ],
	            dest: path_atr_webapp + 'css/app.css'
	        }
	    },
	    htmlmin: {
	    	atrFiles: {
	    		options: {
		          removeComments: true,
		          collapseWhitespace: true
		        },
	            expand: true,
	            cwd: path_atr_webdev + 'atr/views/',
	            src: ['**/*.html'],
	            dest: path_atr_webapp + 'views'
	    	}
	    },
	    copy: {			
	        atrIndex: {
	            src: path_atr_webdev + 'atr/index-prod.html',
	            dest: path_atr_webapp + 'index.html'
	        },
			atrSecure: {
				expand: true,
	        	cwd: path_atr_webdev + 'atr/secure/', 
	        	src: ['**/*.html'],
	            dest: path_atr_webapp + 'secure'
	        },
	        atrImages: {
	        	expand: true,
	        	flatten: false,
	        	cwd: path_atr_webdev + 'atr/image/', 
	        	src: ['**/*'], 
	        	dest: path_atr_webapp + 'image/'
	        },
	        atrFonts: {
	        	expand: true,
	        	flatten: false,
	        	cwd: path_atr_webdev + 'atr/css/fonts/', 
	        	src: ['**/*'], 
	        	dest: path_atr_webapp + 'css/fonts/'
	        }
	    }
	});

	grunt.registerTask('atr', ['clean:atrAll', 'jshint:atrFiles', 'concat:atrScripts', 'removeLoggingCalls:atrFiles', 'replace:atrPort', 'uglify:atrFiles', 'concat:atrLibs', 'concat:atrAll', 'cssmin:atrFiles', 'replace:atrPathFonts', 'htmlmin:atrFiles', 'copy:atrIndex', 'copy:atrSecure', 'copy:atrImages', 'copy:atrFonts','clean:atrTemp']);
}
