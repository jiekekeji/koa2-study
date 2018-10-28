## ORM 之 Sequelize

一、安装路由
```
cnpm install koa-router --save
```

二、简单使用，在index.js文件中使用
```
const Koa = require('koa')
const app = new Koa()
// 1、引入 这里router是函数
const router = require('koa-router')()

//2、添加路由
router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>index page</h1>'
})

router.get('/home', async (ctx, next) => {
    ctx.response.body = '<h1>HOME page</h1>'
})

router.get('/404', async (ctx, next) => {
    ctx.response.body = '<h1>404 Not Found</h1>'
})

// 3、调用路由中间件
app.use(router.routes())

app.listen(8080, ()=>{
    console.log('server is running at http://localhost:8080')
})
```

三、拆分路由。为了便于管理将路由拆分为多个文件。

1、安装glob、path、koa-compose模块:
```
cnpm install path glob koa-compose --save
```
2、新建routers目录，在routers目录下新建index.js,代码如下:
```
const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

registerRouter = () => {
    let routers = [];
    // 将 与 routes同级目录controller下的.js文件解析为路由文件
    glob.sync(resolve(__dirname,  '../controller', '**/*.js')).map(router => {
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
    return compose(routers)
}

module.exports = registerRouter
```
将 与 routes同级目录controller下的.js文件解析为路由文件。
3、在controller目录下新建user.js,代码如下:
```
const Router = require('koa-router')
const path = require('path')
const router = new Router()

// 该路由将文件名作为路由的前缀，如这里将user作为前缀
let prefix = path.basename(__filename)
router.prefix('/' + prefix.substring(0, prefix.indexOf('.')))

// 访问路径 http://localhost:1996/user/login
router.get('/login',(ctx,next)=>{
    ctx.body = "login"
})

router.get('/register',(ctx,next)=>{
    ctx.body = "register"
})

module.exports = router
```
访问路径为:http://localhost:8080/user/login,http://localhost:8080/user/register

4、在controller目录下新建mall目录，新建order.js文件，代码如下:
```
const Router = require('koa-router')
const path = require('path')
const router = new Router()

// 该路由将文件名作为路由的前缀
let prefix = path.basename(__filename)
router.prefix('/' + prefix.substring(0, prefix.indexOf('.')))

router.get('/query',(ctx,next)=>{
    ctx.body = "query"
})

router.get('/delete',(ctx,next)=>{
    ctx.body = "delete"
})

module.exports = router

```
访问路径为:http://localhost:8080/order/query,http://localhost:8080/order/delete