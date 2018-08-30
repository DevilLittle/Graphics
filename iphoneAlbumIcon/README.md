#### 纯CSS实现苹果系统的相册图标

![目标](https://upload-images.jianshu.io/upload_images/3214119-25873105655882bf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 一、定义图标容器
定义一个容器：
```
<div class="icon">
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
    background-color: #ccc;
}
```
使用flex布局做左右和垂直居中

定义icon容器的尺寸：
```
.icon{
    width: 10em;
    height: 10em;
    background-color: #eee;
    border-radius: 20%;
    font-size: 30px;
}
```
![图标容器](https://upload-images.jianshu.io/upload_images/3214119-f6589d621fe698b1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 二、画出花瓣矩形
为图标容器填入花瓣：
```
<div class="icon">
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
绘制出矩形的轮廓，并放置在容器的中上方：
```
.icon{
    padding: 1em;
    position: relative;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
}
.icon span{
    position: absolute;
    width: 22.5%;
    height: 37.5%;
    border: 1px dashed black;
    border-radius: 50% / 30%;
}
```
画出的效果图：
![花瓣效果](https://upload-images.jianshu.io/upload_images/3214119-10c75f60cec6a8d9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
因为使用了flex布局，八个span会排成一行，由于容器宽度不够（8*22.5%）,所以宽度会缩小，然后排成一行。使用position:absolute;使他们重叠在一起，宽度是22.5%。

##### 三、花瓣散开
- **扩展-CSS变量**
CSS自定义属性也被称为CSS变量，在CSS中可以通过`--`设置CSS变量和通过`var(--varName)`访问已声明的变量。
可以像下面声明一个变量和让文本的颜色为`red`：
```
div { 
    --color: red; 
    color: var(--color); 
}
```
我们需要给八个花瓣设置适当的旋转角度，使它们能够散开，且恰好围成一朵花。

先以两瓣花为例：
```
.icon span{
    transform-origin: center;
    transform: rotate(calc((var(--n) - 1) * 45deg));
}
```
```
.icon span:nth-child(1) {
    --n: 1;
}

.icon span:nth-child(2) {
    --n: 2;
}
```
![花瓣旋转](https://upload-images.jianshu.io/upload_images/3214119-4baf40d65db19658.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
现在是旋转后的样子，由于他们之间重叠部分太多了，所以需要调整一下位置。
**transform-origin: x-axis y-axis z-axis;**
调整Y轴到一个差不多的位置，最终为：
```
.icon span{
    transform-origin: center 105%;
    transform: rotate(calc((var(--n) - 1) * 45deg));
}
```
此时效果：
![调整后](https://upload-images.jianshu.io/upload_images/3214119-23aed5556a48f540.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

现在八瓣都旋转一下，设置下标变量n：
```
.icon span:nth-child(1) {
    --n: 1;
}
.icon span:nth-child(2) {
    --n: 2;
}
.icon span:nth-child(3) {
    --n: 3;
}
.icon span:nth-child(4) {
    --n: 4;
}
.icon span:nth-child(5) {
    --n: 5;
}
.icon span:nth-child(6) {
    --n: 6;
}
.icon span:nth-child(7) {
    --n: 7;
}
.icon span:nth-child(8) {
    --n: 8;
}
```
效果图：
![八瓣花瓣旋转](https://upload-images.jianshu.io/upload_images/3214119-aedafa19f7c7b227.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 四、填色
为花瓣设置颜色：
```
.icon span{
   // border: 1px dashed black;
    background-color: var(--c);
}
.icon span:nth-child(1) {
    --c: rgba(243, 156, 18, 0.7);
}
.icon span:nth-child(2) {
    --c: rgba(241, 196, 15, 0.7);
}
.icon span:nth-child(3) {
    --c: rgba(46, 204, 113, 0.7);
}
.icon span:nth-child(4) {
    --c: rgba(27, 188, 155, 0.7);
}
.icon span:nth-child(5) {
    --c: rgba(65, 131, 215, 0.7);
}
.icon span:nth-child(6) {
    --c: rgba(102, 51, 153, 0.7);
}
.icon span:nth-child(7) {
    --c: rgba(155, 89, 182, 0.7);
}
.icon span:nth-child(8) {
    --c: rgba(242, 38, 19, 0.7);
}
```
![填充颜色](https://upload-images.jianshu.io/upload_images/3214119-3bbaf17f47a9c6ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
设置混色模式，使重叠颜色能叠加在一起：
```
.icon span {
    mix-blend-mode: multiply;
}
```
![颜色叠加](https://upload-images.jianshu.io/upload_images/3214119-76f10fdf7d93248b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
明显设置颜色叠加后效果要更好一点。

##### 五、扩展动画
到这里，基本上想要的效果已经出来了，但是还可以做少许的扩展——鼠标悬停时花瓣展开。
```
.icon:hover span{
    animation: rotating 2s ease-in-out forwards;
}
@keyframes rotating {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(calc((var(--n) - 1) * 45deg));
    }
}
```
此时可以看到效果，这里只截取了展开的一部分：
![花瓣展开](https://upload-images.jianshu.io/upload_images/3214119-f8fa9e051c6462fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
仔细观察可以发现，第一瓣花瓣始终没有动，因为我们设置的旋转角度中，把它忽略掉了，如果想要展开时每个花瓣都动，可以将第一瓣花瓣设置为：
```
.icon span:nth-child(1) {
    --n: 9;
}
```
这样它的结束角度就变成了 360 度，这样的话每个花瓣都可以动起来了。但在实际情况中，如果不是需求必须，其实不太影响。