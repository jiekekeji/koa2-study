## 路由中间件 koa-router 的使用

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

1、安装glob和path模块:
```
cnpm install path glob --save
```