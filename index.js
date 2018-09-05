const fs = require('fs')
const jsBeauty = require('js-beautify')
const endOfLine = require('os').EOL
/**
 * @method 根据执行命令写入不同的域名
 * @param {Object} options
 */
class HttpEnvWebpackPlugin {
  constructor (options = {}) {
    this.options = options
  }
  apply (compiler) {
    compiler.hooks.done.tap('HttpEnvWebpackPlugin', () => {
      if (process.env.NODE_ENV) {
        let input = require(this.options.form)
        const content = jsBeauty.js(
          JSON.stringify(input[process.env.NODE_ENV]), {
            indent_size: 2
          })
        /**
           * eslint quotes: ["error", "double"] 写入的时候是双引号 避免eslint 出现警告或报错
           */
        fs.writeFileSync(this.options.to, `/* eslint quotes: ["error", "double"] */${endOfLine}/*eslint-env es6*/${endOfLine}export default ${content + endOfLine}`)
      }
    })
  }
}
module.exports = HttpEnvWebpackPlugin
