import axios from 'axios'
import { ElMessage } from 'element-ui'
import {getToken} from '@/utils/auth'
axios.defaults.baseURL = `https://autumnfish.cn`
// axios.defaults.baseURL = `http://localhost:3000`

// 添加请求拦截器
axios.defaults.withCredentials=true;
axios.interceptors.request.use(config => {
	if(getToken()){
		config.headers.Authorization=getToken()
	}
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
