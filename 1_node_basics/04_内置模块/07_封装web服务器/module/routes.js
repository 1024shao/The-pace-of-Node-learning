const fs = require('fs')
const path = require('path')
// 读取文件类型
function getExtName(extname) {
  const data = fs.readFileSync('./data/mime.json')
  let result = JSON.parse(data.toString())
  return result[extname]
}

exports.static = function (request, response, staticPath) {
  const { url } = request
  let urlPath = staticPath + url
  urlPath = url === '/' ? 'static/index.html' : urlPath
  // 得到扩展名
  console.log(path.extname(urlPath))
  const extname = path.extname(urlPath)
  if (url != '/favicon.ico') {
    fs.readFile(urlPath, (err, data) => {
      if (err) {
        response.writeHead(404,
          { 'Content-Type': 'text/plain;charset=utf-8' })
        response.end('页面不存在')
      }
      const extType = getExtName(extname)
      response.writeHead(200, { 'Content-Type': '' + extType + ';charset=utf-8' });
      response.end(data);
    })
  }
}