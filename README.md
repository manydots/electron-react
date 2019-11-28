
<div align="center">

[![](https://flat.badgen.net/npm/v/jeea?icon=npm)](https://www.npmjs.com/package/jeea) [![NPM downloads](http://img.shields.io/npm/dm/jeea.svg?style=flat-square)](https://www.npmjs.com/package/jeea)
</div>

### electron-react

[taobao镜像electron资源下载](https://npm.taobao.org/mirrors/electron/)

[electron-builder配置](https://segmentfault.com/a/1190000017296201)

### details
```javascript
 	
 	1、使用JavaScript, HTML 和 CSS 构建跨平台的桌面应用
 	
 	2、基于electron、nodejs构建的跨平台的桌面应用(演示windos平台打包简单配置)

 	3、electron-builder打包时出现异常错误，可根据提示的版本手动去下载资源包并解压。
 		C:\Users\用户\AppData\Local\electron\Cache\electron-v7.1.2-win32-x64.zip
 		C:\Users\用户\AppData\Local\electron-builder\Cache\nsis\nsis-3.0.4
		C:\Users\用户\AppData\Local\electron-builder\Cache\winCodeSign\winCodeSign-2.4.0

	4、electron-builder打包前，执行2次 npm run dev:webpack(资源更改打包时，不拷贝资源)

``` 

### update
```javascript
  
  0.0.4 简单尝试react-router-dom5路由嵌套，也可用react-router3嵌套<Layout /> <Page />

  0.0.3 首页添加自定义关闭、最小化菜单，使用-webkit-app-region: drag,
  		-webkit-user-select:none拖拽;electron挂在全局，生产下模式使用；

  0.0.2 修改README；

  0.0.1 基础使用(可考虑不使用React.lazy、React.Suspense，打包资源整合在一起)；

``` 