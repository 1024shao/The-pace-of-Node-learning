const fs = require('fs')
// node 中的回调函数一般都是错误优先 
fs.writeFile('./01_log.txt', 'hello node', (err, data) => {
  if (err) throw err
  console.log(data)
})