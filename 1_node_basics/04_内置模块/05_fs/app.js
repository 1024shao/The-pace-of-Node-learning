/*
  fs.stat  判断文件类型   文件夹/文件
  fs.mkdir 创建一个目录
  fs.writeFile 创建并写入文件,存在则替换文件
  fs.appendFile 创建并追加文件内容
  fs.readFile 读取文件
  fs.readdir 读取目录
  fs.rename 重命名/移动文件
  fs.unlink 删除文件
  fs.rmdir 删除目录文件
*/


const { ifError } = require('assert')
const fs = require('fs')

/* fs.stat('./package.json', (err, data) => {
  if (err) throw err
  console.log(data.isFile())
  console.log(data.isDirectory())
})*/

// fs.mkdir('./css', (err) => {
//   if (err) throw err
//   console.log('mkdir success!')
// })

// fs.writeFile('./css/test.txt', 'hello world', (err) => {
//   if (err) console.log(err)
// })

// fs.appendFile('./css/base.css', 'body{color:red}', (err) => { if (err) throw err })

// fs.readFile('./css/test.txt', (err, data) => {
//   if (err) throw err
//   console.log(data.toString())
// })

// fs.readdir('./css', (err, data) => {
//   console.log(data)
// })

// fs.rename('./lll', 'l2ll', err => { if (err) throw err })


function removeAllFile(path) {
  // 判断该文件类型
  fs.statSync(path, (err, data) => {
    if (err) throw err
    // 非目录文件 直接删除
    if (data.isFile()) {
      fs.unlinkSync(path, (err) => {
        if (err) throw err
        console.log(path + '文件已经被删除')
      })
    } else {
      // 目录文件
      fs.readdirSync(path, (err, data) => {
        if (err) throw err
        // 文件夹只有一层
        if (!data.length) {
          fs.rmdirSync(path, (err) => {
            if (err) throw err
            console.log(path + '文件夹已经被删除')
          })
        } else {
          // 文件夹有多层
          // 逐层遍历删除文件夹下的文件
          data.forEach(item => {
            const childPath = path + '/' + item
            removeAllFile(childPath)
          })
          fs.rmdir(path, (err) => {
            if (err) throw err
            console.log(path + '文件夹已经被删除')
          })
        }
      })
    }
  })
}


removeAllFile('css')


// fs.stat('./css/c', (err, data) => {
//   console.log(data.isFile())
// })
// fs.readdir('./css/c', (err, data) => {
//   console.log(data)
// })