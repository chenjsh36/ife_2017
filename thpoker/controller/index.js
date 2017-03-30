var User = require('../model/user.js');
var crypto = require('crypto');

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

    await User.get(newUser.name, (err, user) => {
        if (err) {
            console.log('注册失败', err);
            ctx.response.body = err;
            return;
        }
        if (user) {
            console.log('用户已经存在');
            ctx.response.body = '用户已经存在';
            return;
        }
        newUser.save((err, user) => {
            if (err) {
                console.log('注册过程出错！');
                ctx.response.body = '注册过程出错！';
                return;
            }
            console.log('注册成功');
            ctx.response.body = '注册成功'
            return;
        })
    })
    // ctx.response.body = '注册中...';
}

var fn_index = async (ctx, next) => {
    // ctx.response.body = `<h1>Index</h1>
    //     <form action="/signin" method="post">
    //         <p>Name: <input name="name" value="koa"></p>
    //         <p>Password: <input name="Password" type="password"></p>
    //         <p><input type="submit" value="Submit"></p>
    //     </form>`;
    ctx.render('index.html', {name: 'cjs'});
}

var fn_signin = async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';

    console.log(`signin with name: ${name}, password: ${password}`);

    if (name === 'koa' && password === '12345') {
        ctx.response.body = '<h1>Welcome, ${name}</h1>';
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
                            <p><a href="/ife/thpoker">Try again</a></p>`;
    }
}

module.exports = {
    'GET /ife/thpoker/user/register': fn_register,
    'GET /ife/thpoker': fn_index,
    'POST /ife/thpoker/signin': fn_signin
}