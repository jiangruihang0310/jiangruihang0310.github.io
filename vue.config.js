const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler:true,
  lintOnSave:false,
//   pluginOptions:[
// 	new htmlWebpackPlugin({
// 		template:'index.html'
// 	}),
// 	new VueLoaderPlugin()
//   ],
  chainWebpack(config){
	config.resolve.alias
	.set("@", resolve("src"))
	.set("assets", resolve("src/assets"))
	.set("view", resolve("src/view/conponents"))
	.set("components", resolve("src/components"));
  },
  devServer:{
	proxy:'http://localhost:3000'
	
  },
  pages: {
    index: {
      entry: 'src/main.js', // 入口文件
      template: 'public/index.html', // 模板文件
      filename: 'index.html', // 生成的 HTML 文件名
      title: 'JiangRuiHang Blog', // 页面标题
    },
    404: {
      entry: 'src/main.js', // 另一个入口文件
      template: 'public/index.html', // 另一个模板文件
      filename: '404.html', // 另一个生成的 HTML 文件名
      title: 'JiangRuiHang Blog', // 另一个页面标题
    },
    // 可以根据需要添加更多页面配置
  },
})
