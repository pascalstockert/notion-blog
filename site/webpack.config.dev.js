const path = require ( 'path' );
const webpack = require( 'webpack' );
const dotenv = require( 'dotenv' );

dotenv.config();

const environmentVariables = [
  'API_URL_DEV',
];

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  plugins: [
    new webpack.EnvironmentPlugin( environmentVariables ),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve( __dirname, 'static' ),
  },
  devServer: {
    static: {
      directory: path.join( __dirname, 'static' ),
    },
  },
};
