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
