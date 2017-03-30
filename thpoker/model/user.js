
var mongodb = require('./db');
var settings = require('../settings.js');
var crypto = require('crypto');

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
};

module.exports = User;

//存储用户信息
User.prototype.save = function(callback) {
    var md5 = crypto.createHash('md5'),
        email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
        head = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";
    //要存入数据库的用户信息文档
    var user = {
        name: this.name,
        password: this.password,
        email: this.email,
        head: head
    };
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.authenticate(settings.username, settings.password, function() {
            db.collection('users', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);//错误，返回 err 信息
                }
                //将用户数据插入 users 集合
                collection.insert(user, {
                    safe: true
                }, function (err, user) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, user[0]);//成功！err 为 null，并返回存储后的用户文档
                });
            });      
        })

    });
};

User.prototype.pSave = function() {
    var md5 = crypto.createHash('md5'),
        email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
        head = 'http://www.gravatar.com/avatar/' + email_MD5 + '?s=48';
    var user = {
        name: this.name,
        password: this.password,
        email: this.email,
        head: head
    };
    var promise = new Promise((resolve, reject) => {
        mongodb.open((err, db) => {
            if (err) {
                reject({
                    code: 1,
                    msg: err
                });
                return;
            }
            db.authenticate(settings.username, settings.password, () => {
                db.collection('users', (err, collection) => {
                    if (err) {
                        reject({
                            code: 1,
                            msg: err
                        });
                        return;
                    }
                    collection.insert(user, {
                        safe: true
                    }, (err, user) => {
                        mongodb.close();
                        if (err) {
                            reject({
                                code: 1,
                                msg: err
                            });
                            return;
                        }
                        resolve({
                            code: 0,
                            result:user[0]
                        });
                    })
                })                
            })

        })
    });
    return promise;
}


//读取用户信息
User.get = function(name, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        db.authenticate(settings.username, settings.password, function() {
            //读取 users 集合
            db.collection('users', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);//错误，返回 err 信息
                }
                //查找用户名（name键）值为 name 一个文档
                collection.findOne({
                    name: name
                }, function (err, user) {
                    mongodb.close();
                    if (err) {
                        return callback(err);//失败！返回 err
                    }
                    callback(null, user);//成功！返回查询的用户信息
                });
            });      
        })

    });
};


User.pGet = function(name) {
    var promise = new Promise((resolve, reject) => {
        mongodb.open((err, db) => {
            if (err) {
                reject({
                    code: 1,
                    msg: err
                });
                return;
            }
            db.authenticate(settings.username, settings.password, () => {
                db.collection('users', (err, collection) => {
                    if (err) {
                        mongodb.close();
                        reject({
                            code: 1,
                            msg: err
                        });
                        return;
                    }
                    collection.findOne({
                        name: name
                    }, (err, user) => {
                        mongodb.close();
                        if (err) {
                            reject({
                                code: 1,
                                msg: err
                            });
                            return;
                        }
                        resolve({
                            code: 0,
                            result: user
                        });
                    })
                })
            })
        })
    })
    return promise;
}