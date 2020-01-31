//初始化vconsole
var vconsole = new VConsole();

// WhatBrowser();
if (navigator.geolocation) {
    alert("您的浏览器支持地理定位")
    locationChanged();
    //监听地理位置改变
    // id = navigator.geolocation.watchPosition(success, error, options);
} else {
    alert("您的浏览器不支持地理定位")
} //end if-else

function locationChanged() {
    console.log("位置改变")
    navigator.geolocation.getCurrentPosition(function (p) {
        var latitude = p.coords.latitude;
        var longitude = p.coords.longitude;
        alert("纬度" + latitude + "  经度" + longitude);
        // createMap(latitude, longitude);
        // alert(1);
        const scene = document.querySelector('a-scene');
        loadPlaces(p)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    console.log("物标的坐标为   纬度：", latitude, "，经度：", longitude)
                    console.log(place.img_url)
                    // add place name
                    const text = document.createElement('a-image');
                    text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    text.setAttribute('title', place.name);
                    text.setAttribute('src', place.img_url);
                    text.setAttribute('scale', '20 20 20');

                    text.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                        console.log("物标已加载")
                    });

                    scene.appendChild(text);
                }); //end forEach
            }); //end loadPlaces.then
    }, function (error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "用户拒绝对获取地理位置的请求。"
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "位置信息是不可用的。"
                break;
            case error.TIMEOUT:
                x.innerHTML = "请求用户地理位置超时。"
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "未知错误。"
                break;
        }
    }, {
        enableHighAccuracy: true,//是否要求高精度的地理位置信息
        maximumAge: 100,//对地理位置进行缓存的有效时间(单位为毫秒).
        accuracy: 100,//精度
    });
}

// // <!-- 把我们获取到的经纬度传给百度地图来给我显示位置 -->
// function createMap(a, b) {
//     var map = new BMap.Map("dituContent"); //其中dituContent是一个div容器的id，以便地图显示在那里。
//     map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
//     var pointBak = new BMap.Point(b, a); //注意此时经纬度是逆着的，更加经纬度定义一个中心点。

//     const convertor = new BMap.Convertor();
//     convertor.translate([pointBak], 1, 5, function (resPoint) {
//         if (resPoint && resPoint.points && resPoint.points.length > 0) {
//             lng = resPoint.points[0].lng;
//             lat = resPoint.points[0].lat;
//         }
//         console.log("转换后   纬度：" + lat + "  经度：" + lng)
//         const point = new BMap.Point(lng, lat);
//         var marker = new BMap.Marker(point); // 创建标注
//         map.addOverlay(marker); // 将标注添加到地图中
//         marker.disableDragging(); // 不可拖拽
//         const geo = new BMap.Geocoder();
//         geo.getLocation(point, (res) => {

//         });
//         map.centerAndZoom(point, 18); //设定围绕这个中心点的范围，20是最大
//         window.map = map; //将map变量存储在全局

//         //创建小狐狸
//         // var pt = new BMap.Point(121.53554276379437, 38.87807);//实验室测试用坐标
//         var pt = new BMap.Point(121.53066303521642, 38.87455);//宿舍测试用坐标
//         var myIcon = new BMap.Icon("./image/hangbiao.jpg", new BMap.Size(10, 10));
//         var marker2 = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
//         // var marker2 = new BMap.Marker(pt); // 创建标注
//         map.addOverlay(marker2); // 将标注添加到地图中
//     });
// }

//使用百度地图自己的定位函数进行定位
// baiduLocation()
function baiduLocation() {
    // 百度地图API功能
    var map = new BMap.Map("dituContent");
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    // var point = new BMap.Point(121.53070321109, 38.874549836902);//宿舍
    var point = new BMap.Point(121.53552118335, 38.878058707254);//实验室测试用坐标
    map.centerAndZoom(point, 18);

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            console.log("百度地图api获得的位置信息：", r)
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            // map.panTo(r.point);
            alert('您的位置：' + r.point.lng + ',' + r.point.lat);
            loadPlaces(r.point);
            // var pt = new BMap.Point(121.53066303521642, 38.87455);//宿舍测试用坐标
            var pt = new BMap.Point(121.53573364883, 38.878074451474);//实验室测试用坐标
            // var myIcon = new BMap.Icon("./image/hangbiao.jpg", new BMap.Size(100, 100));
            // var marker2 = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
            var marker2 = new BMap.Marker(pt); // 创建标注
            map.addOverlay(marker2); // 将标注添加到地图中
        }
        else {
            alert('failed' + this.getStatus());
        }
    }, { enableHighAccuracy: true })
    //关于状态码
    //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
    //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
    //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
    //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
    //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
    //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
    //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
    //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
    //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
}

//加载AFrame物标
function loadPlaces(coords) {
    // COMMENT FOLLOWING LINE IF YOU WANT TO USE STATIC DATA AND ADD COORDINATES IN THE FOLLOWING 'PLACES' ARRAY
    // 如果您想在以下“地点”阵列中使用静态数据并添加坐标，请在注释下面这行
    // const method = 'api';
    const method = 'ddd';

    const PLACES = [
        {
            name: "test1",
            location: {
                // //实验室测试用坐标
                // lat: 38.878, // add here latitude if using static data
                // lng: 121.53554276379437, // add here longitude if using static data

                //宿舍测试用坐标
                lat: 38.87455,
                lng: 121.53066303521642,
            },
            img_url: "./image/hangbiao.jpg"
        },
        {
            name:"test2",
            location:{

            },
            img_url:"./image/hangbiao.jpg"
        }
    ];

    if (method === 'api') {
        return loadPlaceFromAPIs(coords);
    }

    return Promise.resolve(PLACES);
}

//判断浏览器
function WhatBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    console.log(userAgent) //可以将这个打印出来会很清晰的展示出浏览器的类型
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        alert("在国内，Chrome浏览器不支持位置定位。\n请科学上网或更换浏览器！！！")
        return "Chrome";
    } //判断是否是chrome浏览器
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}

//检查手机是否支持DeviceOrientation
if (window.DeviceOrientationEvent) {
    // alert("您的浏览器支持DeviceOrientation")
    // window.addEventListener('deviceorientation',DeviceOrientationHandler,false);
} else {
    alert("您的浏览器不支持DeviceOrientation");
}

//事件处理逻辑
function DeviceOrientationHandler(event) {
    console.log("方向传感器返回数据：", event);
    document.getElementById("alpha").innerHTML = event.alpha;
    document.getElementById("beta").innerHTML = event.beta;
    document.getElementById("gamma").innerHTML = event.gamma;
    document.getElementById("heading").innerHTML = event.webkitCompassHeading;
    document.getElementById("accuracy").innerHTML = event.webkitCompassAccuracy;
}