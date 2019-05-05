module.exports = {
  entry: __dirname + '/client/src/index.jsx',
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }, {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader',
            options: {
              modules: true
            }}],
      }
    ]
  },
  resolve: {extensions: ['*', '.js', '.jsx']},
  output: {
    filename: 'bundle-Uma.js',
    path: __dirname + '/public'
  },
  mode: 'production'
};