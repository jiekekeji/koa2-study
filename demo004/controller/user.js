const Router = require('koa-router')
const path = require('path')
const xlsx = require('node-xlsx').default;
const fs = require('fs')
const router = new Router()

let prefix = path.basename(__filename)
router.prefix('/api/' + prefix.substring(0, prefix.indexOf('.')))

router.post('/excelin',(ctx,next)=>{
    const file = ctx.request.files.file; // 获取上传文件
    const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(file.path));
    workSheetsFromBuffer.forEach((item)=>{
        item.data.forEach((row)=>{
            console.log(row)
        })
    })
    return ctx.body = "上传成功！";
})

router.get('/excelout',(ctx,next)=>{
    ctx.body = "register"
})

module.exports = router
