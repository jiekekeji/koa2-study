## ORM 之 Sequelize 简单增删查改

一、安装路由
```
cnpm install sequelize --save
```

二、模型定义
```
const Sequelize = require('sequelize');
const helper = require('./helper/helper');

const User = helper().define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false, // 不能为空
        unique: true //唯一性
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false, // 不能为空
    },
    age: {
        type: Sequelize.INTEGER
    }

});
User.sync();
module.exports = User
```

三、增
```
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
```

四、删
```
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
```
五、更
```
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
```
六、查全部
```
router.get('/findAll', async (ctx, next) => {
    try {
        // 查询全部字段
        let result = await User.findAll()
        ctx.body = '查询成功:' + JSON.stringify(result)
    } catch (errors) {
        console.log('errors', errors)
        ctx.body = '查询失败:' + JSON.stringify(errors)
    }
})
```
七、查询部分字段并加上查询条件
```
router.get('/findAllSome', async (ctx, next) => {
    try {
        // 只查询username，age字段
        let result = await User.findAll({
            attributes: ['username', 'age'],
            where: {
                id: 5
            }
        })
        ctx.body = '查询成功:' + JSON.stringify(result)
    } catch (errors) {
        console.log('errors', errors)
        ctx.body = '查询失败:' + JSON.stringify(errors)
    }
})
```