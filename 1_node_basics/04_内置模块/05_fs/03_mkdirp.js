const mkdirp = require('mkdirp')


mkdirp('./test/asdasd/aasd')

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     let name = '张三'
//     resolve(name)
//   }, 1000);
// }).then(data => {
//   console.log(data)
// })


// async function getZhiHu(id) {
//   const url = `https://zhuanlan.zhihu.com/api/columns/${id}`
//   const response = await fetch(url)
//   return await response.json()

// }
// getZhiHu('reweekly').then(column => {
//   console.log('name:' + column.name)
//   console.log('name:' + column.info)
// })
const timeoutFn = function (timeout) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, timeout);
  });
}

async function fn() {
  await timeoutFn(1000);
  console.log('222222')
  await timeoutFn(2000);
  console.log('asddddd')
  return '完成';
}
fn().then(success => console.log(success));
console.log('1')