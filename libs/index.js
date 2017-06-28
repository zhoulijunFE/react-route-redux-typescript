var lodash  = require('lodash')
var express = require('express')

function MockUtil() {
    this.routers = [];
}

MockUtil.prototype.addRouter = function(method, url, fn, httpStatus, neverRemote) {
    method = method || 'get';
    var r = express.Router();
    httpStatus = httpStatus ? httpStatus : 200;
    if (lodash.isPlainObject(fn)) {
        var result = fn;
        fn = function (req, res, next) {
            if (process.env.REMOTE_DEBUG.toString() === 'false' || neverRemote) {
                res.status(httpStatus).send(JSON.stringify(result));
            } else {
                next();
            }
        }
    }
    r[method.toLowerCase()](url, fn);
    this.routers.push(r);
}

MockUtil.prototype.addRouters = function(routers, prefix) {
    prefix = prefix || '';
    for(var i = 0, len = routers.length; i < len; i++) {
        var router = routers[i];
        this.addRouter(
            router.method,
            prefix + router.url,
            router.response,
            router.httpStatus || 200,
            !!router.neverRemote
        );
    }
}

MockUtil.prototype.getRouters = function() {
    return this.routers;
}

module.exports = MockUtil;