// 4. 画大鱼、身子、尾巴、眼睛

//使用到的API
//translate()
//roate()
//Math.atan2(y,x)//js的API，计算两个参数的反正切值,返回值是一个number类型，范围为 -PI - PI

var bigFish = function(){
    this.x;
    this.y;
    this.angle;
    // this.bigEye = new Image();
    // this.bigBody = new Image();
    // this.bigTail = new Image();

    this.bigfishTailTimer = 0;//尾巴计时器
    this.bigfishTailCount = 0;//尾巴执行的帧数

    this.bigfisheyeTimer = 0;//眼睛的计时器
    this.bigfisheyeCount = 0;//眼睛的执行帧数
    this.bigfisheyeInterval = 1000;//时间间隔1s，当前图片执行的时间

    this.bigfishbodyCount = 0;//身体的执行帧数
}
bigFish.prototype.init = function(){
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;

    this.angle = 0;

    // this.bigEye.src = "./images/bigfisheye01.png";
    // this.bigBody.src = "./images/bigfishbody01.png";
    // this.bigTail.src = "./images/bigfishtail01.png";
}
bigFish.prototype.draw = function(){
    //lerp x---> sbx
    //大鱼的横纵坐标随着鼠标进行变换
    this.x = lerpDistance(sbx,this.x,0.96);
    this.y = lerpDistance(sby,this.y,0.96);

    //delta angle 角度差
    // Math.atan2(y,x);返回的是-PI - PI之间的数值
    var deltaY = sby - this.y;
    var deltaX = sbx - this.x;
    var beta = Math.atan2(deltaY,deltaX) + Math.PI;//鼠标和大鱼之间的角度差
    
    //lerp angle
    this.angle = lerpAngle(beta,this.angle,0.6);

    //bigfishTail  Count
    this.bigfishTailTimer += deltaTime;

    if(this.bigfishTailTimer > 50){
        this.bigfishTailCount = ( this.bigfishTailCount + 1 ) % 8;
        this.bigfishTailTimer %= 50;//计时器复原
    }

    //bigfish eye
    this.bigfisheyeTimer += deltaTime;
    if(this.bigfisheyeTimer > this.bigfisheyeInterval){
        this.bigfisheyeCount = (this.bigfisheyeCount + 1) % 2;
        this.bigfisheyeTimer %= this.bigfisheyeInterval;//计时器复原

        if(this.bigfisheyeCount == 0 ){//判断眼睛的状态---闭眼
            this.bigfisheyeInterval = Math.random() * 1500 + 2000;//[2000,3500)
        }else{
            this.bigfisheyeInterval = 200;
        }
    }
    ctx1.save();//中间的绘制仅限于大鱼
    ctx1.translate(this.x,this.y);//大鱼的坐标位置
    ctx1.rotate(this.angle);//先改变大鱼的坐标原点，再进行旋转一定的角度
    //下面绘制大鱼的眼睛、身体和尾巴就等于在大鱼的区域给与坐标了
    var bfTCount = this.bigfishTailCount;
    var bfECount = this.bigfisheyeCount;
    var bfBCount = this.bigfishbodyCount;

    ctx1.drawImage(bigfishTail[bfTCount],-bigfishTail[bfTCount].width * 0.5 + 35,-bigfishTail[bfTCount].height * 0.5);
    if(score.double == 1){//orange
        ctx1.drawImage(bigfishbodyora[bfBCount],-bigfishbodyora[bfBCount].width*0.5,-bigfishbodyora[bfBCount].height*0.5);
    }else{//blue
        ctx1.drawImage(bigfishbodyblue[bfBCount],-bigfishbodyblue[bfBCount].width*0.5,-bigfishbodyblue[bfBCount].height*0.5);
    }
    
    ctx1.drawImage(bigfisheye[bfECount],-bigfisheye[bfECount].width * 0.5,-bigfisheye[bfECount].height * 0.5);
    
    ctx1.restore();
}
