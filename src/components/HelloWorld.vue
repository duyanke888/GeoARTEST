<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <button @click="geoar()">原生增强现实导航</button>
        <br />
        <button @click="aframe()">A-Frame 增强现实</button>
        <h2>Essential Links</h2>
        <ul>
            <li>
                <a href="https://vuejs.org" target="_blank">Core Docs</a>
            </li>
            <li>
                <a href="https://forum.vuejs.org" target="_blank">Forum</a>
            </li>
            <li>
                <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
            </li>
            <li>
                <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
            </li>
            <br />
            <li>
                <a
                    href="http://vuejs-templates.github.io/webpack/"
                    target="_blank"
                >Docs for This Template</a>
            </li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li>
                <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
            </li>
            <li>
                <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
            </li>
            <li>
                <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
            </li>
            <li>
                <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { bus } from "../../static/eventbus.js";

export default {
    name: "HelloWorld",
    data() {
        return {
            msg: "Duyanke888",
            lat: 0,
            lon: 0,
        };
    }, //end data
    mounted() {
        this.getLocation();
    },
    methods: {
        geoar() {
            this.$router.push({ name: "geoar", params: { id: "1" } });
        },
        aframe() {
            this.$router.push({ name: "AFrame", params: { id: "1" } });
        },
        getLocation() {
            bus.$emit("locationCoords", {
                lat: this.lat,
                lon: this.lon,
            });
            if (navigator.geolocation) {
                //获取当前位置
                navigator.geolocation.getCurrentPosition(
                    //[第一参数]获取成功时的函数
                    function (position) {
                        // 取得したデータの整理
                        // 整理获取的数据
                        var data = position.coords;

                        // データの整理
                        // 整理数据
                        this.lat = data.latitude; //纬度
                        this.lon = data.longitude; //经度
                        var alt = data.altitude ;
                        var accLatlng = data.accuracy ;
                        var accAlt = data.altitudeAccuracy ;
                        var heading = data.heading ;
                        var speed = data.speed ;

                        console.log("纬度"+this.lat+"       经度"+this.lon+"        高度"+alt+"     朝向"+heading+"     速度"+speed)

                        // document.getElementById( 'result' ).innerHTML = '<dl><dt>緯度</dt><dd>' + lat + '</dd><dt>経度</dt><dd>' + lng + '</dd><dt>緯度、経度の精度</dt><dd>' + accLatlng;

                        bus.$emit("locationCoords", {
                            lat: this.lat,
                            lon: this.lon,
                        });
                    },
                    // [第2引数] 取得に失敗した場合の関数
                    // [第二参数]获取失败时的函数
                    function (error) {
                        var errorInfo = [
                            "发生了不明原因的错误",
                            "不允许获取位置信息…。",
                            "由于网络状况等原因无法取得位置信息…",
                            "取得位置信息太花时间了，超时了…",
                        ];

                        // エラー番号
                        // 错误编号
                        var errorNo = error.code;

                        // エラーメッセージ
                        // 错误消息
                        var errorMessage =
                            "[错误编号" + errorNo + "]\n" + errorInfo[errorNo];

                        alert(errorMessage);
                        // document.getElementById("result").innerHTML = errorMessage;
                    },

                    // [第3引数] オプション
                    // [第3参数]选项
                    {
                        enableHighAccuracy: false,
                        timeout: 8000,
                        maximumAge: 30000,
                    }
                );
            }
            // 対応していない場合
            // 如果不支持
            else {
                var errorMessage =
                    "お使いの端末は、GeoLacation APIに対応していません。 您的设备不支持GeoLocation API。";
                alert(errorMessage);
                // document.getElementById( 'result' ).innerHTML = errorMessage ;
            }
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
