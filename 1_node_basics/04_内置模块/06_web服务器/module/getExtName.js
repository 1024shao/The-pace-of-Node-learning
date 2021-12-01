const fs = require('fs')

function getExtName(extname) {
  const data = fs.readFileSync('./data/mime.json')
  let result = JSON.parse(data.toString())
  return result[extname]
}
module.exports = { getExtName }