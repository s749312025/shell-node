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
    verify: () => {
        
    }
}

module.exports = User