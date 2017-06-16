'use strict'
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserSync = require('browser-sync'),
	watch = require('gulp-watch'),
	rimraf = require('rimraf'),
	rigger = require('gulp-rigger'),
	webserver = require('gulp-webserver'),
	sourcemaps = require('gulp-sourcemaps'),
	browserify = require('gulp-browserify'),
	reload = browserSync.reload;

var path = {
	build: {
		html: './build',
		js: './build/js'
	},
	src: {
		html: './*.html',
		js: './js/*.js'
	},
	clean: './build'
};

	gulp.task('default', ['build', 'webserver']);

	gulp.task('webserver', function() {
		browserSync({
			server: {
				baseDir: './build'
			},
			host: 'localhost',
			port: 8080,
			tunnel: true
		});
	});

	gulp.task('html:build', function() {
		gulp.src(path.src.html)
			.pipe(rigger())
			.pipe(gulp.dest(path.build.html))
			.pipe(reload({stream: true}));
	});

	gulp.task('js:build', function() {
		gulp.src(path.src.js)
			.pipe(browserify({}))
			.pipe(rigger())
			.pipe(sourcemaps.init())
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(path.build.js))
			.pipe(reload({stream: true}));
	});

	gulp.task('build', ['html:build', 'js:build']);

	gulp.task('clean', function(callback) {
		rimraf(path.clean, callback);
	});