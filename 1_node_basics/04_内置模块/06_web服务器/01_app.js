const http = require('http');
const fs = require('fs')
const path = require('path')
const common = require('./module/getExtName')
http.createServer(function (request, response) {




  const { url } = request
  let urlPath = 'static' + url
  urlPath = url === '/' ? 'static/index.html' : urlPath
  // 得到扩展名
  const extname = path.extname(urlPath)
  const extType = common.getFileType(extname)
  console.log(extType)
  if (url != '/favicon.ico') {
    fs.readFile(urlPath, (err, data) => {
      if (err) {
        response.writeHead(404,
          { 'Content-Type': + extType + ';charset=utf-8' })
        response.end('页面不存在')
      }
      response.writeHead(200, { 'Content-Type': '' + extType + ';charset=utf-8' });
      response.end(data);
    })
  }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');