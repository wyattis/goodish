const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const package = require('./package.json')
const fs = require('fs')

fs.rmdirSync(baseConfig.output.path, { recursive: true })

const configs = [{
  mode: 'production',
  output: {
    library: package.name,
    filename: package.name + '.min.js'
  }
}, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: package.name + '.js'
  }
}, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: package.name + '.common.js',
    library: package.name,
    libraryTarget: 'commonjs'
  }
}, {
  mode: 'production',
  output: {
    filename: package.name + '.common.min.js',
    library: package.name,
    libraryTarget: 'commonjs'
  }
}]

module.exports = configs.map(c => merge({}, Object.assign({}, baseConfig), c))