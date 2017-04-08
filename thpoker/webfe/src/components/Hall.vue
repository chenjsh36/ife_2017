<template>
    <div class="hall-container">
        <!-- 游戏大厅 -->
        <div class="topbar">
            <div class="topbar-title">Hall</div>
            <div class="user-info" v-if="ifLogin">
                <div class="user-info-item">{{user.name}}</div>
                <div class="user-info-item" @click="handleSignout">登出</div>
            </div>
        </div>
        <div class="content">
            <div class="room-create">
                <button @click="handleRoomCreate">创建房间</button>
            </div>
            <div class="roomlist">
                房间列表
                <div class="room" v-for="item in roomList">
                    房间名称： {{item.name}}
                </div>
            </div>            
        </div>

    </div>
</template>
<script>
    import $ from 'jquery'
    // import WebSocket from 'ws'
    // const WebSocket = require('ws')

    export default {
        data() {
            return {
                test: 'xxx',
                ifLogin: true,
                user: {
                    name: '',
                    head: '',
                    email: ''
                },
                roomList: []
            }
        },
        methods: {
            // 用户登出
            handleSignout() {
                this.ajaxSignOut()
                .then((data) => {
                    if (data.code !== 0) {
                        this.$message({
                            type: 'warning',
                            message: `登出失败：${data.msg}`
                        });
                        return;
                    }
                    this.$router.push('/user/signin');
                })
            },
            // 用户登出
            ajaxSignOut() {
                var def = $.Deferred();

                $.ajax({
                    url: '/ife/thpoker/api/user/signout',
                    type: 'post'
                })
                .done((data) => {
                    def.resolve(data);
                })
                .fail(() => {
                    def.resolve({
                        code: 10,
                        msg: '请刷新重试'
                    })
                });
                return def.promise();
            },
            // 获取用户信息
            ajaxGetCurUser() {
                var def = $.Deferred();

                $.ajax({
                    url: '/ife/thpoker/api/user/status',
                    type: 'get'
                })
                .done((data) => {
                    def.resolve(data);
                })
                .fail(() => {
                    def.resolve({
                        code: 10,
                        msg: '请刷新重试'
                    })
                });

                return def.promise();
            },
            ajaxRoomList() {
                var def = $.Deferred();

                $.ajax({
                    url: '/ife/thpoker/api/room/list',
                    type: 'get'
                })
                .done((data) => {
                    def.resolve(data);
                })
                .fail(() => {
                    def.resolve({
                        code: 10,
                        msg: '请刷新重试'
                    })
                });
                return def.promise();
            },
            ajaxRoomCreate(sendData) {
                var def = $.Deferred();

                $.ajax({
                    url: '/ife/thpoker/api/room/create',
                    type: 'post',
                    data: sendData
                })
                .done((data) => {
                    def.resolve(data);
                })
                .fail(() => {
                    def.resolve({
                        code: 10,
                        msg: '请刷新重试'
                    })
                });
                return def.promise();
            },
            showRoomList() {
                this.ajaxRoomList()
                .then((data) => {
                    if (data.code !== 0) {
                        this.$message({
                            type: 'warning',
                            message: `获取房间列表失败: ${data.msg}`
                        });
                        return;
                    }
                    this.roomList = data.data;
                })
            },
            handleRoomCreate() {
                this.ajaxRoomCreate()
                .then((data) => {
                    if (data.code !== 0) {
                        this.$message({
                            type: 'warning',
                            message: `创建房间失败: ${data.msg}`
                        });
                        return;
                    }
                    this.roomList = data.data.roomList;
                })
            },
            connectGameServer() {
                let ws = new WebSocket('ws://localhost:3000/ws/chat')
                // ws.send('hello');
                let context = this;

                ws.onopen = function(msg) {
                    console.log('onopen:', msg);
                    ws.send('open to send');
                }
                ws.onerror = function(err) {
                    console.log('onerror:', err);
                }
                ws.onclose = function() {
                    console.log('onclose');
                }
                ws.onmessage = function(msg) {
                    console.log(msg);
                    // ws.send('Hello!');
                    var jsonMsg = JSON.parse(msg);

                    switch (jsonMsg.type) {
                        case 'userList':
                            context.userList = jsonMsg.data;
                            break;
                        case 'userJoin':
                            context.addUser(jsonMsg.data);
                            context.addMessage(jsonMsg);
                            break;
                        case 'userLeft':
                            context.rmUser(jsonMsg.data);
                            context.addMessage(jsonMsg);
                            break;
                        case 'userChat':
                            context.addMessage(jsonMsg);
                            break;
                        default:
                            console.log('意料外的信息!');
                    }
                };
            }
        },
        mounted() {
            // 监测用户是否已登录
            this.ajaxGetCurUser()
            .then((data) => {
                if (data.code !== 0) {
                    this.$router.push({
                        path: '/user/signin'
                    })
                    return;
                }
                this.ifLogin = true;
                this.user = data.data;
            })

            this.showRoomList();

            this.connectGameServer();
        }
    }
</script>
<style scoped>
    .hall-container {
        position: relative;
    }

    /*顶部栏*/
    .topbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 40px;
        background-color: gray;
    }
    .topbar:before,
    .topbar:after {
        content: ' ';
        display: table;
        clear: both;
    }
    .topbar-title {
        position: relative;
        display: inline-block;
        font-size: 20px;
        font-weight: bold;
        height: 40px;
        line-height: 40px;
    }
    .user-info {
        position: absolute;
        right: 0;
        top: 0;
    }
    .user-head {
        position: relative;
        display: inline-block;
        height: 40px;
        width: 40px;
        margin: 0 10px;
    }
    .user-info-item {
        position: relative;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        margin: 0 10px;
    }
    /*end 顶部栏*/
    
    /*内容显示区域*/
    .content {
        position: relative;
        margin-top: 40px;
    }
    /*房间列表*/
    .roomlist {
        position: relative;
    }
    /*end 房间列表*/
</style>
