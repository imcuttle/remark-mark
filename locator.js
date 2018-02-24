module.exports = locate

function locate(value, fromIndex) {
  var asterisk = value.indexOf('==', fromIndex)
  return asterisk
}
