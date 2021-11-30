const http = require('http')

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'text/plain;charset=utf-8')
  const url = req.url
  switch (url) {
    case '/': {
      res.write('index')
      break
    }
    case '/login': {
      res.write('login')
      break
    }
    case '/register': {
      res.write('register')
      break
    }
  }
  console.log(req.socket)
  res.end(' hello 世界')
})

server.listen(9090, () => {
  console.log('http://127.0.0.1:9090')
})