const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')

registerRouter = () => {
    let routers = [];
    // 将 与 routes同级目录controller下的.js文件解析为路由文件
    glob.sync(resolve(__dirname,  '../controller', '**/*.js')).map(router => {
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
    return compose(routers)
}

module.exports = registerRouter
