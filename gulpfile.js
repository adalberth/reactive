/*
 * Import
 * --------------------------------------------------
 */
var gulp = 			require('gulp');
var gutil = 		require('gulp-util');
var sourcemaps = 	require('gulp-sourcemaps');
var livereload = 	require('gulp-livereload');
var source = 		require('vinyl-source-stream');
var buffer = 		require('vinyl-buffer');
var watchify = 		require('watchify');
var browserify = 	require('browserify');
var autoprefixer = 	require('gulp-autoprefixer');
var sourcemaps = 	require('gulp-sourcemaps');
var uglify = 		require('gulp-uglify');
var sass = 			require('gulp-sass');
var minifyCSS = 	require('gulp-minify-css');
var cssGlobbing = 	require('gulp-css-globbing');
var base64 = 		require('gulp-base64');	
var babelify =    	require('babelify');
var stringify =   	require('stringify');
var git = 			require('git-rev');

/*
 * Settings
 * --------------------------------------------------
 */
var settings = {
	build: './build',
	source: './assets',
	components: './includes/components'
};

/*
 * Bundler
 * --------------------------------------------------
 */
var bundler = watchify(browserify({
        entries: [settings.source + '/js/index.js'],
        paths: ['./node_modules', settings.source + '/js/', settings.components + '/']
    }).transform(babelify)
);
/*
var bundler = browserify({
        entries: [settings.source + '/js/index.js'],
        paths: ['./node_modules', settings.source + '/js/', settings.components + '/']
    }
);
*/

/*
 * JS
 * --------------------------------------------------
 */
gulp.task('js', function(){
	gulp.start('jsDev');
	/*git.branch(function (branch) {
		switch (branch){
			case 'master':
				gulp.start('jsMaster');
			break;
			default:
				gulp.start('jsDev');
		}
	});*/
});

gulp.task('jsDev', function(){
	return bundler
	/*.transform(stringify, {
		appliesTo: { includeExtensions: ['.html', '.svg'] },
		minify: true
     })*/
	.bundle()
	.on('error', function(err){ console.log(err.message); this.emit('end');})
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(gulp.dest(settings.build + '/js'))
	.pipe(livereload());
});

gulp.task('jsMaster', function(){
	return bundler
	.transform(stringify, {
		appliesTo: { includeExtensions: ['.html', '.svg'] },
		minify: true
     })
	.transform(babelify)
	.bundle()
	.on('error', function(err){ console.log(err.message); this.emit('end');})
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(uglify())
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(settings.build + '/js'))
	.pipe(livereload());
});


/*
 * SCSS
 * --------------------------------------------------
 */
gulp.task('scss', function () {
	git.branch(function (branch) {
		switch (branch){
			case 'master':
				gulp.start('scssMaster');
			break;
			default:
				gulp.start('scssDev');
		}
	});
});

gulp.task('scssDev', function () {
	gulp.src(settings.source + '/scss/*.scss')
	.pipe(cssGlobbing({
		extensions: ['.scss'],
	}))
	.on('error', function(err){ console.log(err.message); this.emit('end');})
	.pipe(sass())
	.on('error', function(err){ console.log(err.message); this.emit('end');})
	.pipe(base64({
		baseDir: settings.build + '/images/',
		extensions: ['svg', 'png']
	}))
	.pipe(autoprefixer('last 1 version', 'ie 11', 'ios 8'))
	.pipe(gulp.dest(settings.build + '/css'))
	.pipe(livereload()); 
});

gulp.task('scssMaster', function () {
	gulp.src(settings.source + '/scss/*.scss')
	.pipe(cssGlobbing({
		extensions: ['.scss'],
	}))
	.on('error', function(err){ console.log(err.message); this.emit('end');})
	.pipe(sass())
	.on('error', function(err){ console.log(err.message); this.emit('end');})
	.pipe(base64({
		baseDir: settings.build +  '/images/',
		extensions: ['svg', 'png']
	}))
	.pipe(sourcemaps.init())
	.pipe(autoprefixer('last 1 version', 'ie 11', 'ios 8'))
	.pipe(minifyCSS())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(settings.build + '/css'))
	.pipe(livereload());
});

/*
 * Watch
 * --------------------------------------------------
 */
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(settings.source + '/js/**/*.js', ['js']); 
	gulp.watch([settings.source + '/scss/**/*.scss', settings.components + '/**/*.scss'], ['scss']); 
	gulp.watch(['**/*.php']).on('change', livereload.changed);
});

/*
 * Default
 * --------------------------------------------------
 */
gulp.task('dev', ['js','scss']);
gulp.task('default', ['watch', 'dev']);
