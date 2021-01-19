const Koa = require('koa')
const path = require('path')
const koajwt = require('koa-jwt')
const { secret } = require('./config/secret')

const app = new Koa()

const static = require('koa-static')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())


// 错误处理
app.use((ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401){
            ctx.status = 401;
            ctx.body = {status: 401, message: '请登录'};
        }else{
            throw err;
        }
    })
})

const staticPath = './build'

app.use(static( path.join( __dirname,  staticPath) ))

app.use(koajwt({ secret }).unless({ path: [/\/api\/login/, /^((?!\/api).)*$/] }));



const router = require('./config/router')

app.use(router.routes()).use(router.allowedMethods())


app.listen(6300)
console.log('[demo] start-quick is starting at port 6300')