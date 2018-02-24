/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/2/24
 * @description
 */
const remark = require('remark')
const html = require('remark-html')
const stringify = require('remark-stringify')

const mark = require('../index')

describe('index', function () {
  test('index case 1', () => {
    remark()
      .use(html)
      .use(mark)
      .process('abc ==mxark==', function (err, content) {
        // console.log(err)
        expect(content.contents.trim()).toBe('<p>abc <mark>mxark</mark></p>')
      })
  })

  test('index case 2', () => {
    remark()
      .use(html)
      .use(mark)
      .process('==__mark__==', function (err, content) {
        expect(content.contents.trim()).toBe('<p><mark><strong>mark</strong></mark></p>')
      })
  })

  test('index case 3', () => {
    remark()
      .use(html)
      .use(mark)
      .process('==\=\=mark====', function (err, content) {
        expect(content.contents.trim()).toBe('<p><mark>==mark</mark>==</p>')
      })
  })

  test('stringify', () => {
    remark()
      .use(mark)
      .process('abc==~~ma`r`k~~==', function (err, content) {
        expect(content.contents.trim()).toBe('abc==~~ma`r`k~~==')
      })
  })

  // @todo support block
  // test('block test', function () {
  //   remark()
  //     .use(html)
  //     .use(mark)
  //     .process('abc ==\nmxark\n==', function (err, content) {
  //       // console.log(err)
  //       expect(content.contents.trim()).toBe('<p>abc <mark>mxark</mark></p>')
  //     })
  // })
})
