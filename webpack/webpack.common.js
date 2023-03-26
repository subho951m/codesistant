const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const tailwindcss = require("tailwindcss");
// const autoprefixer = require("autoprefixer");

module.exports = {
  entry: {
    popup: path.resolve('./src/popup/index.tsx'),
    options: path.resolve('./src/options/index.tsx'),
    background: path.resolve('./src/background/background.tsx'),
    // contentScript: path.resolve("./src/contentScript/index.tsx"),
    // newTab: path.resolve("./src/tabs/index.tsx"),
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.([cm]?ts|tsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: path.resolve('dist'),
        },
      ],
    }),
    ...getHtmlPlugins([
      { name: 'popup', title: 'Codesistant' },
      { name: 'options', title: 'Codesistant - Settings' },
    ]),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        // exclude 'contentScript'
        return chunk.name !== 'contentScript'
      },
    },
  },
}

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlWebpackPlugin({
        template: path.resolve('./public/index.html'),
        title: chunk.title,
        filename: `${chunk.name}.html`,
        chunks: [chunk.name],
      })
  )
}
