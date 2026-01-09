import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';

export const jqueryScrollbar = () => {
  return app.gulp.src(app.path.src.jqueryScrollbar, {sourcemaps: app.isDev})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "NORMALIZE",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(cleanCss())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(app.gulp.dest(app.path.build.jqueryScrollbar))
    .pipe(app.plugins.browsersync.stream())
}