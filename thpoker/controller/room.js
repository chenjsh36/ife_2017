var roomList = [];

// 获取房间列表
var fn_room_list = async (ctx, next) => {
    ctx.response.body = {
        code: 0,
        data: roomList
    }
}

var fn_room_create = async (ctx, next) => {
    if (!ctx.session.user) {
        ctx.response.body = {
            code: 4,
            msg: '用户未登录'
        };
        return;
    }
    var room = {
        name: '' + roomList.length + '-' + ctx.session.user.name,
        creator: filterUserInfo(ctx.session.user)
    };
    roomList.push(room);
    ctx.response.body = {
        code: 0,
        data: {
            new: room,
            roomList: roomList
        }
    };
}
var fn_userStatus = async (ctx, next) => {
    if (ctx.session.user) {
        ctx.response.body = {
            code: 0,
            data: filterUserInfo(ctx.session.user)
        }
        return;
    }
    ctx.response.body = {
        code: 1,
        msg: '用户未登录'
    };
}

// 过滤用户信息
var filterUserInfo = (user) => {
    return {
        name: user.name,
        email: user.email,
        head: user.head
    }
}

module.exports = {
    'GET /ife/thpoker/api/room/list': fn_room_list,
    'POST /ife/thpoker/api/room/create': fn_room_create,
}