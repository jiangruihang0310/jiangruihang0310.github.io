import axios from './axios'
// 获取测试折线图数据
const line1='./LineData.json'
const bar1='./barData.json'
// 高德地图
const map='	https://restapi.amap.com/v3/staticmap'
export function getLine1(){
return axios({
		method:'get',
		url:line1
	})
}
export function getBar1(){
	return axios({
		method:'get',
		url:bar1
	})

}
export function getMap(params){
	return axios({
		method:"ger",
		url:map,
		params:{params}
	})
}

// 网易云 搜索接口

// 网易云 