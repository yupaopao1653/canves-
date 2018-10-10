//获取画布
var can1;
var can2;
//画布对应的场景内容
var ctx1;
var ctx2;

var lastTime;//上一帧执行的时间
var deltaTime;//两帧间隔的时间

var canWidth;
var canHeight;

var ane;//海葵对象
var fruit;//果实对象

var bigfish;//大鱼对象

var sbx;//鼠标横坐标
var sby;//鼠标纵坐标

var smallfishTail = [];//小鱼尾巴数组
var smallfisheye = [];//小鱼眼睛数组
var smallfishbody = [];//小鱼身体

var bigfisheye = [];//大鱼眼睛数组
var bigfishTail = [];//大鱼尾巴数组
var bigfishbodyora = [];//大鱼身体橙色数组
var bigfishbodyblue = [];//大鱼身体蓝色数组

var score;//记录游戏分值

var bgPic = new Image();
document.body.onload = game;

function game(){
    init();//初始化
    lastTime = Date.now();//获取当前时间
    deltaTime = 0;//每两帧之间的间隔
    gameloop();
}
function init(){
    //获取canvas content 获取画笔
    can1 = document.getElementById('canvas1');//小鱼、字体fishes、dust、UI、circle
    ctx1 = can1.getContext('2d');
    can2 = document.getElementById('canvas2');//蓝色背景、海葵及海葵产生的果实、浮动的生物 background、ane、fruits
    ctx2 = can2.getContext('2d');

    can1.addEventListener('mousemove',onMouseMove,false);

    bgPic.src = "./images/background.png";
    
    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    bigfish = new bigFish();
    bigfish.init();

    smallfish = new smallFish();
    smallfish.init();

    sbx = canWidth * 0.5;
    sby = canHeight * 0.5;

    for(var i=0;i<2;i++){
        smallfisheye[i] = new Image();//图片格式
        smallfisheye[i].src = "./images/smallfisheye0"+i+".png";
    }
    for(var i=0;i<2;i++){
        bigfisheye[i] = new Image();//图片格式
        bigfisheye[i].src = "./images/bigfisheye0"+i+".png";
    }

    for(var i=0;i<8;i++){//小鱼尾巴变化
        smallfishTail[i] = new Image();
        smallfishTail[i].src = "./images/smallfishtail0"+i+".png";
    }
    for(var i=0;i<8;i++){//大鱼尾巴变化
        bigfishTail[i] = new Image();
        bigfishTail[i].src = "./images/bigfishtail0"+i+".png";
    }
    for(var i=0;i<20;i++){//小鱼身体变化
        smallfishbody[i] = new Image();
        smallfishbody[i].src = "./images/smallfishbodyfade"+ i +".png";
    }

    score = new scoreObj();

    for(var i=0;i<8;i++){
        bigfishbodyora[i] = new Image();
        bigfishbodyblue[i] = new Image();
        bigfishbodyora[i].src = "./images/bigfishbodyfade"+ i +".png";
        bigfishbodyblue[i].src = "./images/bigfishbodyfadeblue"+ i +".png";
    }
    //score
    ctx1.font = "30px 微软雅黑";
    ctx1.textAlign = "center";
}
function gameloop(){//游戏循环、每帧位移相加产生动画效果
    //1. 比较科学的API 当前绘制完成之后，根据机器性能确定间隔事件进行下一帧
    //2. setInterval、setTimeout解决了一段时间内未完成该事件
    //3. 会有一个动态的时间间隔
    //4. 不同浏览器需要不同的配饰
    window.requestAnimationFrame(gameloop);

    // console.log('loop');
    //每次刷新时间间隔
    var now = Date.now();
    deltaTime = now - lastTime;//每两帧之间的间隔、保障游戏动画流畅连贯
    lastTime = now;//更新时间
    // console.log(deltaTime);
    if(deltaTime>40) deltaTime=40;

    drawBackground();//绘制背景至池子中

    ane.draw();//海葵渲染到池子中
    fruit.draw();//果实渲染到池子中
    fruitMonitor();//监视屏幕上有多少果实是活着的

    ctx1.clearRect(0,0,canWidth,canHeight);//前面一帧的内容清空
    bigfish.draw();//大鱼渲染到池子中

    smallfish.draw();//小鱼渲染到池子中

    bigFishFruitCollision();//大鱼吃果实
    bigfishsmallfishCollision();//大鱼位小鱼

    score.draw();
}
function onMouseMove(e){
    if(e.offSetX || e.layerX){
        sbx = e.offSetX == undefined ? e.layerX : e.offSetX;
        sby = e.offSetY == undefined ? e.layerY : e.offSetY;
        // console.log(sbx+","+sby);
    }
}