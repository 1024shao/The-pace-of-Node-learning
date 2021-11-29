# 一、Node.js是什么

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.

### 1、特性

Node.js 可以解析JS代码（没有浏览器安全级别的限制）提供很多系统级别的API，如：

- 文件的读写 (File System)
- 进程的管理 (Process)
- 网络通信 (HTTP/HTTPS)
- ……

### 2、举例

#### 2.1 浏览器安全级别的限制

**Ajax测试**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>browser-safe-sandbox</title>
</head>
<body>
  <div>browser-safe-sandbox</div>
  <script>
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'https://m.maoyan.com/ajax/moreClassicList?sortId=1&showType=3&limit=10&offset=30&optimus_uuid=A5518FF0AFEC11EAAB158D7AB0D05BBBD74C9789D9F649898982E6542C7DD479&optimus_risk_level=71&optimus_code=10', false)
    xhr.send()
  </script>
</body>
</html>
```

**浏览器预览**

```
browser-sync start --server --files **/* --directory
```

#### 2.2 文件的读写 (File System)

```js
const fs = require('fs')

fs.readFile('./ajax.png', 'utf-8', (err, content) => {
  console.log(content)
})
```

#### 2.3 进程的管理（Process）

```js
function main(argv) {
  console.log(argv)
}

main(process.argv.slice(2))
```

**运行**

```
node 2.3-process.js argv1 argv2
```

#### 2.4 网络通信（HTTP/HTTPS）

```js
const http = require("http")

http.createServer((req,res) => {
  res.writeHead(200, {
    "content-type": "text/plain"
  })
  res.write("hello nodejs")
  res.end()
}).listen(3000)
```

# 二、Node 相关工具

### 1、NVM: Node Version Manager

**1.1 Mac 安装 nvm**

```
https://github.com/nvm-sh/nvm/blob/master/README.md
```

**1.2 Windows 安装 nvm**

```
nvm-windows
nodist
```

### 2、NPM: Node Package Manager

#### 2.1 全局安装package

```
$ npm install forever --global (-g)
$ forever
$ npm uninstall forever --global
$ forever
```

**全局安装包的目录**

- Mac

  ```
  /Users/felix/.nvm/versions/node/nvm各个版本/bin/
  ```

- Windows

  ```
  C:\Users\你的用户名\AppData\Roaming\npm\node_modules
  ```

#### 2.2 本地安装package

```
$ cd ~/desktop
$ mkdir gp-project
$ cd gp-project
$ npm install underscore
$ npm list (ls)
```

#### 2.3 package.json初始化

```
$ pwd
$ npm init -y
$ ls
$ cat package.json
```

#### 2.4 使用package.json

```
$ npm install underscore --save
$ cat package.json
$ npm install lodash --save-dev
$ cat package.json
$ rm -rf node_modules
$ ls
$ npm install
$ npm uninstall underscore --save
$ npm list | grep underscore
$ cat package.json
```

#### 2.5 安装指定版本的包

```
$ pwd
$ npm list
$ npm info underscore
$ npm view underscore versions
$ npm install underscore@1.8.0
$ npm list
$ npm uninstall underscore
$ npm list
```

#### 2.6 更新本地安装的包

```
$ npm info underscore
$ npm view underscore versions
$ npm install underscore@1.4.4 --save-dev
$ npm list | grep gulp
$ npm outdated //~2.0.0表示patch, ^2.0.0表示minor * 表示xx最新版本
$ npm list | grep gulp
$ npm update
```

#### 2.7 清除缓存

```
npm cache clean --force
```

#### 2.8 上传自己的包

###### 2.8.1 编写模块

保存为index.js

```js
exports.sayHello = function(){ 
  return 'Hello World'; 
}
```

###### 2.8.2 初始化包描述文件

$ npm init package.json

```json
{ 
  "name": "gp19-npm", 
  "version": "1.0.1", 
  "description": "gp19 self module", 
  "main": "index.js",
  "scripts": { 
    "test": "make test" 
  }, 
  "repository": { 
    "type": "Git", 
    "url": "git+https://github.com/lurongtao/gp19-npm.git" 
  }, 
  "keywords": [ 
    "demo" 
  ], 
  "author": "Felixlu", 
  "license": "ISC", 
  "bugs": { 
    "url": "https://github.com/lurongtao/gp19-npm/issues" 
  }, 
  "homepage": "https://github.com/lurongtao/gp19-npm#readme", 
}
```

###### 2.8.3 注册npm仓库账号

```
https://www.npmjs.com 上面的账号
felix_lurt/qqmko09ijn
$ npm adduser
```

###### 2.8.4 上传包

```
$ npm publish
```

坑：403 Forbidden

```
查看npm源：npm config get registry
切换npm源方法一：npm config set registry http://registry.npmjs.org
切换npm源方法二：nrm use npm
```

###### 2.8.5 安装包

```
$ npm install gp19-npm
```

###### 2.8.6 卸载包

```
查看当前项目引用了哪些包 ：
npm ls
卸载包：
npm unpublish --force
```

###### 2.8.7 使用引入包

```
var hello = require('gp19-npm')
hello.sayHello()
```

#### 2.9 npm 脚本

Node 开发离不开 npm，而脚本功能是 npm 最强大、最常用的功能之一。

**一、什么是 npm 脚本？**

npm 允许在 package.json 文件里面，使用 scripts 字段定义脚本命令。

```json
{
  // ...
  "scripts": {
    "build": "node build.js"
  }
}
```

**二、执行顺序**

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

script1.js

```js
var x = 0
console.log(x)
```

script2.js

```js
var y = 0
console.log(y)
"scripts": {
  "script1": "node script1.js",
  "script2": "node script2.js"
}
```

如果是并行执行（即同时的平行执行），可以使用 `&` 符号。

```
$ npm run script1 & npm run script2
```

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用 `&&` 符号。

```
$ npm run script1 && npm run script2
```

**三、简写形式**

常用的 npm 脚本简写形式。

```
npm start 是 npm run start
```

**四、变量**

npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。

首先，通过 `npm_package_` 前缀，npm 脚本可以拿到 package.json 里面的字段。比如，下面是一个 package.json。

> 注意：一定要在 npm 脚本中运行（如：npm run view）才可以，直接在命令行中运行JS（如：node view.js）是拿不到值的

```json
{
  "name": "foo", 
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```

那么，变量 npm_package_name 返回 foo，变量 npm_package_version 返回 1.2.5。

```js
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

上面代码中，我们通过环境变量 process.env 对象，拿到 package.json 的字段值。如果是 Bash 脚本，可以用$npm_package_name 和 $npm_package_version 取到这两个值。

npm*package*前缀也支持嵌套的package.json字段。

```json
"repository": {
  "type": "git",
  "url": "xxx"
},
scripts: {
  "view": "echo $npm_package_repository_type"
}
```

上面代码中，repository 字段的 type 属性，可以通过 npm_package_repository_type 取到。

下面是另外一个例子。

```
"scripts": {
  "install": "foo.js"
}
```

上面代码中，npm_package_scripts_install 变量的值等于 foo.js。

然后，npm 脚本还可以通过 npm*config* 前缀，拿到 npm 的配置变量，即 npm config get xxx 命令返回的值。比如，当前模块的发行标签，可以通过 npm_config_tag 取到。

```
"view": "echo $npm_config_tag",
```

注意，package.json 里面的 config 对象，可以被环境变量覆盖。

```json
{ 
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}
```

上面代码中，npm_package_config_port 变量返回的是 8080。这个值可以用下面的方法覆盖。

```
$ npm config set foo:port 80
```

最后，env命令可以列出所有环境变量。

"env": "env"

#### 2.10 npm 安装 git 上发布的包

```
# 这样适合安装公司内部的git服务器上的项目
npm install git+https://git@github.com:lurongtao/gp-project.git

# 或者以ssh的方式
npm install git+ssh://git@github.com:lurongtao/gp-project.git
```

#### 2.11 cross-env 使用

##### 2.11.1 cross-env是什么

运行跨平台设置和使用环境变量的脚本

##### 2.11.2 出现原因

当您使用 NODE_ENV=production, 来设置环境变量时，大多数 Windows 命令提示将会阻塞(报错)。（异常是Windows上的Bash，它使用本机Bash。）换言之，Windows 不支持 NODE_ENV=production 的设置方式。

##### 2.11.3 解决

cross-env 使得您可以使用单个命令，而不必担心为平台正确设置或使用环境变量。这个迷你的包(cross-env)能够提供一个设置环境变量的 scripts，让你能够以 Unix 方式设置环境变量，然后在 Windows 上也能兼容运行。

##### 2.11.4 安装

npm install --save-dev cross-env

##### 2.11.5 使用

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

NODE_ENV环境变量将由 cross-env 设置 打印 process.env.NODE_ENV === 'production'

### 3、NRM: npm registry manager

#### 3.1 手工切换源

##### 3.1.1 查看当前源

```
npm config get registry
```

##### 3.1.2 切换淘宝源

```
npm config set registry https://registry.npm.taobao.org
```

#### 3.2 NRM 管理源

NRM (npm registry manager)是npm的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换。

##### 3.2.1 安装 nrm

在命令行执行命令，npm install -g nrm，全局安装nrm。

##### 3.2.2 使用 nrm

执行命令 nrm ls 查看可选的源。 其中，带*的是当前使用的源，上面的输出表明当前源是官方源。

##### 3.2.3 切换 nrm

如果要切换到taobao源，执行命令nrm use taobao。

##### 3.2.4 测试速度

你还可以通过 nrm test 测试相应源的响应时间。

```
nrm test
```

### 4、NPX: npm package extention

npm 从5.2版开始，增加了 npx 命令。它有很多用处，本文介绍该命令的主要使用场景。

Node 自带 npm 模块，所以可以直接使用 npx 命令。万一不能用，就要手动安装一下。

```
$ npm install -g npx
```

#### 4.1 调用项目安装的模块

npx 想要解决的主要问题，就是调用项目内部安装的模块。比如，项目内部安装了Mocha。

```
$ npm install -D mocha
```

一般来说，调用 Mocha ，只能在项目脚本和 package.json 的scripts字段里面，如果想在命令行下调用，必须像下面这样。

```
# 项目的根目录下执行
$ node-modules/.bin/mocha --version
```

npx 就是想解决这个问题，让项目内部安装的模块用起来更方便，只要像下面这样调用就行了。

```
$ npx mocha --version
```

npx 的原理很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。

由于 npx 会检查环境变量$PATH，所以系统命令也可以调用。

```
# 等同于 ls
$ npx ls
```

注意，Bash 内置的命令不在$PATH里面，所以不能用。比如，cd是 Bash 命令，因此就不能用npx cd。

#### 4.2 避免全局安装模块

除了调用项目内部模块，npx 还能避免全局安装的模块。比如，create-react-app 这个模块是全局安装，npx 可以运行它，而且不进行全局安装。

```
$ npx create-react-app my-react-app
```

上面代码运行时，npx 将 create-react-app 下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载 create-react-app。

注意，只要 npx 后面的模块无法在本地发现，就会下载同名模块。比如，本地没有安装http-server模块，下面的命令会自动下载该模块，在当前目录启动一个 Web 服务。

```
$ npx http-server
```

#### 4.3 --no-install 参数和 --ignore-existing 参数

如果想让 npx 强制使用本地模块，不下载远程模块，可以使用--no-install参数。如果本地不存在该模块，就会报错。

```
$ npx --no-install http-server
```

反过来，如果忽略本地的同名模块，强制安装使用远程模块，可以使用--ignore-existing参数。比如，本地已经安装了http-server，但还是想使用远程模块，就用这个参数。

```
$ npx --ignore-existing http-server
```

# 三、模块/包 与 CommonJS

### 1、模块/包分类

Node.js 有三类模块，即内置的模块、第三方的模块、自定义的模块。

#### 1.1 内置的模块

Node.js 内置模块又叫核心模块，Node.js安装完成可直接使用。如：

```js
const path = require('path')
var extname = path.extname('index.html')
console.log(extname)
```

#### 1.2 第三方的Node.js模块

第三方的Node.js模块指的是为了实现某些功能，发布的npmjs.org上的模块，按照一定的开源协议供社群使用。如：

```
npm install chalk
const chalk = require('chalk')
console.log(chalk.blue('Hello world!'))
```

#### 1.3 自定义的Node.js模块

自定义的Node.js模块，也叫文件模块，是我们自己写的供自己使用的模块。同时，这类模块发布到npmjs.org上就成了开源的第三方模块。

自定义模块是在运行时动态加载，需要完整的路径分析、文件定位、编译执行过程、速度相比核心模块稍微慢一些，但是用的非常多。

##### 1.3.1 模块定义、接口暴露和引用接口

我们可以把公共的功能 抽离成为一个单独的 js 文件 作为一个模块，默认情况下面这个模块里面的方法或者属性，外面是没法访问的。如果要让外部可以访问模块里面的方法或者属性，就必须在模块里面通过 exports 或者 module.exports 暴露属性或者方法。

m1.js：

```js
const name = 'gp19'

const sayName = () => {
  console.log(name)
}

console.log('module 1')

// 接口暴露方法一：
module.exports = {
  say: sayName
}

// 接口暴露方法二：
exports.say = sayName

// 错误！
exports = {
  say: sayName
}
```

main.js：

```js
const m1 = require('./m1')
m1.say()
```

##### 1.3.2 模块的循环引用

由于 exports 使用方式方式不对，会在两个不同 js 循环引用的情况下，导致其中一个 js 无法获取另外一个 js 的方法，从而导致执行报错。如：

- a.js

```js
exports.done = false
const b = require('./b.js')
console.log('in a, b.done = %j', b.done)
exports.done = true
console.log('a done')
```

- b.js

```js
console.log('b starting')
exports.done = false
const a = require('./a.js')
console.log('in b, a.done = %j', a.done)
exports.done = true
console.log('b done')
```

- main.js

```js
console.log('main starting')
const a = require('./a.js')
const b = require('./b.js')
console.log('in main, a.done = %j, b.done = %j', a.done, b.done)
```

main.js 首先会 load a.js, 此时执行到const b = require('./b.js');的时候，程序会转去loadb.js, 在b.js中执行到const a = require('./a.js'); 为了防止无限循环，将a.jsexports的未完成副本返回到b.js模块。然后b.js完成加载，并将其导出对象提供给a.js模块。

我们知道nodeJs的对每个js文件进行了一层包装称为module，module中有一个属性exports，当调用require('a.js')的时候其实返回的是module.exports对象，module.exports初始化为一个{}空的object，所以在上面的例子中，执行到b.js中const a = require('./a.js');时不会load新的a module, 而是将已经load但是还未完成的a module的exports属性返回给b module，所以b.js拿到的是a module的exports对象，即：{done:false}, 虽然在a.js中exports.done被修改成了true，但是由于此时a.js未load完成，所以在b.js输出的a module的属性done为false，而在main.js中输出的a module的属性done为true. Nodejs通过上面这种返回未完成exports对象来解决循环引用的问题。

# 四、常用内置模块

这里介绍几个常用的内置模块：url, querystring, http, events, fs, stream, readline, crypto, zlib

### 1、url

#### 1.1 parse

url.parse(urlString[, parseQueryString[, slashesDenoteHost]])

```js
const url = require('url')
const urlString = 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110'
const parsedStr = url.parse(urlString)
console.log(parsedStr)
```

#### 1.2 format

url.format(urlObject)

```js
const url = require('url')
const urlObject = {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com:443',
  port: '443',
  hostname: 'www.baidu.com',
  hash: '#tag=110',
  search: '?id=8&name=mouse',
  query: { id: '8', name: 'mouse' },
  pathname: '/ad/index.html',
  path: '/ad/index.html?id=8&name=mouse',
  href: 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110'
}
const parsedObj = url.format(urlObject)
console.log(parsedObj)
```

#### 1.3 resolve

url.resolve(from, to)

```js
const url = require('url')
var a = url.resolve('/one/two/three', 'four')
var b = url.resolve('http://example.com/', '/one')
var c = url.resolve('http://example.com/one', '/two')
console.log(a + "," + b + "," + c)
```

### 2、querystring

#### 2.1 parse

querystring.parse(str[, sep[, eq[, options]]])

```js
const querystring = require('querystring')
var qs = 'x=3&y=4'
var parsed = querystring.parse(qs)
console.log(parsed)
```

#### 2.2 stringify

querystring.stringify(obj[, sep[, eq[, options]]])

```js
const querystring = require('querystring')
var qo = {
  x: 3,
  y: 4
}
var parsed = querystring.stringify(qo)
console.log(parsed)
```

#### 2.3 escape/unescape

querystring.escape(str)

```js
const querystring = require('querystring')
var str = 'id=3&city=北京&url=https://www.baidu.com'
var escaped = querystring.escape(str)
console.log(escaped)
```

querystring.unescape(str)

```js
const querystring = require('querystring')
var str = 'id%3D3%26city%3D%E5%8C%97%E4%BA%AC%26url%3Dhttps%3A%2F%2Fwww.baidu.com'
var unescaped = querystring.unescape(str)
console.log(unescaped)
```

### 3、http/https

#### 3.1 get

```js
var http = require('http')
var https = require('https')

// 1、接口 2、跨域
const server = http.createServer((request, response) => {
  var url = request.url.substr(1)

  var data = ''

  response.writeHeader(200, {
    'content-type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  })

  https.get(`https://m.lagou.com/listmore.json${url}`, (res) => {

    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      response.end(JSON.stringify({
        ret: true,
        data
      }))
    })
  })

})

server.listen(8080, () => {
  console.log('localhost:8080')
})
```

#### 3.2 post：服务器提交（攻击）

```js
const https = require('https')
const querystring = require('querystring')

const postData = querystring.stringify({
  province: '上海',
  city: '上海',
  district: '宝山区',
  address: '同济支路199号智慧七立方3号楼2-4层',
  latitude: 43.0,
  longitude: 160.0,
  message: '求购一条小鱼',
  contact: '13666666',
  type: 'sell',
  time: 1571217561
})

const options = {
  protocol: 'https:',
  hostname: 'ik9hkddr.qcloud.la',
  method: 'POST',
  port: 443,
  path: '/index.php/trade/add_item',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}

function doPost() {
  let data

  let req = https.request(options, (res) => {
    res.on('data', chunk => data += chunk)
    res.on('end', () => {
      console.log(data)
    })
  })

  req.write(postData)
  req.end()
}

// setInterval(() => {
//   doPost()
// }, 1000)
```

#### 3.3 跨域：jsonp

```js
const http = require('http')
const url = require('url')

const app = http.createServer((req, res) => {
  let urlObj = url.parse(req.url, true)

  switch (urlObj.pathname) {
    case '/api/user':
      res.end(`${urlObj.query.cb}({"name": "gp145"})`)
      break
    default:
      res.end('404.')
      break
  }
})

app.listen(8080, () => {
  console.log('localhost:8080')
})
```

#### 3.4 跨域：CORS

```js
const http = require('http')
const url = require('url')
const querystring = require('querystring')

const app = http.createServer((req, res) => {
  let data = ''
  let urlObj = url.parse(req.url, true)

  res.writeHead(200, {
    'content-type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  })

  req.on('data', (chunk) => {
    data += chunk
  })

  req.on('end', () => {
    responseResult(querystring.parse(data))
  })

  function responseResult(data) {
    switch (urlObj.pathname) {
      case '/api/login':
        res.end(JSON.stringify({
          message: data
        }))
        break
      default:
        res.end('404.')
        break
    }
  }
})

app.listen(8080, () => {
  console.log('localhost:8080')
})
```

#### 3.5 跨域：middleware（http-proxy-middware）

```js
const http = require('http')
const proxy = require('http-proxy-middleware')

http.createServer((req, res) => {
  let url = req.url

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  })

  if (/^\/api/.test(url)) {
    let apiProxy = proxy('/api', { 
      target: 'https://m.lagou.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })

    // http-proy-middleware 在Node.js中使用的方法
    apiProxy(req, res)
  } else {
    switch (url) {
      case '/index.html':
        res.end('index.html')
        break
      case '/search.html':
        res.end('search.html')
        break
      default:
        res.end('[404]page not found.')
    }
  }
}).listen(8080)
```

#### 3.6 爬虫

```js
const https = require('https')
const http = require('http')
const cheerio = require('cheerio')

http.createServer((request, response) => {
  response.writeHead(200, {
    'content-type': 'application/json;charset=utf-8'
  })

  const options = {
    protocol: 'https:',
    hostname: 'maoyan.com',
    port: 443,
    path: '/',
    method: 'GET'
  }

  const req = https.request(options, (res) => {
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    })

    res.on('end', () => {
      filterData(data)
    })
  })

  function filterData(data) {
    let $ = cheerio.load(data)
    let $movieList = $('.movie-item')
    let movies = []
    $movieList.each((index, value) => {
      movies.push({
        title: $(value).find('.movie-title').attr('title'),
        score: $(value).find('.movie-score i').text(),
      })
    })

    response.end(JSON.stringify(movies))
  }

  req.end()
}).listen(9000)
```

### 4、Events

```js
const EventEmitter = require('events')

class MyEventEmitter extends EventEmitter {}

const event = new MyEventEmitter()

event.on('play', (movie) => {
  console.log(movie)
})

event.emit('play', '我和我的祖国')
event.emit('play', '中国机长')
```

### 5、File System

```js
const fs = require('fs')
const fsP = require('fs').promises

// 创建文件夹
fs.mkdir('./logs', (err) => {
  console.log('done.')
})

// 文件夹改名
fs.rename('./logs', './log', () => {
  console.log('done')
})

// 删除文件夹
fs.rmdir('./log', () => {
  console.log('done.')
})

// 写内容到文件里
fs.writeFile(
  './logs/log1.txt',
  'hello',
  // 错误优先的回调函数
  (err) => {
    if (err) {
      console.log(err.message)
    } else {
      console.log('文件创建成功')
    }
  }
)

// 给文件追加内容
fs.appendFile('./logs/log1.txt', '\nworld', () => {
  console.log('done.')
})

// 读取文件内容
fs.readFile('./logs/log1.txt', 'utf-8', (err, data) => {
  console.log(data)
})

// 删除文件
fs.unlink('./logs/log1.txt', (err) => {
  console.log('done.')
})

// 批量写文件
for (var i = 0; i < 10; i++) {
  fs.writeFile(`./logs/log-${i}.txt`, `log-${i}`, (err) => {
    console.log('done.')
  })
}

// 读取文件/目录信息
fs.readdir('./', (err, data) => {
  data.forEach((value, index) => {
    fs.stat(`./${value}`, (err, stats) => {
      // console.log(value + ':' + stats.size)
      console.log(value + ' is ' + (stats.isDirectory() ? 'directory' : 'file'))
    })
  })
})

// 同步读取文件
try {
  const content = fs.readFileSync('./logs/log-1.txt', 'utf-8')
  console.log(content)
  console.log(0)
} catch (e) {
  console.log(e.message)
}

console.log(1)

// 异步读取文件：方法一
fs.readFile('./logs/log-0.txt', 'utf-8', (err, content) => {
  console.log(content)
  console.log(0)
})
console.log(1)

// 异步读取文件：方法二
fs.readFile('./logs/log-0.txt', 'utf-8').then(result => {
  console.log(result)
})

// 异步读取文件：方法三
function getFile() {
  return new Promise((resolve) => {
    fs.readFile('./logs/log-0.txt', 'utf-8', (err, data) => {
      resolve(data)
    })
  })
}

;(async () => {
  console.log(await getFile())
})()

// 异步读取文件：方法四
const fsp = fsP.readFile('./logs/log-1.txt', 'utf-8').then((result) => {
  console.log(result)
})

console.log(fsP)

// watch 监测文件变化
fs.watch('./logs/log-0.txt', () => {
  console.log(0)
})
```

### 6、Stream

```js
const fs = require('fs')

const readstream = fs.createReadStream('./note.txt')
const writestream = fs.createWriteStream('./note2.txt')

writestream.write(readstream)
```

### 7、Zlib

```js
const fs = require('fs')
const zlib = require('zlib')

const gzip = zlib.createGzip()

const readstream = fs.createReadStream('./note.txt')
const writestream = fs.createWriteStream('./note2.txt')

readstream
  .pipe(gzip)
  .pipe(writestream)

writestream.write(readstream)
```

### 8、ReadLine

```js
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`)

  rl.close()
})
```

### 9、Crypto

```js
const crypto = require('crypto')

const secret = 'abcdefg'
const hash = crypto.createHmac('sha256', secret)
                   .update('I love you')
                   .digest('hex')
console.log(hash)
```

# 四、路由

```js
var http = require('http')
var fs = require('fs')

http.createServer( function ( req, res ) {

  switch ( req.url ) {
    case '/home':
      res.write('home')
      res.end()
      break
    case '/mine':
      res.write('mine')
      res.end()
      break
    case '/login': 
      fs.readFile( './static/login.html',function ( error , data ) {
        if ( error ) throw error  
        res.write( data )
        res.end()
      })
      break
    case '/fulian.jpg':
      fs.readFile( './static/fulian.jpg', 'binary', function( error , data ) {
        if( error ) throw error 
        res.write( data, 'binary' )
        res.end()
      })
      break
    default: 
      break
   }

 }).listen( 8000, 'localhost', function () {
   console.log( '服务器运行在： http://localhost:8000' )
 })
```

# 五、静态资源服务

### 5.1 readStaticFile

/modules/readStaticFile.js

```js
// 引入依赖的模块
var path = require('path')
var fs = require('fs')
var mime = require('mime')

function readStaticFile(res, filePathname) {

  var ext = path.parse(filePathname).ext
  var mimeType = mime.getType(ext)

  // 判断路径是否有后缀, 有的话则说明客户端要请求的是一个文件 
  if (ext) {
    // 根据传入的目标文件路径来读取对应文件
    fs.readFile(filePathname, (err, data) => {
    // 错误处理
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" })
        res.write("404 - NOT FOUND")
        res.end()
      } else {
        res.writeHead(200, { "Content-Type": mimeType })
        res.write(data)
        res.end()
      }
    });
    // 返回 true 表示, 客户端想要的 是 静态文件
    return true
  } else {
    // 返回 false 表示, 客户端想要的 不是 静态文件
    return false
  }
}

// 导出函数
module.exports = readStaticFile
```

### 5.2 server

/server.js

```js
// 引入相关模块
var http = require('http');
var url = require('url');
var path = require('path');
var readStaticFile = require('./modules/readStaticFile');

// 搭建 HTTP 服务器
var server = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url);
  var urlPathname = urlObj.pathname;
  var filePathname = path.join(__dirname, "/public", urlPathname);

  // 读取静态文件
  readStaticFile(res, filePathname);
});

// 在 3000 端口监听请求
server.listen(3000, function() {
  console.log("服务器运行中.");
  console.log("正在监听 3000 端口:")
})
```

### 5.3 最终目录结构

![img](https://gitee.com/spencer1228/blog-img-address/raw/master/img/dir.jpg)