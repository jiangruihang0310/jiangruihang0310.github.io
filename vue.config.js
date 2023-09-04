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
	
  }
})
