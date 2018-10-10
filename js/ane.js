var aneObj = function(){
    //海葵的构造函数
    this.x = [];//海葵的横坐标
    this.len = [];//海葵高度
}
aneObj.prototype.num = 120;//海葵数量
aneObj.prototype.init = function(){
    for(var i=0;i<this.num;i++){
        this.x[i] = i * 10 + Math.random()*10;//0或1190 + [0,10)
        this.len[i] = 120 + Math.random()*50;//120 + [0,50) = [120,170)
   }
    // console.log(1);
}
aneObj.prototype.draw = function(){
    
    ctx2.save();

    ctx2.globalAlpha =0.6; //globalAlpha 绘制物体的透明度
    ctx2.lineWidth  = 10;//lineWidth 路径线段宽度
    ctx2.lineCap = "round";//lineCap 线段结尾的样式
    ctx2.strokeStyle = "purple";//strokeStyle 路径颜色

    for(var i=0;i<this.num;i++){
        ctx2.beginPath(); //beginPath 开始绘制一个路径
        ctx2.moveTo(this.x[i],canHeight);//moveTo 定义线条的开始坐标
        ctx2.lineTo(this.x[i],canHeight-this.len[i]);//lineTo 定义线条的结束坐标
        ctx2.stroke();//stroke 绘制路径线段
    }
    
    ctx2.restore();
    //这一对API，告诉场景画布，这一对API之间的样式只在这一段之间起作用
}