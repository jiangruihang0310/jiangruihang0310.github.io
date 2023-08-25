import axios from 'axios'
import { ElMessage } from 'element-ui'

axios.defaults.baseURL = `https://autumnfish.cn`

// 添加请求拦截器
axios.interceptors.request.use(config => {
    return config;
})
// 添加响应拦截器
axios.interceptors.response.use(response => {

    let { code, message, data } = response.data;
    if (code != -1) {
        return data || response.data || response;
    }
    ElMessage.error(message)
    return [];
}, err => {
    // 对响应错误做点什么
    return Promise.reject(err);
})

export default axios
