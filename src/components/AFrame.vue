<template>
    <div>
        <div id="word">
            <div id="label-1" style="color: #ffaaff;font-size: 10px;font-weight: bold">表演台</div>
            <div id="label-2" style="color: #aaaaff;font-size: 10px;font-weight: bold">训练场</div>
            <div
                id="label-3"
                style="color: #aaffaa;font-size: 10px;font-weight: bold"
            >经度：{{lat}}      纬度：{{lon}}</div>
            <div
                id="label-4"
                style="color: #red;font-size: 10px;font-weight: bold"
            >指南针数据：{{campassData}}</div>
        </div>
        <a-scene id="aScene">
            <!-- <a-assets>
                <a-asset-item id="ducky-obj" src="./AFrameSets/ducky.obj"></a-asset-item>
            </a-assets>-->
            <a-sphere position="0 1.25 -2" radius="1.25" color="#EF2D5E"></a-sphere>
            <a-box
                position="1 0.5 0"
                rotation="0 45 0"
                width="1"
                height="1"
                depth="1"
                color="#4CC3D9"
            ></a-box>
        </a-scene>

        <video id="inputVideo" autoplay loop muted></video>
    </div>
</template>

<script>
import Vue from "vue";
import { cameraSource } from "../../static/AFrameSets/camera.js";
import { bus } from "../../static/eventbus.js";

export default {
    data() {
        return { lat: 0, lon: 0, campassData: {}, timeStamp: 0 };
    },
    mounted() {
        this.onReady(); //A-Frame
        this.campassFunction(); //campass
    },
    methods: {
        onReady() {
            var vid = document.querySelector("#inputVideo");

            cameraSource.start({
                videoElement: vid,
                constraints: {
                    video: true,
                    facingMode: "environment",
                },
                callback: function () {
                    // // BROKEN IN CHROME ONLY
                    // //var htmlStr = '<a-obj-model id="duck" src="#ducky-obj" position="0 -800 -4000" rotation="-210 -120 180" scale="8 8 8" material="color: orange"><a-animation easing="linear" attribute="rotation" dur="10000" to="0 0 360" repeat="indefinite"></a-animation> </a-obj-model>';
                    // //document.querySelector('#aScene').appendChild(new DOMParser().parseFromString(htmlStr, 'text/html').body.firstChild);
                    // // BROKEN
                    // //document.querySelector('#ducky-obj').src = 'ducky.obj'
                    // var scene = document.querySelector("#aScene");
                    // var aobj = document.createElement("a-obj-model");
                    // aobj.setAttribute("id", "duck");
                    // aobj.setAttribute("src", "#ducky-obj");
                    // aobj.setAttribute("position", "0 -800 -4000");
                    // aobj.setAttribute("rotation", "210 -120 180");
                    // aobj.setAttribute("scale", "8 8 8");
                    // aobj.setAttribute("material", "color: orange");
                    // scene.appendChild(aobj);
                },
            }); //end cameraSource
            bus.$on("locationCoords", ({ lat, lon }) => {
                console.log("接收到了位置数据");
                this.lat = lat;
                this.lon = lon;
            });
        }, //end A-Frame onReady
        campassFunction() {
            var _ = this;
            var alpha = "";
            var ua = navigator.userAgent.toLowerCase();
            if (/android/.test(ua)) {
                window.addEventListener(
                    "deviceorientationabsolute",
                    DeviceOrientationHandler,
                    false
                );
                function DeviceOrientationHandler(event) {
                    // document.getElementById("alpha").innerHTML = Math.round(360 - event.alpha);
                    // $('#compass').css('transform','rotate(-'+Math.round(360 - event.alpha)+'deg)')
                    _.campassData = Math.round(360 - event.alpha);
                    _.timeStamp = event.timeStamp;
                    console.log(event);
                }
            } else {
                window.addEventListener(
                    "deviceorientation",
                    DeviceOrientationHandler,
                    false
                );
                function DeviceOrientationHandler(event) {
                    // document.getElementById("alpha").innerHTML = event.webkitCompassHeading;
                    // $('#compass').css('transform','rotate(-'+event.webkitCompassHeading+'deg)')
                    _.timeStamp = event.timeStamp;
                    _.campassData = Math.round(360 - event.alpha);
                    console.log(event);
                }
            }
        },
    },
};
</script>

<style scoped>
a-scene {
    background-color: transparent;
}
video {
    width: 100% !important;
    max-width: 100% !important;
    height: auto !important;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1000;
}
</style>