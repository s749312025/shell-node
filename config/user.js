const userConfig = {
    'tuanzi': {
        id: 1,
        user: 'tuanzi',
        password: 'tuanzi'
    },
    'chaoge': {
        id: 1,
        user: 'chaoge',
        password: 'chaoge'
    },
}

module.exports = (user, password) => {
    // -1  密码错误 -2 没有此用户
    if (userConfig[user]) {
        if (userConfig[user].password == password) {
            return userConfig[user]
        } else {
            return -1
        }
    } else {
        return -2
    }
}