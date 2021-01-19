const router = require('koa-router')()

const command = require('../model/command');
const User = require('../model/user')




router.post('/api/login', User.login)
router.post('/api/command/list', command.getList)
router.post('/api/command/getDetails', command.getDetails)
router.post('/api/command/getLog', command.getLog)
router.post('/api/command/execute', command.execute)
router.post('/api/command/clear', command.clear)

module.exports =  router;