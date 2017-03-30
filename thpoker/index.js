const koa = require('koa');
const auth = require('koa-basic-auth');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('nunjucks');
const session = require('koa-session');
const controller = require('./controller.js'); // 路由控制器
const staticFiles = require('./static-files');
const templating = require('./templating.js');

const isProduction = process.env.NODE_ENV === 'production';
const app = module.exports = new koa();

// x-response-time
// app.use(function *(next){
//   var start = new Date;
//   yield next;
//   var ms = new Date - start;
//   this.set('X-Response-Time', ms + 'ms');
// });
app.use(async (ctx, next) => {
    var start = new Date;
    await next();
    var ms = new Date - start;
    ctx.set('X-Response-Time', ms + 'ms');
    console.log('X-Response-Time:', ms + 'ms');
})

// logger
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// use session
const CONFIG = {
    key: 'koa:sess', // (string) cookie key (default is koa:sess)
    maxAge: 86400000, // (number) maxAge in ms (default is 1 days)
    overwrite: true, // (boolean) can overwrite or not (default true)
    httpOnly: true, // (boolean) httpOnly or not (default true)
    signed: false, // (boolean) signed or not (default true)
    // store: external session stores  
};
app.use(session(CONFIG, app));
// or if you prefer all default config, just use => app.use(session(app));
// app.use(ctx => {
//   // ignore favicon
//   if (ctx.path === '/favicon.ico') return;

//   let n = ctx.session.views || 0;
//   ctx.session.views = ++n;
//   ctx.body = n + ' views';
// });

// parse request body
app.use(bodyParser());

// 处理静态文件
app.use(staticFiles('/static/', __dirname + '/static'));

app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller
app.use(controller());

if (!module.parent) app.listen(3080);