const path = require('path');

module.exports = {
  mode: "production",
  entry: './index.js',
  output: {
    filename: './coreJS.js'
  },
  target: "web",
  optimization: {
    namedModules: true,
	namedChunks: true,
	removeEmptyChunks: true,
	mergeDuplicateChunks: true,
	flagIncludedChunks: false,
	occurrenceOrder: true,
	concatenateModules: true,
	sideEffects: true
  },
  performance: {
    hints: 'error',
	maxEntrypointSize: 400000//,
	//maxAssetSize: 100000
  },
  module: {
    exprContextCritical: false,
    exprContextRecursive: true,
    exprContextRegExp: true,
    exprContextRequest: '.',
    unknownContextCritical: false,
    unknownContextRecursive: false,
    unknownContextRegExp: false,
    unknownContextRequest: '.',
    wrappedContextCritical: true,
    wrappedContextRecursive: true,
    wrappedContextRegExp: /.*/,
    strictExportPresence: true // since webpack 2.3.0
  }
};
