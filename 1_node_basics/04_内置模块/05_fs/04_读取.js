const fs = require('fs')


const readStream = fs.createReadStream('./upload/input.txt')

let count = 0
readStream.on('data', (data) => {
  count++
})

readStream.on('end', () => {
  console.log(count)
})