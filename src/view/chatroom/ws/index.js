var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ host:'10.129.33.37',port: 4000 }); //4000 与前端相对应
//调用 broadcast 广播，实现数据互通和实时更新
wss.broadcast = function (msg) {
    wss.clients.forEach((client)=> {
        client.send(msg); //自定义方法
    });
};
let arr=[]
wss.on('connection', function (ws) {
    wss.broadcast(JSON.stringify(arr)); //建立连接
    //接收前端发送过来的数据
    ws.on('message', function (e) {
        console.log('接收到来自clent的消息：' + e)
	if(e=='clear'){
		arr=[]
		wss.broadcast(JSON.stringify(arr)); //每次发送都相当于广播一次消息
	}else if(JSON.parse(e).message!==''){
			arr.push(JSON.parse(e))
			wss.broadcast(JSON.stringify(arr)); //每次发送都相当于广播一次消息
		}
    });
    ws.on('close', function () {
        // wss.broadcast(JSON.stringify({ funName: 'userCount', users: userNum, chat: chatList }));//建立连接关闭广播一次当前在线人数
        // console.log('Connected clients:', userNum);
        console.log('长连接已关闭')
    })
})
console.log('websocket服务已启动，服务路径：ws://10.129.33.37:4000');