var gulp = require('gulp');
var gulpHelpers = require('gulp-helpers');
var taskMaker = gulpHelpers.taskMaker(gulp);
var situation = gulpHelpers.situation();
var _ = gulpHelpers.framework('_');
var runSequence = gulpHelpers.framework('run-sequence');

var path = {
  source: 'client/**/*.js',
  less: ['client/**/*.less', '!client/assets/**/*.less'],
  output: 'dist/',
  indexHtmlOutput: 'dist/index.html',
  minify: 'dist/**/*.js',
  assets: ['./client/**/*.css', './client/**/*.svg', './client/**/*.woff', './client/**/*.ttf', './client/**/*.png', './client/**/*.ico', './client/**/*.gif', './client/**/*.jpg', './client/**/*.eot'],
  index: './client/index.html',
  watch: './client/**',
  karmaConfig: __dirname + '/karma.conf.js',
  systemConfig: './system.config.js'
};

var serverOptions = {
  open: false,
  ui: false,
  notify: false,
  ghostMode: false,
  port: process.env.PORT || 3000,
  server: {
    baseDir: [path.output],
    routes: {
      '/system.config.js': './system.config.js',
      '/jspm_packages': './jspm_packages'
    }
  }
};

if (situation.isProduction()) {
  serverOptions = _.merge(serverOptions, {
    codeSync: false,
    reloadOnRestart: false,
    server: {
      snippetOptions: {
        rule: {
          match: /qqqqqqqqqqq/
        }
      }
    }
  });
}

var babelCompilerOptions = {
  modules: 'system'
};

taskMaker.defineTask('clean', {taskName: 'clean', src: path.output});
taskMaker.defineTask('less', {taskName: 'less', src: path.less, dest: path.output});
taskMaker.defineTask('babel', {taskName: 'babel', src: path.source, dest: path.output, compilerOptions: babelCompilerOptions});
taskMaker.defineTask('copy', {taskName: 'systemConfig', src: path.systemConfig, dest: path.output});
taskMaker.defineTask('copy', {taskName: 'assets', src: path.assets, dest: path.output});
taskMaker.defineTask('copy', {taskName: 'index.html', src: path.index, dest: path.output, rename: 'index.html'});
taskMaker.defineTask('watch', {taskName: 'watch', src: path.watch, tasks: ['compile', 'index.html']});
taskMaker.defineTask('minify', {taskName: 'minify', src: path.minify, dest: path.output});
taskMaker.defineTask('jshint', {taskName: 'lint', src: path.source});
taskMaker.defineTask('karma', {taskName: 'karma', configFile: path.karmaConfig});
taskMaker.defineTask('browserSync', {taskName: 'serve', config: serverOptions, historyApiFallback: true});

gulp.task('compile', function(callback) {
  return runSequence(['less', 'babel', 'assets'], callback);
});

gulp.task('recompile', function(callback) {
  return runSequence('clean', ['compile'], callback);
});

gulp.task('test', function(callback) {
  return runSequence('recompile', 'karma', callback);
});

gulp.task('run', function(callback) {
  if (situation.isProduction()) {
    return runSequence('recompile', 'index.html', 'minify', 'serve', callback);
  } else if (situation.isDevelopment()) {
    return runSequence('recompile', 'index.html', 'serve', 'watch', callback);
  }
});

gulp.task('default', ['run']);
