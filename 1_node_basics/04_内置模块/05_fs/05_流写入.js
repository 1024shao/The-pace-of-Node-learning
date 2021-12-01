const fs = require('fs')

let str = ''
for (let i = 0; i < 400; i++) {
  str += 'hello world'
}
const writeStream = fs.createWriteStream('./upload/ouput.txt')

writeStream.write(str)

writeStream.end()

writeStream.on('finish', () => {
  console.log('写入完成')
})