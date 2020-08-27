<template>
    <div>
        <h1>Augment Reality</h1>
        <!-- 显示图像 -->
        <div>
            <h2>图像窗口</h2>
            <div  id="videoWindow" width="100%">
                <video ref="video" id="video" autoplay></video>
            </div>
            <!-- <canvas ref="canvas" id="canvas" width="100%"></canvas> -->
        </div>
        
        <!-- Device Information -->
        <div>
            <h2>信息窗口</h2>
            <h3>当前位置经纬度信息</h3>
                <div id="location" style="width:600px;height:500px;"></div>
            <h3>设备信息</h3>
                <p>左右：<span id="alpha">0</span></p>
                <p>前后：<span id="beta">0</span></p>
                <p>扭转：<span id="gamma">0</span></p>
                <p>指北针指向：<span id="heading">0</span>度</p>
                <p>指北针精度：<span id="accuracy">0</span>度</p>
        </div>

        <!-- ThreeJS -->
        <div>
            <h2>ThreeJS</h2>
            <div id="container" class="container"></div>
        </div>

    </div>
</template>

<script>
import * as Three from 'three'

export default {
    name:'videoLive',
    data(){
        return{
            video: {},
            canvas: {},
            captures: [],
            camera: null,
            scene: null,
            renderer: null,
            mesh: null,
            longitude:0,//经度
            latitude:0,//纬度
            city:''
        }
    },//end data
        mounted() {
            //打开摄像头
            this.showCamera()

            //threeJS初始化
            this.init('container')

            //获取当前位置信息
            // this.addLocationByGPS();//使用h5原生定位
            this.addLocationByTencent();//使用腾讯地图定位
        },

        
        methods: {
            addLocationByTencent(){
                var geolocation = new qq.maps.Geolocation("UJKBZ-QQ5WD-2NJ4E-PE6C4-WGOPE-DJBX4", "毕设实验-Web");
                    // geolocation.getIpLocation(this.showPosition, this.showErr);
                    geolocation.getLocation(this.showPosition, this.showErr);//或者用getLocation精确度比较高
            },//end addLocationByTencent
            showPosition(position) {
                console.log(position);
                this.latitude = position.lat;
                this.longitude = position.lng;
                this.city = position.city;
                this.setMap();
            },
            showErr() {
                console.log("定位失败");
                this.addLocationByTencent();//定位失败再请求定位，测试使用
            },
            //位置信息在地图上展示
            setMap() {
                //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器
                //设置地图中心点
                var myLatlng = new qq.maps.LatLng(this.latitude,this.longitude);
                //定义工厂模式函数
                var myOptions = {
                  zoom: 13,               //设置地图缩放级别
                  center: myLatlng,    //设置中心点样式
                  mapTypeId: qq.maps.MapTypeId.ROADMAP  //设置地图样式详情参见MapType
                }
                // //获取dom元素添加地图信息
                var map = new qq.maps.Map(document.getElementById("location"), myOptions);
              //给定位的位置添加图片标注
                var marker = new qq.maps.Marker({
                    position: myLatlng,
                    map: map
                });
                //给定位的位置添加文本标注
                var marker = new qq.maps.Label({
                    position: myLatlng,
                    map: map,
                    content:'这是我当前的位置'
                });
            },
            addLocationByGPS(){
                if ( navigator.geolocation ) {
                    //获取当前位置
                    navigator.geolocation.getCurrentPosition(
                        //[第一参数]获取成功时的函数
                        function(position){
                            console.log("get location!!!")
                            // 整理获取的数据
                            let data = position.coords;

                            // 整理数据
                            lat = data.latitude ;
                            lon = data.longitude ;
                        },//end function
                        // [第二参数]获取失败时的函数
                        function(error){
                            var errorInfo = [
                                "发生了不明原因的错误" ,
                                "不允许获取位置信息…。" ,
                                " 由于网络状况等原因无法取得位置信息…" ,
                                "取得位置信息太花时间了，超时了…"
                            ] ;
                
                            // 错误编号
                            var errorNo = error.code ;
                
                            // 错误消息
                            var errorMessage = "[ 错误编号" + errorNo + "]\n" + errorInfo[ errorNo ] ;
                        
                            alert( errorMessage ) ;
                            // document.getElementById("result").innerHTML = errorMessage;
                        },//end function error
                        // [第3参数]选项
                        {
                            "enableHighAccuracy": false,
                            "timeout": 8000,
                            "maximumAge": 30000,
                        }
                    );//end getCurrentPosition
                }//end if-navigator.geolocation
                //如果不支持
                else
                {
                    var errorMessage = "您的设备不支持GeoLocation API。" ;
                    alert( errorMessage ) ;
                    // document.getElementById( 'result' ).innerHTML = errorMessage ;
                }
            },//end addLocationByGPS
            showCamera(){
                this.video = this.$refs.video;
                if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                        try {
                            this.video.srcObject = stream;
                        } catch (error) {
                            this.video.src = window.URL.createObjectURL(stream);
                        }
                        // this.video.src = window.URL.createObjectURL(stream);
                        this.video.play();
                    });
                }
            },//end showCamera
            capture() {
                this.canvas = this.$refs.canvas;
                var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
                this.captures.push(canvas.toDataURL("image/png"));
            },//end capture
            init(id) {
                let container = document.getElementById(id);
        
                this.camera = new Three.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 0.01, 10);
                this.camera.position.z = 1;
        
                this.scene = new Three.Scene();
        
                let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
                let material = new Three.MeshNormalMaterial();
        
                this.mesh = new Three.Mesh(geometry, material);
                this.scene.add(this.mesh);
        
                this.renderer = new Three.WebGLRenderer({antialias: true});
                this.renderer.setSize(container.clientWidth, container.clientHeight);
                container.appendChild(this.renderer.domElement);

                console.log("ThreeJS OVER")
                this.animate();
            },
            animate(){
                requestAnimationFrame(this.animate);
                this.mesh.rotation.x += 0.01;
                this.mesh.rotation.y += 0.02;
                this.renderer.render(this.scene, this.camera);
            }
        }
}
</script>

<style scoped>
    /* body: {
        background-color: #F0F0F0;
    } */
    *{
        clear:both;
    }
    #app {
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    #videoWindow{
        height: auto;
    }
    #canvas {
        display: none;
    }
    li {
        display: inline;
        padding: 5px;
    }
    .cSelector{
        width: 100px;
    }
</style>