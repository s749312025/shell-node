import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '../store/index'
import { getToken, setToken, removeToken } from '@/utils/auth'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

axios.defaults.baseURL = '/api'

axios.defaults.timeout = 20000

axios.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        if (config.method === 'post') {
            config.data = qs.stringify(config.data)
            config.params = undefined
        }
        return config
    },
    error => Promise.resolve(error.response || error)
)

axios.interceptors.response.use(
    response => {
        if (response.data && response.data.status != 0 && response.data.err) {
            Message.error(response.data.err)
        }
        if (response.data && response.data.status == 72) {
            store.dispatch('user/logout')
            window.location.href = '/'
        }
        return response
    },
    error => {
        
        if (error.response && error.response.data.msg) {
            Message.error(error.response.data.msg)
        } else if (error.message) {
            if (error.code && error.code == "ECONNABORTED") {
                Message.error('连接超时')
            } else {
                Message.error(error.message)
            }
        }
        return Promise.resolve(error.response || error)
    }
)

export const fetch = (url, data = {}, method = 'post') => {
    return new Promise((resolve, reject) => {
        axios({
            url,
            data: method == 'post' ? data : {},
            params: method == 'post' ? {} : data,
            method
        }).then(res => resolve(res.data))
    })
}

Vue.prototype.$fetch = fetch
