# 基于增强现实框架GeoAR.js的导航系统
## 学习GeoAR.js  
### [`gps-camera`](https://github.com/nicolocarpignoli/GeoAR.js)

**Required**: yes  
**Max allowed per scene**: 1

This component enables the Location AR. It has to be added to the `camera` entity.
It makes possible to handle both position and rotation of the camera and it's used to determine where the user is pointing their device.  
此组件启用位置AR。 必须将其添加到`camera`实体中。
它可以处理摄像机的位置和旋转，并用于确定用户将设备指向何处。

For example:

```HTML
<a-camera gps-camera rotation-reader></a-camera>
```

In addition to that, as you can see on the example above, we also have to add `rotation-reader` to handle rotation events.  
除此之外，如您在上面的示例中看到的，我们还必须添加`rotation-reader`来处理旋转事件。   
See [here](https://aframe.io/docs/0.9.0/components/camera.html#reading-position-or-rotation-of-the-camera) for more details.  
有关更多详细信息，请参见[这里](https://aframe.io/docs/0.9.0/components/camera.html#reading-position-or-rotation-of-camera)


### Properties 属性

| Property属性   | Description描述 | Default Value默认值 |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| alert     | Whether to show a message when GPS signal is under the `positionMinAccuracy` GPS信号在positionMinAccuracy之下时是否显示消息                  | false |                                                                                                                                                                        | true          |
| positionMinAccuracy        | Minimum accuracy allowed for position signal  位置信号允许的最低精度   | 100 |
| minDistance        | If set, places with a distance from the user lower than this value, are not showed. Only a positive value is allowed. Value is in meters. 如果设置，则与用户的距离小于此值的位置不会显示。 只允许一个正值。 以米为单位。   | 0 (disabled) |

### `gps-entity-place`

**Required**: yes  
**Max allowed per scene**: no limit

This component makes every entity GPS-trackable. It assignes a specific world position to the entity, so the user can see it when their phone is pointing to its position in the real world. If user is far from the entity, their will see it smaller. If it is too far, their will not see it at all.  
该组件使每个实体都可以进行GPS跟踪。 它为实体分配了特定的世界位置，因此用户在手机指向现实世界中的位置时可以看到它。 如果用户远离实体，他们将看到较小的实体。 如果距离太远，他们将根本看不到它。

It requires latitude and longitude as a single string parameter (example with `a-box` aframe primitive):  
它需要纬度和经度作为单个字符串参数（举一个aframe原始框架`a-box`的例子）：

```HTML
<a-box color="yellow" gps-entity-place="latitude: <your-latitude>; longitude: <your-longitude>"/>
```

### `gps-camera-debug`

**Required**: no  
**Max allowed per scene**: 1

This component has to be added only in development environments, not production ones.It shows a debug UI with camera informations and a list of registered `gps-entity-place` entities, showing also distance from the user for each one.  
该组件仅在开发环境中才需要添加，而不是在生产环境中添加。它显示了带有相机信息的调试UI和已注册的`gps-entity-place`实体列表，还显示了每个用户与用户的距离。

It has to be added to the `a-scene`:  
必须将其添加到`a-scene`中：

```HTML
<a-scene gps-camera-debug embedded arjs='sourceType: webcam; debugUIEnabled: false;'></a-scene>
```

### 测试结果