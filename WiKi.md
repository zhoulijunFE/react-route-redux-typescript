## 项目结构规划
```
docs                                 # 项目文档
tests                               # 其他测试文件
mock                                # mock server/data
node_modules                        
src                                 # 项目源码
|-- module                         # 项目模块(只有一个模块,这层目录可以省略)
|   |-- components                 # 组件组件
|   |   |-- *.tsx
|   |-- actions                    # 项目action
|   |   |-- actionType.ts
|   |   |-- action.ts         
|   |-- reducers                   # 项目reducer
|   |   |-- index.ts
|   |-- containers                 # 项目view 
|   |   |-- *.tsx
|   |-- service                    # 项目service
|   |   |-- *.ts
|   |-- css                        # 项目css
|   |   |-- *.scss
|   |   |-- index.ts
|   |-- locale                     # 国际化文件
|   |-- route.ts                   # 模块入口路由定义(按需加载)
|   |-- index.tsx                  # 模块入口引入文件
|   |-- routes.ts                  # 模块入口子路由定义
|-- public                         # 项目静态资源公共目录
|   |-- css                        # 公共CSS目录
|   |   |-- common.scss
|   |-- img                        # 公共图片目录
|   |   |-- xx.png
|-- util                           # 公共util目录
|   |-- *.ts
index.html                         # 访问的入口
entry.tsx                          # js入口文件
|-- App.tsx                        # 初始化redux store\国际化
webpack.config.js                  # 公共配置
webpack.dev.js                     # 开发配置
webpack.release.js                 # 发布配置
tsconfig.js                        # ts配置文件
package.json                        
READNE.md
```
-   http://div.ioopic/1782

## 基本代码结构生成
-  https://github.com/StevenIseki/react-router-webpack-example
-  https://github.com/xiaoyann/webpack-react-redux-es6-boilerplate
-  https://facebook.github.io/react/docs/installation.html#creating-a-new-application

## redux引入, 结合react
![image](http://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png) 

-   action(异步action, 添加thunk-middleware中间件)
```
const requestRegister = () => ({
type: actionType.REQUEST_REGISTER
})

const receiveRegister = (register: object) => ({
type: actionType.RECEIVE_REGISTER,
register
})
```
- dipatch()
```
export const fetchRegister = (opts?:object) => (dispatch:any, getState:Function) => {
dispatch(requestRegister())
return service.register(opts).then(data => {
dispatch(receiveRegister(data))
}, data => {
dispatch(receiveRegister(data))
})
}
```
- reducer
```
const register = (state = {}, action:any) => {
switch (action.type) {
case actionType.RECEIVE_REGISTER:
return action.register
default:
return state
}
}
```
- redux结合react
- 将 react 组件连接到 Redux 并且让它能够 dispatch actions 以及从 Redux store 读取到 state
- 引入react-redux提供的 Provider，并且在渲染之前将根组件包装进 <Provider>
```
<Provider store={store}>
<App/>
</Provider>
``` 
- react-redux 提供的 connect() 方法将包装好的组件连接到Redux
- mapStateToProps: 把当前 Redux store state 映射到展示组件的 props 中(代替store.subscribe())
- mapDispatchToProps: 方法接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
```
const mapStateToProps = (state:any, ownProps:any) => {
const { register } = state;
return {
register
}
}
export default connect(
mapStateToProps
)(App);
```

- 引入React Redux
```
this.props.dispatch(fetchRegister());
```
- redux详细讲解
-  http://cn.redux.js.org/docs/basics/DataFlow.html

## typescript引入
- ts实现例子
- https://github.com/Microsoft/TypeScript-React-Conversion-Guide
- https://github.com/Microsoft/TypeScript-React-Starter

- tsconfig.js基本配置(webpack ts-loader读取)
```
{
"compilerOptions": {
"outDir": "./dist/", 
"sourceMap": true,
"noImplicitAny": true, //支持:any
"module": "commonjs", //模块编译支持commonjs(node写法)
"target": "es5",  //被编译es5
"jsx": "react",
"lib": ["es2017", "dom"] //ts编译库
},
"include": [
"./src/**/*",
"./custom.d.ts"
]
}
```
- ts声明方式:
- 1)  package.json @types引入: https://www.npmjs.com/package/@types/react(替换对应)
```
判断types中是否存在:
npm install typings --global
typings search --name react(替换存在的项目)
```
- 2) declare module * (declare var * ) 声明模块(js变量)

- typescrip详细讲解
- https://www.typescriptlang.org/docs

## react-router引入
- 路由基本
```
routes() {
return <Route path='/' component={Index}>
{RegisterRoute}
</Route>
}
调用:
<Provider store={store}>
<Router history={hashHistory} routes={this.routes()}></Router>
</Provider>
```
- 模块化路由按需加载(webpack会require独立分片文件, 实现按路由拆分文件)
```
const route =
(<Route path="register"
getComponent={(location:any, callback:any) => {
require.ensure([], function (require: any) {
const Index = require('./index')['default'];
callback(null, Index.App);
}, 'register');---> webpack: chunkFilename: [name]
}}
getChildRoutes={(location:any, callback: any) => {
require.ensure([], function (require:any) {
const Index = require('./index')['default'];
callback(null, Index.routes);
}, 'register');
}}>
</Route>);
export default route;
```
- http://blog.zhaiyifan.cn/2016/11/16/pwa-react-p2/
- http://robin-front.github.io/2016/04/18/react-router%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%E4%B8%8EWebpack%E5%88%86%E7%89%87thunks/

- react-router详细讲解
- https://react-guide.github.io/react-router-cn/docs/Introduction.html

