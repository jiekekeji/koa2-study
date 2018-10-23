## 路由中间件 koa-router 请求参数获取

### 一、获取GET方式传递的参数:

1、普通方式传参数，

   路径如:http://localhost:8080/index?username=jack&id=123212&aihao=篮球&aihao=足球
   
   获取方式:
```
router.get('/',(ctx, next)=>{
    let query =  ctx.request.query;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})
```
打印query:
```
{ username: 'jack', id: '123212', aihao: [ '篮球', '足球' ] }
```

2、获取动态路由参数，

路径如:http://localhost:8080/index/user/123132/jack

获取方式:
```
router.get('/user/:id/:username',(ctx, next)=>{
    let query =  ctx.params;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})
```
打印query:
```
 id: '123132', username: 'jack' }
```
### 二、获取POST方式传递的参数:
安装koa-bodyparser中间件
```
cnpm install --save koa-bodyparser
```
在入口文件app.js中引入:
```
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
```
app.js完整代码:
```
const Koa = require('koa')
const registerRouter  = require('./routes')
const bodyParser = require('koa-bodyparser');
const app = new Koa()

app.use(bodyParser());
app.use(registerRouter())

app.listen(8080)
console.log("demo in run")
```
1、获取post提交的参数，键值对方式
```
router.post('/add',(ctx, next)=>{
    let query =  ctx.request.body;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})
```
![Image text](https://raw.githubusercontent.com/hongmaju/light7Local/master/img/productShow/20170518152848.png)

2、获取post提交的参数，json字符串方式
```
router.post('/add',(ctx, next)=>{
    let query =  ctx.request.body;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})
```
![Image text](https://raw.githubusercontent.com/hongmaju/light7Local/master/img/productShow/20170518152848.png)

###三、上传文件