const Router = require('koa-router')
const path = require('path')
const router = new Router()
const fs = require('fs')

let prefix = path.basename(__filename)
router.prefix('/api/' + prefix.substring(0, prefix.indexOf('.')))

// 获取get方式的传值
router.get('/query',(ctx, next)=>{
    let query =  ctx.request.query;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})

//获取动态路由参数
router.get('/query/:id/:username',(ctx, next)=>{
    let query =  ctx.params;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})

// 获取post提交的参数，键值对方式
router.post('/add',(ctx, next)=>{
    let query =  ctx.request.body;
    ctx.body = 'query' + JSON.stringify(ctx.request.body);
})

// 获取post提交的参数，json字符串方式
router.post('/update',(ctx, next)=>{
    let query =  ctx.request.body;
    console.log(query);
    ctx.body = "query=" + JSON.stringify(query);
})

// 上传单个文件
router.post('/upload', (ctx, next)=>{
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../public/upload/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "上传成功！";
})


// 上传多个文件
router.post('/uploads', (ctx, next)=>{
    const files = ctx.request.files.file; // 获取上传文件
    files.forEach((file)=>{
        try {
            const reader = fs.createReadStream(file.path); // 创建可读流
            let filePath = path.join(__dirname, '../public/upload/') + `/${file.name}`; // 保存的文件路径
            const upStream = fs.createWriteStream(filePath); // 创建可写流
            reader.pipe(upStream); // 可读流通过管道写入可写流
        }catch (e) {
            return ctx.body = "上传失败！";
        }
    })
    return ctx.body = "上传成功！";
})

module.exports = router
