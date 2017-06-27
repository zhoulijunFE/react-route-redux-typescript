# README

## INSTALLATION

To install the latest version of jgui, set npm registry to jingoal private registry:

```shell
$ npm run registry:jingoal
$ npm install
```

If the latest version of [react-dynamic-formbuilder](https://www.npmjs.com/package/react-dynamic-formbuilder) is not in
the private registry, set the registry back to public registry and reinstall react-dynamic-formbuilder:

```shell
$ npm run registry
$ npm install react-dynamic-formbuilder
```

## USAGE

### Running demo page

To run the integration demo, go to the docs folder.

1. Follow the installation tip in the INSTALLATION section.

2. Optional: To run the demo using your local **react-dynamic-formbuilder** package:

    1. Create a symlink in gigaform-fe/Deps folder that points to the FormBuilder folder:

        Linux:
        ```shell
        ln -s ~/../FormBuilder ~/../gigaform-fe/Deps/FormBuilder
        ```

        Windows:
        ```shell
        mklink FormBuilder "..\Deps\FormBuilder"
        ```

    2. Run the demo:
        ```shell
        npm start
        ```

3. To run the demo using the published **react-dynamic-formbuilder** package:

    ```shell
    npm run start:prod
    ```

## 安装

将npm registry设置为jingoal private registry以安装最新版本的jgui：

```shell
$ npm run registry:jingoal
$ npm install
```

如果最新版本的[react-dynamic-formbuilder](https://www.npmjs.com/package/react-dynamic-formbuilder)没有被收入private registry，将npm registry设置为public registry并重新安装
react-dynamic-formbuilder：

```shell
$ npm run registry
$ npm install react-dynamic-formbuilder
```

## 使用

### 运行Demo

进入docs文件夹。

1. 按照安装提示进行安装.

2. 可选： 使用本地**react-dynamic-formbuilder**环境运行demo:

    1. 在gigaform-fe/Deps文件夹内建立一个连接到指定的FormBuilder文件夹:

        Linux:
        ```shell
        ln -s ~/../FormBuilder ~/../gigaform-fe/Deps/FormBuilder
        ```

        Windows:
        ```shell
        mklink FormBuilder "..\Deps\FormBuilder"
        ```

    2. 运行demo:
        ```shell
        npm start
        ```

3. 使用已发布的**react-dynamic-formbuilder**运行demo:

    ```shell
    npm run start:prod
    ```