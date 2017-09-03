var MockUtil = require("jgfe-lib/mock");
var mockUtil = new MockUtil()

mockUtil.addRouter('get', '/mgt/register', require("./register"), 200, true)

module.exports = mockUtil.getRouters();