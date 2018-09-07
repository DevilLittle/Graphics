#### CSS绘制箭头

实际需求中，很多时候都会有箭头的情况，只不过一开始总是喜欢找别人写好的，随着需求的增加，很难通过修改来满足需求，所以理解原理自己动手才是万难的根本解决办法。
##### 一、绘制三角
容器：
```
<div class="container">
</div>
```
样式：
```
.container{
    width: 0;
    height: 0;
    border: 50px solid;
    border-color: red yellow green blue;
}
```
效果如图：
![三角](https://upload-images.jianshu.io/upload_images/3214119-4d25aec0580ed207.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
利用border绘制了四个三角组成的矩形，现在要绘制三角形，只需要让其他任意三个三角形变为透明即可。
修改代码：
```
border-color: red transparent transparent transparent;
```
![单个三角](https://upload-images.jianshu.io/upload_images/3214119-bdf6ec7d00619c54.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 二、绘制箭头
利用三角绘制箭头，只需要再绘制一个和此三角大小相同，方向相同的三角，颜色和背景颜色一样，覆盖在此三角上面，通过少量的位移形成箭头。
![像这样](https://upload-images.jianshu.io/upload_images/3214119-23129d71e38b2432.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
```
.container{
    width: 0;
    height: 0;
    border: 50px solid;
    border-color: red transparent transparent transparent;
    position: relative;
}
.container::after{
    content: '';
    position: absolute;
    top: -55px;
    left: -50px;
    border: 50px solid;
    border-color: white transparent transparent transparent;
}
```
![单个箭头](https://upload-images.jianshu.io/upload_images/3214119-7d083035863aa9ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这是一个基本的完成箭头，只能满足最简单的场景，现在对它做一点基本的扩展。

##### 三、扩展
![目标](https://upload-images.jianshu.io/upload_images/3214119-2681d2881a7237c1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
现在想要做一个箭头叠加的效果，像这样的下拉图标，刚好可以学以致用。
html设置容器：
```
<div class="box">
    <div class="arrow-container">
        <div class="arrow-up"></div>
        <div class="arrow-down"></div>
    </div>
</div>
```
外层box：
```
.box{
    width:160px;
    height: 20px;
    border: 1px solid #dddddd;
    position: relative;
}
```
内层箭头container居中：
```
.arrow-container{
    width: 30px;
    position: absolute;
    left: 50%;
    margin-left: -15px;
}
```
两个箭头叠加：
```
.arrow-up{
    position: relative;
    z-index: 100;
}
.arrow-up::before{
    content: '';
    position: absolute;
    border-left: 12px solid;
    border-top:10px solid;
    border-right: 12px solid;
    border-bottom: 10px solid;
    border-color: #2dacfd transparent transparent transparent;
}
.arrow-up::after{
    content: '';
    position: absolute;
    border-left: 12px solid;
    border-top:10px solid;
    border-right: 12px solid;
    border-bottom: 10px solid;
    border-color: white transparent transparent transparent;
    left: 0;
    top: -2px;
}

.arrow-down{
    position: relative;
    top:8px;
}
.arrow-down::before{
    content: '';
    position: absolute;
    border-left: 12px solid;
    border-top:10px solid;
    border-right: 12px solid;
    border-bottom: 10px solid;
    border-color: #2dacfd transparent transparent transparent;
}
.arrow-down::after{
    content: '';
    position: absolute;
    border-left: 12px solid;
    border-top:10px solid;
    border-right: 12px solid;
    border-bottom: 10px solid;
    border-color: white transparent transparent transparent;
    left: 0;
    top: -2px;
}
```
![初成品](https://upload-images.jianshu.io/upload_images/3214119-3260541614af8442.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
**注意细节：**
- 以前设置border时`border: 10px solid;`是个正方形，箭头打开的角度是90度，看起来很怪异，为了更好看一定，border分开设置，左右border设置大一点，可以保证打开的角度更大更平缓。
- 箭头的叠加都是每个箭头有2个三角叠加形成的效果，然后两个箭头通过定位来改变位置，当两个箭头靠的比较近时，下面箭头的透明三角色块会挡住上面箭头的底部，为了解决这个问题，需要给箭头设置`z-index`使其显示在上层。

综合修改之后：
![修改后](https://upload-images.jianshu.io/upload_images/3214119-cad61fc22c6e8c45.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

