const Koa = require('koa')
const koaBody = require('koa-body');
const registerRouter  = require('./routes')

const app = new Koa()

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2000*1024*1024 // 设置上传文件大小最大限制，默认2M
    }
}));
app.use(registerRouter())

app.listen(8888)
console.log("demo in run")

