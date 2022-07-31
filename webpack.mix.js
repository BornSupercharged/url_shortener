const mix = require("laravel-mix");
const { join } = require("path");

mix
  .webpackConfig({
    resolve: {
      extensions: [".js", ".json", ".vue"],
      alias: {
        "@": join(__dirname, "./resources/js"),
      },
    },
  })
  .vue()
  .js("resources/js/app.js", "public/js")
  .postCss("resources/css/app.css", "public/css", [require("tailwindcss")]);
// .sass("resources/sass/app.scss", "public/css");
