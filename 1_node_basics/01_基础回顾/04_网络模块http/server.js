const http = require('http')

const server = http.createServer((request, response) => {
  let url = request.url
  response.write(url)
  response.end()
})

server.listen(9090, 'localhost', () => {
  console.log('http://127.0.0.1:9090')
})