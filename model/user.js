const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret');
const validationUser = require('../config/user');

const User = {
    login: async (ctx, next) => {
        let {user, password} = ctx.request.body;
        const info = validationUser(user, password)
        // -1  密码错误 -2 没有此用户
        if (info === -1) {
            ctx.body = {status: -1, message: '密码错误'}
            return
        }
        if (info === -2) {
            ctx.body = {status: -2, message: '未注册用户'}
            return
        }
        let token = jwt.sign({ user, id: info.id }, secret, { expiresIn: 60 * 60 * 24  }) // 24小时过期
        ctx.body = {status: 0, token}
        return
    },
    getUserInfo: async (ctx, next) => {
        let token = ctx.header.authorization
        let { user } = jwt.decode(token.split(' ')[1], secret)
        ctx.body = {status: 0, data: {token, user}}
    },
    verify: () => {
        
    }
}

module.exports = User