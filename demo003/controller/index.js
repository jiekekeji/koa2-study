const Router = require('koa-router')
const path = require('path')
const router = new Router()
var fs = require('fs')

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

// 上传单个文件
router.post('/upload',(ctx, next)=>{
    const file = ctx.request.files; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "上传成功！";
})

module.exports = router
