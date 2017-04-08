const WebSocket = require('ws'); // 导入web-socket 模块

const WebSocketServer = WebSocket.Server; // 引用 Server 类

// 实例化 web-socket-server
const wss = new WebSocketServer({
    port: 3000
});

wss.on('connection', function(ws) {
    // console.log(`[SERVER] connection()`, ws.upgradeReq);
    // console.log(ws.upgradeReq.headers.cookie, Object.keys(ws.upgradeReq.headers));

    // 识别用户
    // ws.user = user;

    // 绑定 websocketServer
    ws.wss = wss;

    ws.on('message', function(message) {
        console.log(`[SERVER] Received: ${message}`);
        if (message && message.trim()) {
            let mes = createMessage('chat', this.user, message.trim());
            this.wss.broadcast(message);
        }
        // ws.send(`ECHO: ${message}`, (err) => {
        //     if (err) {
        //         console.log(`[SERVER] err: ${err}`);
        //     }
        // })
    })
})

// 广播
wss.broadcast = function(data) {
    wss.clients.forEach(function(client) {
        client.send(data);
    });
};

// 消息 ID
var messageIndex = 0;

function createMessage(type, user, data) {
    messageIndex++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}