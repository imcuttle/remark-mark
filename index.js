'use strict'
var locator = require('./locator')

module.exports = breaks

function breaks(options) {
  var parser = this.Parser
  var compiler = this.Compiler
  var tokenizers
  var methods

  if (!isRemarkParser(parser)) {
    throw new Error('Missing parser to attach `remark-mark` to')
  }

  tokenizers = parser.prototype.inlineTokenizers
  methods = parser.prototype.inlineMethods
  tokenizers.mark = tokenizeMark
  methods.splice(methods.indexOf('text'), 0, 'mark')
  tokenizeMark.locator = locator

  if (!isRemarkCompiler(compiler)) {
    return
  }

  var visitors = compiler.prototype.visitors
  visitors.mark = function (node) {
    var contents = this.all(node)

    return '==' + contents.join('') + '=='
  }

  function tokenizeMark(eat, value, silent) {
    var now
    var $1
    var $2
    var regex = /^(==(.+?)==)/

    /* istanbul ignore if - never used (yet) */
    if (silent) {
      return true
    }
    if (regex.test(value)) {
      $1 = RegExp.$1
      $2 = RegExp.$2
      now = eat.now()
      now.column += 2
      now.offset += 2

      return eat($1)(
        {
          type: 'mark',
          children: this.tokenizeInline($2, now),
          data: {
            hName: 'mark'
          }
        }
      )
    }
  }
}

function isRemarkParser(parser) {
  return Boolean(
    parser &&
    parser.prototype &&
    parser.prototype.inlineTokenizers &&
    parser.prototype.inlineMethods
  )
}

function isRemarkCompiler(compiler) {
  return Boolean(
    compiler &&
    compiler.prototype &&
    compiler.prototype.visitors
  )
}
