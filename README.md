
## Features
- 支持react、redux、typescript.
- 支持react-route按需加载.
- 支持webpack
- 支持fetch mock.

## Development

```
npm install
npm install cross-env
npm start
```
Open your browser and visit http://127.0.0.1:4000

## 技术选择
react + redux + react-route + typescript + webpack2

- typeScript: 
- JavaScript 的超集，支持所有的 JavaScript 语法
![image](https://3.bp.blogspot.com/-si6WAHEbA0g/Vz1PDHFPIOI/AAAAAAAADDs/i883_L0cVLQrLb-j7J6YPkwiM5MYWp4pwCK4B/s400/venn_typescript_es6_es5.png)
- 强类型语言-静态类型检查
- 添加class、interface、module、enum
- 限制存在范围：public、private、protected 
- webpack2: 
- //待补充

## 项目结构规划
```
docs                               # 项目文档
tests                              # 其他测试文件
mock                               # mock
node_modules                       #    
src                                # 项目源码
|-- common                         # 公共页面、组件
|-- module                         # 项目模块(只有一个模块,这层目录可以省略)
|   |-- components                 # component
|   |   |-- *.tsx
|   |-- actions                    # action
|   |   |-- actionType.ts
|   |   |-- action.ts         
|   |-- reducers                   # reducer
|   |   |-- index.ts
|   |-- views                      # view
|   |   |-- *.tsx
|   |-- service                    # service
|   |   |-- *.ts
|   |-- statics                    # css、img
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
|-- config                         # 环境变量配置(开发、测试、线上)
|   |-- *.ts
index.html                         # 访问的入口
entry.tsx                          # js入口文件
App.tsx                            # 初始化redux store、国际化
webpack.config.js                  # 公共配置
tsconfig.js                        # ts配置文件
package.json                        
READNE.md
```

## 基本代码结构生成
-  https://github.com/Microsoft/TypeScript-React-Conversion-Guide

## typescript
- tsconfig.js: 存在目录是TypeScript的根目录(webpack awesome-typescript-loader读取)
```
{
"compilerOptions": {
  "outDir": "./dist/",        //输出目录
  "sourceMap": true,          //生成相应的.map文件
  "target": "es5",            //被编译目标js版本
  "module": "commonjs",       //模块编译支持commonjs(node+es5)
  "moduleResolution": "Node", //处理模块(Classic)
  "jsx": "react",             //.tsx文件里支持JSX
  "lib": ["es6", "dom"]       //编译时需要引入的库文件的列表
  "noImplicitAny": true,      //支持any
  "noUnusedLocals": true,     //若有未使用的局部变量则抛错
  "noUnusedParameters": true  //若有未使用的参数则抛错
  "strictNullChecks": true    //null和undefined，只允许用它们自己和any来赋值（有个例外，undefined可以赋值到void）
},
"include": [                  //编译包含路径
  "./src/**/*",               // **/递归匹配任意子目录, *或.*，那么仅有支持的文件扩展名类型被包含在内（.ts、.tsx、.d.ts)
  "./custom.d.ts"
],
"exclude": [//排除文件,默认outDir、node_modules
 ]
}
```
- ts声明方式:
  - package.json @types引入: https://www.npmjs.com/package/@types/react

  - declare module * (declare var * ) 声明模块(js变量)

  ## webpack
 - 从0到1 webpack搭建过程
   - 解析依赖树入口文件、编译后文件
   - 网页入口文件index.html
   - 编译 tsx、jsx、es6
   - 编译 scss
   - 编译 font、image
   - 编译 json
   - 模块化包装合并资源
   - 引入静态资源到相应 html 页面
   - 文件 hash 后缀，处理缓存
   - 压缩 js、css
   - 全局替换指定字符串
   - css 添加浏览器兼容前缀
   - js源码打入
   - 开发、测试、生产、英文版环境配置
   - html title、static path、favicon.ico动态配置
   - 按需加载合并 js、css
   - css内嵌js-独立引入(遗留异步模块化)
   - 本地接口模拟服务
   - 语法检查: tslint、eslint

  - 解析入口文件、编译后文件
```
 entry: {
    index: path.resolve(__dirname, './src/entry.tsx')
 }
   
 output: {
    filename: '[name].js'
    path: path.resolve(__dirname, 'dist')
 }
 
 index.html:  script src -->index.js
```
  - 编译js、jsx
  ```
    { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' }
  ```
   - 编译ts、tsx-->读取tsconfig.js                      
  ```
    { test: /\.tsx?$/, use: 'awesome-typescript-loader' }
    
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
       //TODO(zhoulj)
     ```
   - webpack详细讲解
     - https://doc.webpack-china.org
     - https://fakefish.github.io/react-webpack-cookbook/index.html
     - https://mrshi.gitbooks.io/survivejs_webpack_chinese/chapter3-3.html
     - 打包原理: https://cnodejs.org/topic/5867bb575eac96bb04d3e301
     

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