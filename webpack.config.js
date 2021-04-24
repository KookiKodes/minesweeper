const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
require("dotenv").config();
const devMode = process.env.NODE_ENV !== "production";

const plugins = [
	new HtmlWebpackPlugin({
		title: "Minesweeper",
		template: "./src/index.html",
	}),
];

const minimizer = [];

if (!devMode) {
	plugins.push(
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
			chunkFilename: "[id].[contenthash].css",
			ignoreOrder: false,
		}),
		new CleanWebpackPlugin()
	);
	minimizer.push(
		new CssMinimizerPlugin(),
		new TerserPlugin({
			parallel: true,
			test: /\.(js|ts)(\?.*)?$/i,
			extractComments: true,
		})
	);
}

module.exports = {
	entry: {
		main: "./src/main.ts",
	},
	devtool: devMode ? "inline-source-map" : "source-map",
	mode: devMode ? "development" : "production",
	devServer: {
		contentBase: "./dist",
	},
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
				use: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
				],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf)$/,
				use: ["url-loader"],
			},
		],
	},
	plugins,
	optimization: {
		minimize: devMode ? false : true,
		minimizer,
		splitChunks: {
			cacheGroups: {
				view: {
					name: "common-components",
					test: /[\\/]Models[\\/]View[\\/]/,
					enforce: true,
				},
				helpers: {
					name: "common-components",
					test: /[\\/]Models[\\/]Helpers[\\/]/,
					enforce: true,
				},
				game: {
					name: "common-components",
					test: /[\\/]Models[\\/]Game[\\/]/,
					enforce: true,
				},
				// default defined by webpack
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
			},
		},
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	output: {
		filename: "[name].[contenthash].js",
		// publicPath: "/dist/bundles",
		path: path.resolve(__dirname, "dist"),
		globalObject: "this",
		clean: true,
	},
};
