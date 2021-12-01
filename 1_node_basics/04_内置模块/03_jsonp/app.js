const http = require('http');
const fs = require('fs')
let personList = null
fs.readFile('./test.json', (err, data) => {
  personList = data.toString()
})
http.createServer(function (request, response) {
  response.end(`getData(${personList})`);
}).listen(9090);

console.log('Server running at http://127.0.0.1:9090/');