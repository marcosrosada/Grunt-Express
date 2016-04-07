module.exports = function (grunt) {

	var path_atr_webapp = '../requisito/src/main/webapp/dist/atr/',
		path_atr_webdev = '../requisito/src/main/webdev/atr/';

	grunt.config.merge({
		clean: {
			options: { force: true },
	        atrAll: path_atr_webapp,
	        atrTemp: [ 
        			path_atr_webapp + 'js/scripts.js', 
        			path_atr_webapp + 'js/scripts.port.js', 
        			path_atr_webapp + 'js/scripts.min.js', 
        			path_atr_webapp + 'js/libs.min.js'
				]
	    },
		jshint: {
        	atrFiles: {
        		src: [
        			path_atr_webdev + 'js/modules/**/*.js',
        			path_atr_webdev + 'js/controllers/**/*.js',
        			path_atr_webdev + 'js/services/**/*.js'
        		]
        	}
	    },
	    concat: {
	        atrScripts: {
            	src: [ 
						path_atr_webdev + 'js/modules/app.js',
            		   	path_atr_webdev + 'js/modules/form-input-data.js',						
						path_atr_webdev + 'js/modules/universe-elements.js',	
						path_atr_webdev + 'js/modules/project.js',
						path_atr_webdev + 'js/modules/header.js', 
						path_atr_webdev + 'js/services/**/*.js',
						path_atr_webdev + 'js/controllers/**/*.js'
            		],
            	dest: path_atr_webapp + 'js/scripts.js'
	        },
	        atrLibs: {
            	src: [ 
            			path_atr_webdev + 'js/Chart.js',		
						path_atr_webdev + 'js/jquery/jquery.min.js',
						path_atr_webdev + 'js/jquery/jquery-ui.min.js',
						
						path_atr_webdev + 'js/angular/angular.min.js',						
						path_atr_webdev + 'js/angular/angular-resource.js',
						path_atr_webdev + 'js/angular/angular-route.js',
						path_atr_webdev + 'js/angular/angular-filter.js',
						path_atr_webdev + 'js/angular/angular-animate.js',
						path_atr_webdev + 'js/angular/angularjs-dropdown-multiselect.js',
						path_atr_webdev + 'js/angular/angular-highlightjs.js',
						path_atr_webdev + 'js/angular/angularjs-dropdown-multiselect-custom.js',
						path_atr_webdev + 'js/angular/angularjs-dropdown-multiselect-auto-complete.js',
						path_atr_webdev + 'js/angular/angularjs-dropdown-multiselect-docs.js',		
						
						path_atr_webdev + 'js/libs/ngDialog.min.js',
						path_atr_webdev + 'js/libs/angular-chart.js',
						path_atr_webdev + 'js/libs/lodash.min.js',
						path_atr_webdev + 'js/libs/highlight.min.js',
						path_atr_webdev + 'js/libs/angular-ui-tree.js',
						path_atr_webdev + 'js/libs/widgets/module.js',
						path_atr_webdev + 'js/libs/widgets/jqdialog.js',		
						path_atr_webdev + 'js/libs/angular-tooltips.min.js',
						path_atr_webdev + 'js/libs/toaster.js',					
						
						path_atr_webdev + 'js/bootstrap/bootstrap.min.js',	
						path_atr_webdev + 'js/bootstrap/ui-bootstrap-tpls-0.9.0.min.js'
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
		replace: {
		  	atrPort: {
		    	src: path_atr_webapp + 'js/scripts.js',
		    	dest: path_atr_webapp + 'js/scripts.port.js',
		    	replacements: [{
		      		from: ':8080',
		      		to: ''
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
	              path_atr_webdev + 'css/**/**/*.css'
	            ],
	            dest: path_atr_webapp + 'css/app.min.css'
	        }
	    },
	    htmlmin: {
	    	atrFiles: {
	    		options: {
		          removeComments: true,
		          collapseWhitespace: true
		        },
	            expand: true,
	            cwd: path_atr_webdev + 'views/',
	            src: ['**/*.html'],
	            dest: path_atr_webapp + 'views'
	    	}
	    },
	    copy: {
	        atrIndex: {
	            src: path_atr_webdev + 'index-prod.html',
	            dest: path_atr_webapp + 'index.html'
	        },
	        atrImages: {
	        	expand: true,
	        	flatten: false,
	        	cwd: path_atr_webdev + 'image/', 
	        	src: ['**/*'], 
	        	dest: path_atr_webapp + 'image/'
	        }
	    }
	});

	grunt.registerTask('atr', ['clean:atrAll', 'jshint:atrFiles', 'concat:atrScripts', 'replace:atrPort', 'uglify:atrFiles', 'concat:atrLibs', 'concat:atrAll', 'cssmin:atrFiles', 'htmlmin:atrFiles', 'copy:atrIndex', 'copy:atrImages', 'clean:atrTemp']);
}
