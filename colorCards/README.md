![目标](https://upload-images.jianshu.io/upload_images/3214119-ab77e523622db880.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 一、定义图标容器
定义一个容器：
```
<div class="cards">
</div>
```
居中显示：
```
body{
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightgray;
}
```
使用flex布局做左右和垂直居中

给容器定义尺寸，并在页面上显示出来:
```
.cards{
    width: 20em;
    height: 20em;
    border: 1px dashed black;
}
```
![图标容器](https://upload-images.jianshu.io/upload_images/3214119-eff6b5a5114e6924.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 二、画出色卡
为图标容器填入色卡：
```
<div class="cards">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>
```
给容器定义尺寸，并在页面上显示出来:
```
.cards{
    width: 20em;
    height: 20em;
    border: 1px dashed black;
}
```
绘制出单个色卡的轮廓，并把它放置在容器中间：
```
.cards span {
    width: 10em;
    height: 3em;
    background-color: lightgreen;
    position: absolute;
    top: calc(50% - 3em / 2);
    border: 0.2em solid dimgray;
    border-radius: 0.3em 0.8em 0.8em 0.3em;
}
```
画出的效果图：
![色卡效果](https://upload-images.jianshu.io/upload_images/3214119-9be47be5951ed41d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

由于绘制的色卡需要边框，所以按照标准的盒子模型会占用额外面积，超出规定区域，所以需要改变一下盒子模型：
```
.cards,
.cards > * {
    box-sizing: border-box;
}
```
##### 三、制作标签
利用before伪类给画好的色卡右边部分留白：
```
.cards span::before{
    content: '';
    position: absolute;
    height: 100%;
    width: 35%;
    background-color: white;
    right: 0;
}
```
![制作标签](https://upload-images.jianshu.io/upload_images/3214119-ed2c98772363bf65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

用after伪元素画出色卡标签上的文字：
```
.cards span::after{
    content: '';
    position: absolute;
    height: 2em;
    width: 0.4em;
    background-color: silver;
    left: 6.5em;
    top:0.1em;
    box-shadow: 0.7em 0 0 -0.1em silver;
}
```
![添加标签文字](https://upload-images.jianshu.io/upload_images/3214119-d463ead4b36f998b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 四、色卡上色
色卡上色采用HSL色彩模式，就是色调(Hue)、饱和度(Saturation)、亮度(Lightness)三个颜色通道的改变以及它们相互之间的叠加来获得各种颜色，色调(Hue)色调最大值360，饱和度和亮度有百分比表示0-100%之间。

**HSL(H,S,L)：**
H(色调)：
0(或360)表示红色，120表示绿色，240表示蓝色，也可取其他数值来指定颜色。取值为：0 - 360
S(饱和度)：
取值为：0.0% - 100.0%
L(亮度)：
取值为：0.0% - 100.0%
```
.cards span:nth-child(1) {
    --n: 1;
}
.cards span:nth-child(2) {
    --n: 2;
}
.cards span:nth-child(3) {
    --n: 3;
}
.cards span:nth-child(4) {
    --n: 4;
}
.cards span:nth-child(5) {
    --n: 5;
}
.cards span:nth-child(6) {
    --n: 6;
}
.cards span:nth-child(7) {
    --n: 7;
}
.cards span:nth-child(8) {
    --n: 8;
}
.cards span {
    background-color: hsl(calc(360 / 8 * var(--n)), 80%, 70%);
}
```
##### 五、旋转
```
.cards span {
    transform-origin: right;
    animation: rotating 3s linear infinite;
}
@keyframes rotating {
    0%, 35% {
        transform: rotate(0deg);
    }
    90%, 100% {
        transform: rotate(360deg);
    }
}
```
最后，设置动画延时，让卡片依次旋转：
```
.cards span {
    animation-delay: calc((var(--n) - 8) * 0.15s);
}
```
![旋转](https://upload-images.jianshu.io/upload_images/3214119-f833344421eed956.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