## promise、fetch引入
- promise:  可用于:异步调用比如 ajax多层嵌套的处理方式:  promise then 、async await(基于promise实现)
```
var promise = new Promise(function(resolve, reject) {
if (/* 异步操作成功 */){
resolve(value);
} else {
reject(error);
}
});

then: 链式操作 \ catch异常处理
- then添加resolve, reject两个函数传入到new Promise(function(resolve, reject))
- then中包含return, 会继续执行下一个then, 不会退出整个promise
promise.then(function(value) {
// success
}, function(value) {
// failure
}).catch(function(error) {
// error deal
});
```
- fetch: 封装了ajax、Promise实现, fetch函数内部操作promise对象. 
比如respons.json(), 但fetch外部方法handle等返回promise对象,需要嵌套promise)
```
fetch('url')  
.then(function(response) {
if(response.status === 200){ // 先判断response status
return response.json(); //response.json()是promise对象
}  
})  
.then(function(data) {  
return Promise.resolve(data); 
})  
.catch(function(error) {  
log('Request failed', error)  
});
```
- fetch组合promise
```
return new Promise((resolve, reject) => { //否则需要resolve, reject地方都需要return Promise.resolve()  
fetch(url, {
credentials: 'include',
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json',
"X-Requested-With": "XMLHttpRequest",
"x-source": "web"
},
body: opts
})
.then(response => {
if (checkStatus(response)) {
return response.json();
}
})
.then(data => {
if (checkCode(data)) {
resolve(data);
} else {
reject();
}
}).catch(error => {
handleError(reject, error)
})
})
}
```

- promise详细讲解
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
- https://developers.google.com/web/fundamentals/getting-started/primers/promises?hl=zh-cn
- https://wohugb.gitbooks.io/ecmascript-6/content/docs/promise.html

- fetch详细讲解
- https://developers.google.com/web/updates/2015/03/introduction-to-fetch
- fetch http参数设置: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

## webpack
- 编译ts、tsx-->读取tsconfig.js                      
```
{ test: /\.tsx?$/, use: 'ts-loader' }, //ts loader  早于 js loader
```
- 编译js、jsx
```
{ test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' }
```
- 编译scss、css
```
{
test: /.css$/,
use: ExtractTextPlugin.extract({ ---> ExtractTextPlugin处理css分片
fallback: "style-loader",
use: "css-loader!sass-loader"
})
}
plugins引入: new ExtractTextPlugin('[name]-[chunkhash:8].css')
```
- 分离css、js bundle
- webpack css: ExtractTextWebpackPlugin
- webpack js: CommonsChunkPlugin
```
entry: {
vendor: ['react', 'react-redux', 'redux-thunk', 'react-router']
}
plugins定义:  new webpack.optimize.CommonsChunkPlugin({
name: ['vendor']
})
```
- 代码动态分离：require.ensure()

- 压缩 js、css
```
new webpack.optimize.UglifyJsPlugin({
compress: {
warnings: false
}
}),
```
- md5 js、css
```
filename: '[name]-[hash].min.js', -->entry中定义hash
chunkFilename: '[name].[chunkhash:8].js', -->分片文件hash
```
- html template 动态生成
```
index初始模板: <%= htmlWebpackPlugin.options.title %>
plugins:定义
new HtmlWebpackPlugin({
filename: 'index.html',
template: path.join(__dirname, 'index.html'),
chunks: ['vendor', 'index'],
inject: 'body',
title: '基础搭建',
jsPath: staticPath,
isColumbus: isColumbus,
locale: isColumbus ? 'en_US' : 'zh_CN',
}),
```
- 环境变量featureFlag定义、替换-->代码中引用process.env. NODE_ENV替换isProduction
```
new webpack.DefinePlugin({
'process.env': {
'NODE_ENV': isProduction
}
}),
```
- 支持开发、测试、发布打包区分
```
package.json添加
"compile": "rm -rf ./dist ./web-user.tar.gz && webpack --config webpack.config.js && tar -zcvf web-user.tar.gz ./dist ",
"build": "cross-env NODE_ENV=production npm run compile",
"build-columbus": "cross-env NODE_ENV=production COLUMBUS=true npm run compile"
```
- 支持开发、测试、发布 静态资源前缀路径配置
```
const staticPath = process.env.DEV_TEST === 'true' ? 's1.test.*' : 's1.*.*';
new HtmlWebpackPlugin({
staticPath: 'index.html'
})
```
- 支持源码打包, chrome源码调试
```
devtool: 'source-map',
```
- 支持静态资源打包copy
```
new CopyPlugin([
{
from: vendorsPath,
to: './vendors/',
force: false,
}
```
- 支持变更热编译,浏览器自动刷新
```
//待补充
```
- webpack详细讲解
- https://doc.webpack-china.org
- https://fakefish.github.io/react-webpack-cookbook/index.html
- 打包原理: https://cnodejs.org/topic/5867bb575eac96bb04d3e301

## 国际化实现
```
//待补充
```

## mock server模拟
- fetch-mock研究:
- http://www.wheresrhys.co.uk/fetch-mock/
- express-mock研究: 
- 原理: 1)web-dev-server开一个端口为port1: mock server   2)express 开一个端口为port2: proxy server  3)express路由匹配方式，返回假数据

- 支持本地访问， ip可访问
```
//待补充
```
- fetch-mock vs express-mock: 
- fetch-mock没有真正发送http请求,所有本地mock可以模拟各种 http status  
- fetch-mock data支持热编译 
- express-mock支持本地跨域请求远程服务器, 并且可以真实登录数据
- express-mock支持部分接口mock,部分接口走远程

- express详细讲解
- http://www.expressjs.com.cn/guide/routing.html
