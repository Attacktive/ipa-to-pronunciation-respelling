import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

module.exports = {
	mode: "production",
	entry: {
		main: path.resolve(__dirname, "src", "static", "main.js")
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js"
	},
	devServer: {
		static: path.resolve(__dirname, "dist"),
		port: 8080,
		hot: true
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.(scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						// Interprets `@import` and `url()` like `import/require()` and will resolve them
						loader: "css-loader"
					},
					{
						// Loader for webpack to process CSS with PostCSS
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [autoprefixer]
							}
						}
					},
					{
						// Loads a SASS/SCSS file and compiles it to CSS
						loader: "sass-loader"
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: path.resolve(__dirname, "src", "index.html") }),
		new MiniCssExtractPlugin()
	]
};
