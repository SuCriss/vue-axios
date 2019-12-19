"use strict"

import Vue from 'vue'
import router from 'vue-router'
import axios from 'axios'
import store from '../store'
import { Toast } from 'vant'

let config = {
    // 根据环境设置baseURL, NODE_ENV为当前环境变量，默认情况下development为开发环境，production为生产环境,
    // 可创建.env.development文件和.env.production文件，配置和修改环境变量，在package.json的启动命令中添加--mode选项参数覆写默认的模式，文档地址: https://cli.vuejs.org/zh/guide/mode-and-env.html#%E6%A8%A1%E5%BC%8F
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'https://www.production.com',
    // 请求超时时间
    timeout: 1000 * 60,
    // 跨域请求是否需要凭证
    // withCredentials:true, //check cross-site Access-Control
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            // 将普适性的请求头作为基础设置。当需要特殊请求头时，将特殊请求头作为参数传入，覆盖基础配置
        },
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    },
    // 在不使用axios时，每次请求和响应，都需要将请求序列化。而在xiaos中，transformRequest在向服务器发送请求前，
    // 允许修改请求数据；transformResopnse在传递给then/catch前，允许修改响应数据。通过这两个钩子，可以省去大量重复的序列化代码。
    // 在向服务器发送请求前，序列化请求数据
    transformRequest: [function (data) {
        data = JSON.stringify(data);
        return data;
    }],
    //在传递给then/catch前，修改响应数据
    transformResponse: [function (data) {
        if (typeof data === 'string' && data.startsWith('{')) {
            data = JSON.parse(data)
        }
        return data
    }]
};


const _axios = axios.create(config)

//请求拦截器
_axios.interceptors.request.use(
    (config) => {
        //在请求被then处理前拦截。成功直接返回即可
        if (store.state.token) {
            config.headers.Authorization = store.state.token;
        }
        return config
    },
    (error) => {
        //在请求被catch处理前拦截。错误时，可自定义错误信息
        error.data = {};
        error.data.msg = '服务器异常';
        return Promise.reject(error)
    }
);

//响应拦截器
_axios.interceptors.response.use(
    (response) => {
        if (response.data.code === 401) {
            router.replace({
                path: '/login',
                query: { redirect: router.currentRoute.fullPath }
            })
        }
        return response
    },
    (error) => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    //根据自己业务需求编写业务逻辑
                    console.log('错误请求')
                    break;
                case 401:
                    store.commit('delToken')
                    console.log('未授权，请重新登录')
                    break;
                case 403:
                    console.log('拒绝访问')
                    break;
                case 404:
                    console.log('请求错误，未找到资源')
                    break;
                case 405:
                    console.log('请求方法未允许')
                    break;
                case 408:
                    console.log('请求超时')
                    break;
                case 500:
                    console.log('服务端出错')
                    break;
                case 501:
                    console.log('网络未实现')
                    break;
                case 502:
                    console.log('网络错误')
                    break;
                case 503:
                    console.log('服务不可用')
                    break;
                case 504:
                    console.log('网络超时')
                    break;
                case 505:
                    console.log('http版本不支持该请求')
                    break;
                default:
                    console.log(`连接错误${error.response.status}`)
            }
        } else {
            console.log('连接到服务器失败')
            Toast({
                message: '连接到服务器失败',
                forbidClick: true
            });
        }
        return error
    }
);

Plugin.install = function (Vue) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        }
    })
};
Vue.use(Plugin);


export default Plugin;