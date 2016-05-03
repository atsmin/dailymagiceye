jspm bundle-sfx assets/js/app build.js --minify
cat assets/css/*.css | cleancss -o statics/dist/css/minified.css
