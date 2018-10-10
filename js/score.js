var scoreObj = function(){
    this.fruitNum = 0;//吃到的果实数量
    this.double = 1;//翻倍
    this.score = 0;
}
//把分值绘制到画布中
scoreObj.prototype.draw = function(){
    var w = can1.width;
    var h = can1.height;
    ctx1.fillStyle = "white";//绘制的颜色
   
    // ctx1.fillText("FruitNum: "+this.fruitNum,w * 0.5,h - 750);//绘制字体，绘制在画布中央
    // ctx1.fillText("Double: "+this.double,w * 0.5,h - 780);
    ctx1.fillText("Score: "+this.score,w * 0.5,h - 750);
}
scoreObj.prototype.addScore = function(){
    this.score += this.fruitNum * 100 * this.double;
    this.fruitNum = 0;
    this.double = 1;
}
