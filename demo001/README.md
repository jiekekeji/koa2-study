# koa2 helloword

一、新建文件夹demo001

二、进入demo001文件夹初始化项目
```
npm init -y
```
执行完之后在demo001文件夹下会有package.json文件。

三、新建index.js入口文件，输入如下代码:
```
const Koa = require('koa')
const app = new Koa()

app.use( async(ctx) => {
    ctx.body = "hello world"
})
app.listen(8080)
console.log("demo in run")
```

四、运行index.js文件，控制台输入：
```
node index.js
```
控制台输出如下，
```
demo in run
```
浏览器访问：http://localhost:8080/，打印 hello world。第一个koa2程序完成。
