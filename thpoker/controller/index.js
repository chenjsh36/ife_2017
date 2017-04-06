var User = require('../model/user.js');
var crypto = require('crypto');

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

// 用户登出
var fn_signout = async (ctx, next) => {
    ctx.session.user = undefined;
    ctx.response.body = '登出';
}

var checkNotLogin = (ctx, next) => {
    if (ctx.session.user) {
        return false;
    }
    return true;
}

var checkLogin = (ctx, next) => {
    if (!ctx.session.user) {
        return true;
    }
    return false;
}

module.exports = {
    'GET /ife/thpoker/user/register': fn_register,
    // 'POST /ife/thpoker/user/register': fn_register,
    'GET /ife/thpoker': fn_index,
    'GET /ife/thpoker/user/signin': fn_signin,
    // 'POST /ife/thpoker/user/signin': fn_signin
    'GET /ife/thpoker/user/signout': fn_signout
}