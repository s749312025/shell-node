const jwt = require('jsonwebtoken');
const { secret } = require('../config/secret');

const User = {
    login: async (ctx, next) => {
        let {user, password} = ctx.request.body;

        if (user == 'tuanzi' && password == 'tuanzi') {
            let token = jwt.sign({ user, id: 1 }, secret, { expiresIn: 60 * 60 * 24  }) // 24小时过期
            ctx.body = {status: 0, token}
            return
        } else {
            ctx.body = {status: -1}
        }
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