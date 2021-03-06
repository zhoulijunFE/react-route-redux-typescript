
## 技术选择
react + redux + react-route + typescript + webpack2

- typeScript: 
  - JavaScript 的超集，支持所有的 JavaScript 语法
![image](https://3.bp.blogspot.com/-si6WAHEbA0g/Vz1PDHFPIOI/AAAAAAAADDs/i883_L0cVLQrLb-j7J6YPkwiM5MYWp4pwCK4B/s400/venn_typescript_es6_es5.png)
  - 强类型语言-静态类型检查
  - 添加class、interface、module、enum,
  - 限制存在范围：public、private、protected 
- webpack2: 
  - Tree Shaking
  - https://juejin.im/post/591e5d9f44d904006ca39944

## 项目结构规划
```
tests                              # 其他测试文件
mock                               # mock
node_modules                       #    
src                                # 项目源码
|-- common                         # 公共页面、组件
|-- public                         # 项目静态资源公共目录
|   |-- css                        # 公共CSS目录
|   |   |-- common.scss
|   |-- img                        # 公共图片目录
|   |   |-- xx.png
|-- module                         # 项目模块(只有一个模块,这层目录可以省略)
|   |-- components                 # component
|   |   |-- *.tsx
|   |-- views                      # view
|   |   |-- *.tsx
|   |-- actions                    # action
|   |   |-- actionType.ts
|   |   |-- action.ts         
|   |-- reducers                   # reducer
|   |   |-- index.ts
|   |-- service                    # service
|   |   |-- *.ts
|   |-- statics                    # css、img
|   |   |-- *.scss
|   |   |-- index.ts
|   |-- locale                     # 国际化文件
|   |-- route.ts                   # 模块入口路由定义(按需加载)
|   |-- index.tsx                  # 模块入口引入文件
|   |-- routes.ts                  # 模块入口子路由定义
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

## 项目骨架
-  https://github.com/Microsoft/TypeScript-React-Conversion-Guide

  ## webpack
 - 从0到1 webpack搭建过程
   - 解析依赖树入口文件
   - 编译后文件输出(hash输出)
   - loader
     - 编译 tsx、jsx、es6
     - 编译 scss(内联样式)
     - 编译 font、image
     - 编译 json
     - css 添加浏览器兼容前缀
   - 分离
     - js (应用、公共库分离)
     - css(css内联样式-外联样式)
     - 代码分离(按需加载)
   - 压缩 js、css
   - 打包源码
   - 全局替换指定字符串
   - 开发、测试、生产、英文版环境配置
   - html title、static path、favicon.ico动态配置
   - 按需加载合并 js、css
   - 本地接口模拟服务(TODO)
   - 语法检查: tslint、eslint(TODO)

  - 解析依赖树入口文件
```
  entry: {
   index: path.resolve(__dirname, './src/entry.tsx')
}

1）单入口： entry: './path/to/my/entry/file.js'
2）应用、公共库分离：  
    entry: {
        index: path.resolve(__dirname, './src/entry.tsx'),
        vendor: ['react', 'react-redux', 'redux-thunk', 'react-router']
    }
    CommonsChunkPlugin从中抽取vendor 相关模块，独立引入
3）多页面入口：
    entry: {
        pageOne: './src/pageOne/index.js',
        pageTwo: './src/pageTwo/index.js'
    ｝
```
 - 编译后文件输出(hash输出)  
```
 output: {
    filename: '[name].js'
    path: path.resolve(__dirname, 'dist')
 }

1）多个入口起点，但只指定一个输出配置
2）多入口、单入口
    [id] 被 chunk 的 id 替换。
    [name] 被 chunk 的 name 替换（或者，在 chunk 没有 name 时使用 id 替换）。
    [hash] 被 compilation 生命周期的 hash 替换。
    [chunkhash] 被 chunk 的 hash 替换。

3）你用了哈希（[hash] 或 [chunkhash]），请确保模块具有一致的顺序。可以使用 OccurrenceOrderPlugin 或 recordsPath
```
  - loader
```
test：loaders所处理的文件的扩展名的正则表达式（必须）
loader：loader的名称（必须）
include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
query、options：为loaders提供额外的设置选项（可选）
```
  ```
 编译js、jsx:
 .babelrc [http://www.ruanyifeng.com/blog/2016/01/babel.html]
    {
      "presets": [-->设置转码规则
        "react",
        "es2015",
        "stage-0"
      ],
      "plugins": [
        "transform-runtime"-->减少重复_extend
      ]
    }

 { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' }
  ```
  
  ```
  编译ts、tsx-->读取tsconfig.js  vs ts-loader
  { test: /\.tsx?$/, use: 'awesome-typescript-loader' }
    
  ```
  
  ```
  编译scss、css(内联样式):
  { test: /.s?[ac]ss$/, use:style-loader!css-loader!sass-loader}
  ```
  
  ```
  编译font、image
  { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'url-loader' },
  { test: /\.(png|svg|jpg|gif)$/, use: 'url-loader' }
  ```
  
  ```
  编译 json:(webpack2默认支持)
  { test: /\.json$/, use: 'json-loader' }
  ```
  ```
  css 添加浏览器兼容前缀(postcss-loader->autoprefixer)：
   {
    test: /.s?[ac]ss$/,
        fallback: "style-loader",
        use: ["css-loader", {
            loader: 'postcss-loader',
            options: {
                plugins: function () {
                    return [autoprefixer]
                }
            }
        }, "sass-loader"]
 }
 ```

   - 分离
   
```
js(应用、公共库分离):
 entry: {
   vendor : ['react', 'react-redux', 'redux-thunk', 'react-router']
 }
 new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor ']
 })
```
```
css(外联样式):
 {
    test: /.s?[ac]ss$/,
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: ["css-loader", "sass-loader"]
    })
}
new ExtractTextPlugin(
{
    'filename': '[name]-[chunkhash:8].css'
})
```
```
代码分离(按需加载):-->webpack2替换import
require.ensure(
   dependencies: String[], 
   callback: function(require), 
   chunkName: String
)
```
  - 压缩 js、css(warning处理)
```
    new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    sourceMap: true
})
```
  - 打包源码
```
devtool: 'source-map',
```
  - 全局替换指定字符串
```
    new webpack.DefinePlugin({
    'process.env': env
})
```
   - 开发、测试、生产、英文版环境配置、域名路径区分
```
   package.json:
   "build": "cross-env NODE_ENV=production npm run compile"
   
   const staticPath = process.env.NODE_ENV ? '/' : 's1.*'
   
```
   - html title、static path、favicon.ico动态配置
  ```
       index.html模板:  <%= htmlWebpackPlugin.options.title %>
       
new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'index.html'),
      chunks: ['vendor', 'index'],
      inject: 'body',
      title: '基础搭建',
      staticPath: staticPath
})
  ```
  - 自动解析扩展名(默认js、json)
```
resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
}
```

  
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
"exclude": [                  //排除文件,默认outDir、node_modules
 ]
}
```
- ts声明方式:
  - package.json @types引入: https://www.npmjs.com/package/@types/react

  - declare module * (declare var * ) 声明模块(js变量)


## react-router引入
- 基于路由的分块

```
react-route: getChildRoutes、getIndexRoute、getComponents异步方法
const route =
(
<Route path="register"
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