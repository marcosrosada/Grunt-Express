module.exports = function(grunt) {

	require('./GruntConfig.js');
	require('./Gruntfile-ACAT.js')(grunt);
	require('./Gruntfile-ATR.js')(grunt);
	require('./Gruntfile-MCDA.js')(grunt);
  
	grunt.config.merge({
		
		watch: {
			options: { 
				livereload : false 
			},
			acatFiles: {
				files: path_acat_webdev + 'acat/js/**/*.js',
        		tasks: ['jshint:acatFiles']
			},
			atrFiles: {
				files: [
        			path_atr_webdev + 'atr/js/modules/**/*.js',
        			path_atr_webdev + 'atr/js/controllers/**/*.js',
        			path_atr_webdev + 'atr/js/services/**/*.js'
        		],
        		tasks: ['jshint:atrFiles']
			},
			mcdaFiles: {
				files: [
        			path_mcda_webdev + 'mcda/js/modules/**/*.js',
        			path_mcda_webdev + 'mcda/js/controllers/**/*.js',
        			path_mcda_webdev + 'mcda/js/services/**/*.js'
        		],
        		tasks: ['jshint:mcdaFiles']
			}
		},
		express: {
			all: {
				options: {
					port: 3000,
					hostname: 'localhost',
					bases: [ path_acat_webdev, path_atr_webdev, path_mcda_webdev ],
					//bases: [ path_atr_webapp, path_mcda_webapp ],
					livereload: false
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
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-remove-logging-calls');

	grunt.registerTask('server', ['express', 'watch']);
	grunt.registerTask('default', ['acat', 'atr', 'mcda']);
};
