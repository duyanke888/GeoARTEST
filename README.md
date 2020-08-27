# geoar

> GeoAR Vue Project created by duyanke888

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# GeoAR项目实现

## 20200728 

参考链接[Web前端AR技术探索-导航中的应用](https://juejin.im/post/5c24252b6fb9a049d975411a)


1. 获取视频源
2. 坐标系转换：  
        获取设备和路径的绝对定位  
        计算路径中各标记点与设备间的相对定位  
        在设备坐标系中绘制标记点
3. 3D图像与视频叠加
4. 更新定位和设备方向，控制Three.js中的相机移动


## 获取手机设备的方向数据

-[ ] localhost:8080地址无法使用手机调试

## 视角内叠加元素
引入three.js  
`
npm install three --save
`  
