const path = require("path");
const resolve = dir => path.join(__dirname, "./", dir);
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  outputDir: "dist/",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  pages: {
    index: {
      // 入口文件
      entry: "src/main.js" /*这个是根入口文件*/,
      // 模板文件
      template: "public/index.html",
      // 输出文件
      filename: "index.html",
      // 页面title
      title: "Index Page"
    },
    // 简写格式
    // 模板文件默认是 `public/subpage.html`
    // 如果不存在，就是 `public/index.html`.
    // 输出文件默认是 `subpage.html`.
    subpage: "src/main.js" /*注意这个是*/
  },
  // webpack配置
  // 简单的配置方式
  configureWebpack: () => ({
    resolve: {
      alias: {
        "@": resolve("src"),
        "@imgs": resolve("src/assets/imgs"),
        "@less": resolve("src/assets/less"),
        "@c": resolve("src/components"),
        "@utils": resolve("src/utils"),
        "@views": resolve("src/views"),
        "@styles": resolve("src/styles"),
        "@mixin": resolve("src/mixin"),
        "@directive": resolve("src/directive")
      }
    }
  }),
  // 第三方插件配置
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: ["./src/styles/less/*.less"]
    }
  }
};
