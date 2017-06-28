var MockUtil = require("../../index");
var mockUtil = new MockUtil()

mockUtil.addRouter('get', '/register', require("./register"), 200, true)

module.exports = mockUtil.getRouters();