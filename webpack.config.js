const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/main.ts",
	devtool: "inline-source-map",
	mode: "development",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.svg$/,
				loader: "raw-loader",
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf)$/,
				use: ["url-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Minesweeper",
			template: "./src/index.html",
		}),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "[name].[contenthash].bundle.js",
		path: path.resolve(__dirname, "dist"),
		globalObject: "this",
		clean: true,
	},
};
