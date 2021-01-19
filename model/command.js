const { readdirSync, readFileSync, existsSync, writeFileSync, appendFileSync } = require("fs")
const {execFileSync, execFile} = require('child_process')
const path = require('path')
const { exec } = require("child_process")
const jwt = require('jsonwebtoken')
const secret = require("../config/secret")

const command = {
    getList: async (ctx) => {
        const fileList = readdirSync(path.resolve(__dirname, '../sh'))
        ctx.body = {status: 0, fileList}
    },
    getDetails: async (ctx) => {
        const {name} = ctx.request.body
        try {
            const content = readFileSync(path.resolve(__dirname, `../sh/${name}`))
            ctx.body = {status: 0, content: content.toString()}
        } catch (error) {
            ctx.body = {status: -1, message: '错误'}
        }
    },

    getLog: async (ctx) => {
        let {name} = ctx.request.body
        try {
            let content = ''
            name = name.replace('.sh', '.log')
            const isHasFile = existsSync(path.resolve(__dirname, `../log/${name}`))
            if (!isHasFile) {
                writeFileSync(path.resolve(__dirname, `../log/${name}`), '')
            } else {
                content = readFileSync(path.resolve(__dirname, `../log/${name}`))
                content = content.toString()
            }

            ctx.body = {status: 0, content}
        } catch (error) {
            ctx.body = {status: -1, message: '错误'}
        }
    },

    execute: async (ctx) => {
        const {name} = ctx.request.body
        let token = ctx.header.authorization
        let { user } = jwt.decode(token.split(' ')[1], secret)
        try {
            let logName = name.replace('.sh', '.log')
            appendFileSync(path.resolve(__dirname, `../log/${logName}`), new Date().toLocaleDateString() + `  -------------- start(${user}) \n `)
            exec('bash ' + path.resolve(__dirname, `../sh/${name}` + ' >> ' +  path.resolve(__dirname, `../log/${logName}` + ' 2>&1')), [], (error, stdout, stderr) => {
            })
            ctx.body = {status: 0, message: ''}
        } catch (error) {
            ctx.body = {status: -1, message: '错误'}
        }
    },

    clear: async (ctx) => {
        let {name} = ctx.request.body
        let logName = name.replace('.sh', '.log')
        try {
            writeFileSync(path.resolve(__dirname, `../log/${logName}`), '')
            ctx.body = {status: 0, content: ''}
        } catch (error) {
            ctx.body = {status: -1, message: '错误'}
        }
    }
    
}

module.exports = command