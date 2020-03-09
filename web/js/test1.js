//初始化vconsole
var vconsole = new VConsole();

// WhatBrowser();
if (navigator.geolocation) {
  alert("您的浏览器支持地理定位")

  //获取设备的地理坐标信息
  getLocationInfo();
  // //设备移动
  // locationChanged();
  //监听地理位置改变
  // id = navigator.geolocation.watchPosition(success, error, options);
} else {
  alert("您的浏览器不支持地理定位")
} //end if-else

function getLocationInfo() {
  navigator.geolocation.getCurrentPosition(function (p) {
    var latitude = p.coords.latitude;
    var longitude = p.coords.longitude;
    console.log("初始信息:\n初始纬度：" + latitude + "，  初始经度：" + longitude);

    //东南西北四点坐标
    const pEast = [latitude, longitude - 0.00001 * Math.cos(longitude)];//东    
    const pSouth = [latitude - 0.0001, longitude];//南   
    const pWest = [latitude, longitude + 0.00001 * Math.cos(longitude)];//西    
    const pNorth = [latitude + 0.0001, longitude];//北   
    console.log("东：" + pEast + "\n南：" + pSouth + "\n西：" + pWest + "\n北：" + pNorth)
    // console.log("东：" + pEast + "\n南：" + pSouth + "\n西：" + pWest + "\n北：" + pNorth + "\n" + pNorth[0] + "\n" + pNorth[1])

    //加载物标
    const scene = document.querySelector('a-scene');
    loadFeature(scene,pEast, "red",'1 3 1');
    loadFeature(scene,pNorth, "blue",'2 2 1');
    // loadFeature(pNorth, "green");
    // loadFeature(pNorth, "yellow");

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
}//end getLocationInfo

/**
 * 加载物标
 * @param {*} scene 
 * @param {*} coords 
 * @param {*} color 
 * @param {*} scale 
 */
function loadFeature(scene,coords, color,scale) {
  console.log(coords[0],coords[1])
  // add place name
  const text = document.createElement('a-box');
  text.setAttribute('gps-entity-place', `latitude: ${coords[0]}; longitude: ${coords[1]};`);
  text.setAttribute('scale', scale);
  text.setAttribute('color', color)

  text.addEventListener('loaded', () => {
    window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
  });

  scene.appendChild(text);
  console.log("物标已加载")
}

function locationChanged() {

}//end locationChanged