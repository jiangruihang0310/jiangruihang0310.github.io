import Cookies from 'js-cookie'
const TokenKey = 'glacier-legend-token' // 设定一个独一无二的key
export function getToken() {
//   return Cookies.get(TokenKey)
return localStorage.getItem(TokenKey)

}

export function setToken(token,time=7) {
    // let seconds = time;
    // let expires = new Date(new Date() * 1 + seconds * 1000);
	//   return Cookies.set(TokenKey, token,{expires:time})
return localStorage.setItem(TokenKey,token)
}

export function removeToken() {
//   return Cookies.remove(TokenKey)
	return localStorage.removeItem(TokenKey)
}