import HomeComponent from '@/view/home'
import Echats from '@/view/echarts'
import NotFound from '@/view/404'
import Table from '@/view/table'
import Map from '@/view/map'
import Canvas from '@/view/canvas'
import Swiper from '@/view/swiper'
import Iframe from '@/view/iframe'
import Gantt from '@/view/gantt'
import Scene from "@/view/scene"
import ChatRoom from '@/view/chatroom'
import Svg from '@/view/svg'
import DingTalk from '@/view/DingTalk'
const routes=[
	{
		path:'/',
		name:'home',
		component: HomeComponent,
		meta:{name:'主页'}
	},
	{
		path:'/echarts',
		name:'echarts',
		component:Echats	
	},
	{
		path:'/table',
		name:'table',
		component:Table	
	},
	{
		path:'/canvas',
		name:'canvas',
		component:Canvas
	},
	{
		path:'/swiper',
		name:'swiper',
		component:Swiper
	},
	{
		path:'/map',
		name:"map",
		component:Map
	},
	{
		path:"/iframe",
		name:"iframe",
		component:Iframe
	},
	{
		path:"/gantt",
		name:"gantt",
		component:Gantt
	},
	{
		path:"/scene",
		name:"Scene",
		component:Scene
	},
	{
		path:'/chatRoom',
		name:"ChatRoom",
		component:ChatRoom
	},
	{
		path:'/svg',
		name:'svg',
		component:Svg,
	},
	{
		path:"/dingTalk",
		name:'DingTalk',
		component:DingTalk
	},
	{ path: '*', name: 'not-found', component: NotFound }
]
export default routes