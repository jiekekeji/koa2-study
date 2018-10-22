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
