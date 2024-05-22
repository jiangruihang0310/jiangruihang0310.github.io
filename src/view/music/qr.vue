<template>
	<div class="qr-pop">
		<div class="qr">
			<div class="title">请使用网易云App扫码登录</div>
			<img width="128" height="128" :src="url" ref="qr"/>
			
		</div>
	</div>
</template>

<script>
import {getQrLoginKey,getQr,getStatus,getAccount} from '@/api/music'
import {toRefs,reactive,ref,onMounted} from 'vue';
import {setToken,getToken} from '@/utils/auth'
import QRCode from 'qrcode'
export default {
	props:{

	},
	setup(props){
		const state=reactive({
			status:'',
			url:"",
			setInter:null,
			uid:''
		})
		const qr=ref('')
		const methods={
			async getQrs(){
				const key=await getQrLoginKey()
				if(key){
				const urls= await getQr(key.unikey)
				// window.open(state.url,'_blank')
				state.url=await QRCode.toDataURL(urls.qrurl)
				state.setInter=setInterval(async ()=>{
					const date=new Date().getTime()
					const res=await getStatus(key.unikey,date)
					// console.log(res);
					// setToken(1231546);
					// console.log(getToken())
					if(res.code == 802){
						localStorage.setItem('avatar',res.avatarUrl)
						localStorage.setItem('name',res.nickname)
					}
					if(res.code == 803 && res.cookie){
						setToken(res.cookie)
						clearInterval(state.setInter)
						
					}
				},2000)
				}	
			}
		}
		onMounted(async ()=>{
			if(!getToken()){
				methods.getQrs()
			}else{
				const uid=await getAccount()
						// console.log(uid);
			}
		})
		return {...toRefs(state),...methods}
	}
}
</script>

<style lang="scss" scoped>
.qr-pop{
	width: 100%;height: 100%;position:fixed;
	background-color: rgba(0,0,0,.8)
}
.qr{
	width: 526px;
	height: 428px;
	background-color:rgba(144,144,144,.8);
	border-radius:30px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50% ,-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.title{
		padding-bottom: 30px;
		font-weight: 600;
		font-size: 20px;
		letter-spacing: 3px;
	}
	img{
		border-radius: 30px;
		width:323px;
		height: 323px;
	}
}

</style>