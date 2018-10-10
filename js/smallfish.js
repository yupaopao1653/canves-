//6. 绘制小鱼
//与绘制大鱼原理相同

var smallFish = function(){
    this.x;
    this.y;  
    this.angle;
    // this.samllEye = new Image();
    this.samllBody = new Image();
    // this.samllTail = new Image();

    this.smallfishTailTimer = 0;//计时器
    this.smallfishTailCount = 0;//执行的帧数

    this.smallfisheyeTimer = 0;//眼睛的计时器
    this.samllfisheyeCount = 0;//眼睛的执行帧数
    this.smallfisheyeInterval = 1000;//时间间隔1s，当前图片执行的时间

    
    this.smallfishbodyTimer = 0;//眼睛的计时器
    this.smallfishbodyCount = 0;//眼睛的执行帧数
    
}
smallFish.prototype.init = function(){
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 + 50;
    this.angle = 0;
    // this.samllEye.src = "./images/smallfisheye01.png";
    this.samllBody.src = "./images/smallfishbody01.png";
    // this.samllTail.src = "./images/smallfishtail01.png";
}
smallFish.prototype.draw = function(){
    //lerp x,y
    this.x = lerpDistance(bigfish.x,this.x,0.98);
    this.y = lerpDistance(bigfish.y,this.y,0.98);

    //delta angle 角度差
    // Math.atan2(y,x);返回的是-PI - PI之间的数值
    var deltaY = bigfish.y - this.y;
    var deltaX = bigfish.x - this.x;
    var beta = Math.atan2(deltaY,deltaX)+ Math.PI;//鼠标和大鱼之间的角度差
    
    //lerp angle
    this.angle = lerpAngle(beta,this.angle,0.6);

    //smallfishTail  Count
    this.smallfishTailTimer += deltaTime;
   
    if(this.smallfishTailTimer > 50){
        this.smallfishTailCount = ( this.smallfishTailCount + 1 ) % 8;
        this.smallfishTailTimer %= 50;//计时器复原
    }
    //smallfish eye
    this.smallfisheyeTimer += deltaTime;
    if(this.smallfisheyeTimer > this.smallfisheyeInterval){
        this.samllfisheyeCount = (this.samllfisheyeCount + 1) % 2;
        this.smallfisheyeTimer %= this.smallfisheyeInterval;//计时器复原

        if(this.samllfisheyeCount == 0 ){//判断眼睛的状态---闭眼
            this.smallfisheyeInterval = Math.random() * 1500 + 2000;//[2000,3500)
        }else{
            this.smallfisheyeInterval = 200;
        }
    }
    //smallfish body
    this.smallfishbodyTimer += deltaTime;
    if(this.smallfishbodyTimer > 300){
        this.smallfishbodyCount += 1;

        this.smallfishbodyTimer %= 300;//实现身体颜色一帧一帧的变化
        if(this.smallfishbodyCount >19){
            this.smallfishbodyCount =19;
            //gameover
        }
    }

    // ctx1
    //translate()
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);//先改变大鱼的坐标原点，再进行旋转一定的角度
    
    var sfTCount = this.smallfishTailCount;
    var sfECount = this.samllfisheyeCount;
    var sfBCount = this.smallfishbodyCount;

    ctx1.drawImage(smallfishTail[sfTCount],-smallfishTail[sfTCount].width * 0.5 + 28,-smallfishTail[sfTCount].height * 0.5);
    ctx1.drawImage(smallfishbody[sfBCount],-smallfishbody[sfBCount].width * 0.5,-smallfishbody[sfBCount].height * 0.5);
    ctx1.drawImage(smallfisheye[sfECount],-smallfisheye[sfECount].width * 0.5,-smallfisheye[sfECount].height * 0.5);
    
    ctx1.restore();

}