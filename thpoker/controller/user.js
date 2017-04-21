var User = require('../model/user.js');
var crypto = require('crypto');

// 首页渲染
var fn_index = async (ctx, next) => {
    // ctx.response.body = `<h1>Index</h1>
    //     <form action="/signin" method="post">
    //         <p>Name: <input name="name" value="koa"></p>
    //         <p>Password: <input name="Password" type="password"></p>
    //         <p><input type="submit" value="Submit"></p>
    //     </form>`;
    ctx.render('index.html', {name: 'cjs'});
}

// 用户注册
var fn_register = async (ctx, next) => {
    var {name = '', password = '', email = ''} = ctx.query;
    console.log(`register with name: ${name}, password: ${password}, email: ${email}`)

    if (password === '') {
        ctx.response.body = '密码不能为空';
        return;
    }
    if (name === '') {
        ctx.response.body = '名字不能为空';
        return;
    }

    var md5 = crypto.createHash('md5'),
        password_md5 = md5.update(password).digest('hex');
    var newUser = new User({
        name,
        password,
        email
    });

    // 顺序执行
    var checkIfExit = await User.pGet(newUser.name);
    if (checkIfExit.code === 1) {
        ctx.response.body = '注册失败';
    } else if (checkIfExit.code === 0 && checkIfExit.result) {
        ctx.response.body = '注册失败，用户已存在';
    } else {
        var saveUser = await newUser.pSave();
        if (saveUser.code === 1) {
            ctx.response.body = '注册过程出错';
        } else {
            ctx.response.body = '注册成功';
        }
    }
}

var fn_register_p = async (ctx, next) => {
    var {name = '', password = '', email = ''} = ctx.request.body;
    console.log(`register with name: ${name}, password: ${password}, email: ${email}`)

    if (password === '') {
        ctx.response.body = {
            code: 1,
            msg: '密码不能为空'
        };
        return;
    }
    if (name === '') {
        ctx.response.body = {
            code: 1,
            msg: '名字不能为空'
        };
        return;
    }

    var md5 = crypto.createHash('md5'),
        password_md5 = md5.update(password).digest('hex');
    var newUser = new User({
        name,
        password,
        email
    });

    // 顺序执行
    var checkIfExit = await User.pGet(newUser.name);
    if (checkIfExit.code === 1) {
        ctx.response.body = {
            code: 1,
            msg: '注册失败'
        };
    } else if (checkIfExit.code === 0 && checkIfExit.result) {
        ctx.response.body = {
            code: 1,
            msg: '注册失败，用户已存在'
        };
    } else {
        var saveUser = await newUser.pSave();
        if (saveUser.code === 1) {
            ctx.response.body = {
                code: 1,
                msg: '注册过程出错'
            };
        } else {
            ctx.response.body = {
                code: 0,
                msg: '注册成功'
            };
        }
    }
}

// 用户登录
var fn_signin = async (ctx, next) => {
    // var name = ctx.request.body.name || '',
    //     password = ctx.request.body.password || '';
    var {name = '', password = ''} = ctx.query;

    var userGet = await User.pGet(name);
    if (userGet.code === 1) {
        ctx.response.body = '获取用户信息出错'
    } else if (userGet.code === 0 && !userGet.result) {
        ctx.response.body = '用户不存在'
    } else {
        if (userGet.result.password !== password) {
            ctx.response.body = '密码错误';
        } else {
            ctx.response.body = '登录成功';
        }
    }
}

var fn_signin_p = async (ctx, next) => {
    var {username = '', password = ''} = ctx.request.body;

    var userGet = await User.pGet(username);

    if (userGet.code === 1) {
        ctx.response.body = {
            code: 1,
            msg: '登录失败'
        }
    } else if (userGet.code === 0 && !userGet.result) {
        ctx.response.body = {
            code: 1,
            msg: '用户不存在'
        }
    } else {
        if (userGet.result.password !== password) {
            ctx.response.body = {
                code: 1,
                msg: '密码错误'
            }
        } else {
            ctx.session.user = userGet.result;
            ctx.response.body = {
                code: 0,
                msg: '登录成功',
                data: filterUserInfo(ctx.session.user)
            }
        }
    }
}

// 用户登出
var fn_signout = async (ctx, next) => {
    ctx.session.user = undefined;
    ctx.response.body = '登出';
}

var fn_signout_p = async (ctx, next) => {
    ctx.session.user = undefined;
    ctx.response.body = {
        code: 0,
        msg: '登出成功'
    };
}

// 获取用户状态
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

// 是否未登录
var checkNotLogin = (ctx, next) => {
    if (ctx.session.user) {
        return false;
    }
    return true;
}

// 是否已登录
var checkLogin = (ctx, next) => {
    if (!ctx.session.user) {
        return true;
    }
    return false;
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
    'GET /ife/thpoker': fn_index,
    'GET /ife/thpoker/api/user/register': fn_register,
    'POST /ife/thpoker/api/user/register': fn_register_p,
    'GET /ife/thpoker/api/user/signin': fn_signin,
    'POST /ife/thpoker/api/user/signin': fn_signin_p,
    'GET /ife/thpoker/api/user/signout': fn_signout,
    'POST /ife/thpoker/api/user/signout': fn_signout_p,
    'GET /ife/thpoker/api/user/status': fn_userStatus
}