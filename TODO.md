# GeoAR.js显示物标
- [x] 搭建一个简易服务器  
  使用node.js express
- [x] 获取PC设备当前位置
  navigator.geolocation.getCurrentPosition()
- [x] 在视区内显示一个简单物标  
  位置固定
- [x] 使用手机作为终端进行演示  
  什么也不用安装，**手机链接在电脑热点**上输入网址：
  ```
  电脑ip:8080
  ```
  ***注:***    
  *需要关闭电脑防火墙*  

手机报错如下,引出下一条问题：  

- [x] 1. 
```
Please activate Geolocation and refresh the page. If is already active, please check permissions for this website.
请激活地理位置并刷新页面。 如果已经处于活动状态，请检查该网站的权限。
```  
- [x] 2. 
```
Webcam Error
Name: NotAllowedError
Message:The request is not allowed by the user agent or the platform in the current context.
网络摄像头错误
名称：NotAllowedError
消息：在当前上下文中，用户代理或平台不允许该请求。
Webcam Error
Name: NotSupportedError
Message: Only secure origins are allowed (see: https://goo.gl/Y0ZkNV)
网络摄像头错误
名称：NotSupportedError
消息：仅允许x安全来源（请参阅：https：//goo.gl/Y0ZkNV）
```
- [x] ***UC浏览器可以解决以上问题，但是默认开启前置摄像头***
- [x] 手机调试获取**GPS权限**与**摄像头权限**   
- [x] 问题1：**GPS权限**
```  
解决方法：  
test1:不使用navigator.geolocation()，使用百度地图自己的定位函数
百度地图的精度太差
```
- [x] 问题2：**摄像头权限** 
```
解决问题2：
***将http服务器换为https服务器.***

安装openssl
首先，我们需要利用openssl生成证书文件：
```
```
＃生成私钥key文件
openssl genrsa 1024 > private.pem
//
＃通过私钥文件生成CSR证书签名
openssl req -new -key private.pem -out csr.pem
//
＃通过私钥文件和CSR证书签名生成证书文件
openssl x509 -req -days 365 -in csr.pem -signkey private.pem -out file.crt
```
```
新生成了三个文件：

  private.pem: 私钥
  csr.pem: CSR证书签名
  file.crt: 证书文件


node.js代码详见server.js的改动
```
- [ ] 显示指南针  
  使用[deviceorientation](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/deviceorientation_event),  
  **但是**初始方向是为0度。
  
- [ ] 加载多物标(这是关键点)
- [ ] 与小地图联动
- [ ] 新问题：手机端无法调试https链接
