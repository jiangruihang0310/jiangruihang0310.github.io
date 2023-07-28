<template>
	<div class="chart_Room">
		<div class="name"  v-if="inputFlag" @keydown="(e)=>handleUser(e)">
			<div class="content">
				<div class="title">请输入用户名</div>
				<div class="input">
					<input type="text" v-model="userVal" placeholder="请输入用户名">
				</div>
			</div>
		</div>
		<div class="contentList">
			<div class="wrapper">
				<div v-if="userVal" class="message">欢迎{{userVal}}加入聊天室</div>
				<div class="clear" @click="handleClear">清空聊天记录</div>
				<ul class="list" ref="list">
					<li class="item" v-for="(item) in values">
						<div class="title">{{ item.userName }}：</div>
						<div class="content">{{ item.message }}</div>
					</li>
				</ul>
				<div class="input" @keydown="(e)=>handleContent(e)">
					<input type="text" v-model="contentVal">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {ref} from 'vue'
export default {
	data() {
		return {
			ws:null,
			inputFlag: true,
			userVal:localStorage.getItem('userName')||'',
			contentVal:'',
			values:[]
		}
	},
	mounted() {
		this.ws=new WebSocket('ws://10.129.33.37:4000')
		this.ws.onopen=()=>{
			console.log('连接成功');
		}
		this.ws.onmessage=(e)=>{
			this.values=JSON.parse(e.data);
		}
		this.ws.onclose=()=>{
			console.log('连接关闭');
		}
		if(this.userVal){
			this.inputFlag=false
		}
		
		this.$nextTick(()=>{
		})
	},
	methods: {
		handleUser(e){
			if (e.keyCode === 13) {
				if(this.userVal!==''){
					this.inputFlag=false
					this.ws.send(JSON.stringify({userName:this.userVal,message:''}))
					localStorage.setItem('userName',this.userVal)
				}else{
					this.$message.info('随便输入点内容')
				}
			}
		},
		handleContent(e){
			if(e.keyCode===13 && this.contentVal){
				console.log('发送');
				this.ws.send(JSON.stringify({userName:this.userVal,message:this.contentVal}))
				this.contentVal=''
			}
		},
		handleClear(){
			this.ws.send('clear')
		}
	},
	watch:{
		values(news){
			this.$nextTick(()=>{
				this.$refs.list.scrollTop=this.$refs.list.scrollHeight+135
			})

		}

	}
}
</script>

<style lang="scss" scoped>
.chart_Room {
	width: 100%;
	height: 100%;
	overflow: hidden;
}

.name {
	width: 100%;
	height: 100%;
	background-image: linear-gradient(120deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,.7) 100%);
	position: relative;
	z-index: 99;
}
.name .content{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	.title{
		position: relative;
		left: 50%;
		transform: translateX(-25%);
		letter-spacing: 10px;
		font-size: 30px;
		margin-bottom: 30px;
		// color: #0015f8;
		background-image:-webkit-linear-gradient(top,#fff,rgba(188, 188, 188,1) ); 
		font-weight: 800;
    	background-clip:text; 
    	-webkit-text-fill-color:transparent; 
	}
	input{
		display: inline-block;
		outline: none;
		transition: all 0.3s;
		padding-left: 10px;
		width: 400px;
		height: 50px;
		border: 2px solid #000;
		border-radius:10px ;
		font-size: 18px;
		background-color: #aaa;
		&:focus{
			border:2px solid #fff;
			background-color: #eee;
		}
	}
}

.contentList{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.6)
}
.contentList .wrapper{
	width: 80%;
	height: 80%;
	padding: 2%;
	background: #aaa;
	position: absolute;
	left: 50%;
	top: 50%;
	border: 1px solid #aaa;
	transform: translate(-50%,-50%);
	border-radius: 12px;
	.message{
		text-align: center;
	}
	.clear{
		position: absolute;
		right:5%;
		top: 3%;
		cursor: pointer;
		&:hover{
			color:red;
		}
	}
	.list{
		width: 90%;
		height: 80%;
		margin: 2% auto;
		overflow-y: auto;
		.item{
			display: flex;
		}
	}
	.input{
		width: 100%;
		height: 100%;
		margin: 0 auto;
		height: 10%;
		// margin-top: 5%;
		input{
			width: 100%;
			height: 100%;
			outline: none;
			padding-left: 10px;
			background-color:#e3e1e1;
			border: none;
			border-radius:10px;
			font-size: 22px;
		}
	}
}
</style>