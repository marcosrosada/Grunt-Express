module.exports = function(grunt) {

	var path_atr_webapp  = '../requisito/src/main/webapp/dist/',
		path_atr_webdev  = '../requisito/src/main/webdev/',
		path_mcda_webapp = '../mcda/src/main/webapp/dist/',
		path_mcda_webdev = '../mcda/src/main/webdev/';

	require('./Gruntfile-ATR.js')(grunt);
	require('./Gruntfile-MCDA.js')(grunt);
  
	grunt.config.merge({
		
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
					//bases: [ path_atr_webdev, path_mcda_webdev ],
					bases: [ path_atr_webapp, path_mcda_webapp ],
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
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-remove-logging-calls');

	grunt.registerTask('server', ['express', 'watch']);
};
