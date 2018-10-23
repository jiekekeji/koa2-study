const Router = require('koa-router')
const path = require('path')
const router = new Router()
let prefix = path.basename(__filename)
router.prefix('/' + prefix.substring(0, prefix.indexOf('.')))

// 获取get方式的传值
router.get('/',(ctx, next)=>{
    let query =  ctx.request.query;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})
//获取动态路由参数
router.get('/user/:id/:username',(ctx, next)=>{
    let query =  ctx.params;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})

// 获取post提交的参数，键值对方式
router.post('/add',(ctx, next)=>{
    let query =  ctx.request.body;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})

// 获取post提交的参数，json字符串方式
router.post('/add',(ctx, next)=>{
    let query =  ctx.request.body;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})

module.exports = router
