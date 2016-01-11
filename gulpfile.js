var gulp          = require('gulp'),
    plumber       = require('gulp-plumber'),
    compass       = require('gulp-compass'),
    prefixer      = require('gulp-autoprefixer'),
    uglify        = require('gulp-uglify'),
    imagemin      = require('gulp-imagemin'),
    newer         = require('gulp-newer'),
    browserSync   = require('browser-sync'),
    childProgress = require('child_process'),
    path          = require('path');


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function(done) {

    return childProgress.spawn('jekyll', ['build'], {stdio: 'inherit'})
            .on('close', done);
});



/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    
	browserSync.reload();
});



/**
 * Wait for jekyll-build, launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
	browserSync.init({
		server: {
			baseDir: '_site'
		}
	});
});



/**
 * Compile sass
 */
gulp.task('sass', function(){
		gulp.src('src/sass/**/*.{sass}')
        .pipe(plumber())
		.pipe(compass({
            project: path.join(__dirname),
            css: 'assets/css',
            sass: 'src/sass',
            sourcemap: false,
            style: 'compressed'
        }))
        .pipe(prefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(gulp.dest('_site/assets/css'))
		.pipe(browserSync.reload({stream:true}))
		.pipe(gulp.dest('assets/css'));
});



/**
 * Compile js
 */
gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});




/**
 * Compile img
 */
gulp.task('imagemin', function() {
	return gulp.src('src/img/**/*.{jpg,png,gif}')
		.pipe(plumber())
        .pipe(newer('src/img/**/*.{jpg,png,gif}'))
		.pipe(imagemin({ 
            optimizationLevel: 5, 
            progressive: true, 
            interlaced: true 
        }))
		.pipe(gulp.dest('assets/img/'));
});


/**
 * Watch files for changes
 */
gulp.task('watch', function () {
	gulp.watch('src/sass/**/*.sass', ['sass','jekyll-rebuild']);
	gulp.watch('src/js/**/*.js', ['js','jekyll-rebuild']);
    gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin','jekyll-rebuild'])
	gulp.watch(['**/*.html','index.html', '_includes/*.html', '_layouts/*.html'], ['jekyll-rebuild']);
});

/**
 *  Default task
 */
gulp.task('default', ['js', 'sass', 'browser-sync', 'imagemin', 'watch']);










