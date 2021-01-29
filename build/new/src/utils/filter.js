import * as utils from './index'
import enums from './enum'
import Vue from 'vue'

console.log({enums});

Object.keys(utils).forEach(key => {
    Vue.filter(key, utils[key])
})

Object.keys(utils).forEach(key => {
    Vue.prototype[key] = utils[key]
})

Object.keys(enums).forEach(key => {
    Vue.prototype[key] = enums[key]
})
