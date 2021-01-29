<template>
    <div class="page-login">
        <div class="page-login--layer page-login--layer-area">
            <ul class="circles">
                <li v-for="n in 10" :key="n"></li>
            </ul>
        </div>
        <div class="page-login--layer page-login--layer-time">{{time}}</div>
        <div class="page-login--wrapper">
            <div class="page-login--content">
                <div class="page-login--logo-title">
                    <p>shell管理系统</p>
                </div>
                <el-card shadow="never" class="login-form">
                    <el-form
                        :model="loginForm"
                        ref="loginForm"
                        label-position="top"
                    >
                        <el-form-item prop="user">
                            <el-input placeholder="用户名" v-model="loginForm.user" size="default">
                                <i slot="prepend" class="el-icon-user-solid"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="loginPassword">
                            <el-input
                                show-password
                                placeholder="密码"
                                v-model="loginForm.password"
                                size="default"
                            >
                                <i slot="prepend" class="el-icon-lock"></i>
                            </el-input>
                        </el-form-item>
                        <el-button
                            @click="handleSubmit"
                            type="primary"
                            class="button-login"
                            size="default"
                        >提交</el-button>
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs'
import { validUsername } from '@/utils/validate'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
    name: 'Login',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!validUsername(value)) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        return {
            timeInterval: null,
            time: dayjs().format('HH:mm:ss'),
            loginForm: {
                // username: '15002239659',
                // password: '123456'
                user: '',
                password: ''
            },
            loginRules: {
                user: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined
        }
    },
    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        handleSubmit() {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    this.loading = true

                    const data = await this.$fetch('/login', this.loginForm)
                    // const data = {data: {token: 123}}
                    if (data.status == 0) {
                        this.$store.commit('user/SET_TOKEN', data.token)
                        setToken(data.token)
                        this.$router.push({ path: this.redirect || '/' })
                    }
                    
                    this.loading = false
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        refreshTime() {
            this.time = dayjs().format('HH:mm:ss')
        }
    },
    mounted() {
        this.timeInterval = setInterval(() => {
            this.refreshTime()
        }, 1000)
    },
    beforeDestroy() {
        clearInterval(this.timeInterval)
    }
}
</script>
<style lang="scss" scoped>
.page-login {
    user-select: none;
    cursor: pointer;
    $backgroundColor: #f0f2f5;
    // ---
    background-color: $backgroundColor;
    height: 100%;
    position: relative;
    .page-login--layer {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        overflow: auto;
        &-area {
            overflow: hidden;
        }
        .circles {
            padding: 0;
            margin: 0;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            li {
                position: absolute;
                display: block;
                list-style: none;
                width: 20px;
                height: 20px;
                background: #ffffff;
                bottom: -200px;
                animation: animate 25s linear infinite;
                @keyframes animate {
                    0% {
                        transform: translateY(0) rotate(0);
                        opacity: 1;
                        border-radius: 0;
                    }
                    100% {
                        transform: translateY(-1000px) rotate(720deg);
                        opacity: 0;
                        border-radius: 50%;
                    }
                }
                &:nth-child(1) {
                    left: 15%;
                    width: 80px;
                    height: 80px;
                    animation-delay: 0s;
                }
                &:nth-child(2) {
                    left: 5%;
                    width: 20px;
                    height: 20px;
                    animation-delay: 2s;
                    animation-duration: 12s;
                }
                &:nth-child(3) {
                    left: 70%;
                    width: 20px;
                    height: 20px;
                    animation-delay: 4s;
                }
                &:nth-child(4) {
                    left: 40%;
                    width: 60px;
                    height: 60px;
                    animation-delay: 0s;
                    animation-duration: 18s;
                }
                &:nth-child(5) {
                    left: 65%;
                    width: 20px;
                    height: 20px;
                    animation-delay: 0s;
                }
                &:nth-child(6) {
                    left: 75%;
                    width: 150px;
                    height: 150px;
                    animation-delay: 3s;
                }
                &:nth-child(7) {
                    left: 35%;
                    width: 200px;
                    height: 200px;
                    animation-delay: 7s;
                }
                &:nth-child(8) {
                    left: 50%;
                    width: 25px;
                    height: 25px;
                    animation-delay: 15s;
                    animation-duration: 45s;
                }
                &:nth-child(9) {
                    left: 20%;
                    width: 15px;
                    height: 15px;
                    animation-delay: 2s;
                    animation-duration: 35s;
                }
                &:nth-child(10) {
                    left: 85%;
                    width: 150px;
                    height: 150px;
                    animation-delay: 0s;
                    animation-duration: 11s;
                }
            }
        }
        &-time {
            align-items: baseline;
            padding-top: 0.5em;
            font-size: 11em;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.03);
            overflow: hidden;
            font-family: 'Arial';
            display: flex;
            justify-content: center;
            /* align-items: center; */
            flex-direction: row;
        }
    }
    .page-login--wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        .page-login--content {
            width: 300px;
            ::v-deep .el-card {
                margin-bottom: 15px;
                opacity: 0.9;
                .el-card__body {
                    padding: 30px 20px;
                }
                .button-login {
                    width: 100%;
                }
                // 输入框左边的图表区域缩窄
                .el-input-group__prepend {
                    padding: 0px 14px;
                }

                .login-code {
                    height: 32px - 2px;
                    display: block;
                    margin: 0px -20px;
                    border-top-right-radius: 2px;
                    border-bottom-right-radius: 2px;
                    // cursor: pointer;
                }
            }
            .page-login--logo-title {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
                font-size: 36px;
                margin-bottom: 10px;
                img {
                    width: 40px;
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>
