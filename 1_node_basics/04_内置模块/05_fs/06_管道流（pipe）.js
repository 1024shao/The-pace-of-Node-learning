const fs = require('fs')


const readStream = fs.createReadStream('./upload/input.webp')

const writeStream = fs.createWriteStream('./upload/output.webp')

readStream.pipe(writeStream)

console.log('写入完成')