const fs = require('fs')
// 判断是否存在upload目录。没有则创建，有不做操作
function isExitUpLoadDir() {
  fs.stat('upload', (err, data) => {
    if (err) {
      fs.mkdir('upload', (err) => {
        if (err) throw err
        console.log('创建upload成功')
      })
    } else {
      if (data.isFile()) {
        fs.unlink('upload', (err) => {
          if (err) throw err
          console.log('删除非目录的upload')
          fs.mkdir('upload', (err) => {
            if (err) throw err
            console.log('创建upload成功')
          })
        })
      } else {
        console.log('upload已经存在')
      }
    }
  })
}
function mkDir() {
  fs.mkdir('upload', (err) => {
    if (err) throw err
    console.log('upload创建成功')
  })
}
isExitUpLoadDir()