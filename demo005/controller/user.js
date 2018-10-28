const Router = require('koa-router')
const path = require('path')
const User = require('../model/user')
const router = new Router()

let prefix = path.basename(__filename)
router.prefix('/api/' + prefix.substring(0, prefix.indexOf('.')))

router.post('/insert', (ctx, next) => {
    let user = ctx.request.body
    let res = User.create(user).then(res => {
        console.log(JSON.stringify(res))
        ctx.body = "插入成功"
    }).catch(error => {
        console.log(JSON.stringify(error))
        ctx.body = '插入失败' + e
    })
})

router.get('/register', (ctx, next) => {
    ctx.body = "register"
})

module.exports = router
