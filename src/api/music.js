import axios from './axios';
// 暂时不行 登录需要验证
// 获取手机验证码   phone:手机号{
// export const getCaptcha=(params)=>axios.get('/captcha/sent',params)
// 暂时不行 登录需要验证 
// 手机号登录  captcha（验证码）  phone（手机号） password（密码） 调用例子：/login/cellphone?phone=xxx&password=yyy /login/cellphone?phone=xxx&md5_password=yyy /login/cellphone?phone=xxx&captcha=1234
// export const login=(params)=>axios.get('/login/cellphone',{params})

// 获取二维码登录的key
export const getQrLoginKey=()=>axios.get('/login/qr/key')

// 获取二维码 //获取二维码 所需参数 key
export const getQr=(key)=>axios.get(`/login/qr/create?key=${key}&qrimg=`)

// 二维码检测状态
export const getStatus=(key,date)=>axios.get(`/login/qr/check?key=${key}&timerstamp=${date}&noCookie=true`)

// 获取登录状态
export const getLoginStatus=()=>axios.get('/login/status')

// 获取信息
export const getAccount=()=>axios.get('/user/account')

// 获取用户歌单 必选参数 : uid : 用户 id limit : 返回数量 , 默认为 30  limit : 返回数量 , 默认为 30  offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
export const getPlayList=(params)=>axios.get('/user/playlist',params)

// 获取歌曲
// 必选参数 : id : 音乐 id level: 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
export const getSong=(params)=>axios.get('/song/url/v1',params)
