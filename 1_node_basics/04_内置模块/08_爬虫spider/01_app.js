
const http = require('http');
const https = require('https')

function filterData(data) {
  console.log(data)
}
http.createServer(function (request, response) {
  let data = ''
  https.get('https://www.meizu.com', result => {
    result.on('data', chunk => {
      data += chunk
    })
    result.on('end', () => {
      filterData(data)
    })
  })

  response.end('Hello World');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');