const Koa = require('koa');
const registerRouter  = require('./routes');
const koaBody = require('koa-body');
const static = require('koa-static');
const path = require('path');

const app = new Koa()

app.use(static(
    path.join( __dirname, 'public')
))
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 2000*1024*1024 // 设置上传文件大小最大限制，默认2M
    }
}));

// 放在koa-body之后
app.use(registerRouter())

app.listen(8088)
console.log("demo in run")

