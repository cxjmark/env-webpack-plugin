const fs = require('fs')
const jsBeauty = require('js-beautify')
const endOfLine = require('os').EOL
/**
 * @method 根据执行命令写入不同的域名
 * @param {Object} options
 */
function EnvWebpackPlugin(options) {
  // Setup the plugin instance with options...
  this.options = options
}

EnvWebpackPlugin.prototype.apply = function(compiler) {
  const self = this
  compiler.plugin('compilation', function() {
    if (self.options.pattern) {
      let input = require(self.options.from)
      const content = jsBeauty.js(
        JSON.stringify(input[self.options.pattern]), {
          indent_size: 2
        })
      /**
         * eslint quotes: ["error", "double"] 写入的时候是双引号 避免eslint 出现警告或报错
         */
      fs.writeFileSync(self.options.to, `/* eslint quotes: ["error", "double"] */${endOfLine}export default ${content + endOfLine}`)
    }
  });
};
module.exports = EnvWebpackPlugin
