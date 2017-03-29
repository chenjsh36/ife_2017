var koa = require('koa');
var app = new koa();

// x-response-time

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// response

app.use(function *(){
  this.body = 'Hello World';
});

app.use(function *pageNotFound(next) {
	yield next;

	if (404 !== this.status) return;

	this.status = 404;

	switch(this.accepts('html', 'json')) {
		case 'html':
			this.type = 'html';
			this.body = '<p>page not found</p>';
			break;
		case 'json': 
			this.body = {
				message: 'Page not found'
			};
			break;
		default: 
			this.type = 'text';
			this.body = 'Page Not Found';
	}
})

app.listen(3000);