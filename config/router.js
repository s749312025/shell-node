const router = require('koa-router')()

const command = require('../model/command');
const User = require('../model/user')




router.post('/api/login', User.login)
router.post('/api/getUserInfo', User.getUserInfo)
router.post('/api/command/list', command.getList)
router.post('/api/command/getDetails', command.getDetails)
router.post('/api/command/getLog', command.getLog)
router.post('/api/command/execute', command.execute)
router.post('/api/command/clear', command.clear)
router.post('/api/command/saveSh', command.save)
router.post('/api/command/delSh', command.del)

module.exports =  router;