import path from "path";
import CopyPlugin from "copy-webpack-plugin";

module.exports = {
	mode: "production",
	entry: {
		converter: path.resolve(__dirname, "src", "scripts", "converter.ts"),
		index: path.resolve(__dirname, "src", "scripts", "index.ts"),
		mappings: path.resolve(__dirname, "src", "scripts", "mappings.ts"),
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "scripts/[name].js"
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
			}
		]
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "src/static" }
			]
		})
	]
};
