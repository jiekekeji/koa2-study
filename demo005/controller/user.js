const Router = require('koa-router')
const path = require('path')
const User = require('../model/user')
const router = new Router()

let prefix = path.basename(__filename)
router.prefix('/api/' + prefix.substring(0, prefix.indexOf('.')))

router.post('/insert', async (ctx, next) => {
    let user = ctx.request.body
    try {
        let result = await User.create(user)
        ctx.body = '插入成功:' + JSON.stringify(result)
    } catch (errors) {
        console.log('errors', errors)
        ctx.body = '插入失败:' + JSON.stringify(errors)
    }
})

router.get('/delete/:id', async (ctx, next) => {
    let id = ctx.params.id;
    try {
        let result = await User.destroy({
            where: {
                id: id
            }
        })
        ctx.body = '删除成功:' + JSON.stringify(result)
    } catch (errors) {
        console.log('errors', errors)
        ctx.body = '删除失败:' + JSON.stringify(errors)
    }
})

router.post('/update', async (ctx, next) => {
    let data = ctx.request.body
    try {
        let result = await User.update(
            {
                username: data.username,
                age: data.age
            },
            {
                where: {
                    id: data.id
                }
            })
        ctx.body = '更新成功:' + JSON.stringify(result)
    } catch (errors) {
        console.log('errors', errors)
        ctx.body = '更新失败:' + JSON.stringify(errors)
    }
})

router.get('/findAll', async (ctx, next) => {
    try {
        let result = await User.findAll()
        ctx.body = '查询成功:' + JSON.stringify(result)
    } catch (errors) {
        console.log('errors', errors)
        ctx.body = '查询失败:' + JSON.stringify(errors)
    }
})
router.get('/findById/:id', async (ctx, next) => {
    let id = ctx.params.id;
    try {
        let result = await User.findById(id)
        ctx.body = '查询成功:' + JSON.stringify(result)
    } catch (errors) {
        console.log('errors', errors)
        ctx.body = '查询失败:' + JSON.stringify(errors)
    }
})
module.exports = router
