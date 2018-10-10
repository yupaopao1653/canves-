
//大鱼吃果实的碰撞检测
//原理：检测大鱼和果实的距离

function bigFishFruitCollision(){
    //判断大鱼和果实的距离
    for(var i=0; i < fruit.num ; i++){
        if(fruit.alive[i]){
            //calculate length
            var len = calLength2(fruit.x[i],fruit.y[i],bigfish.x,bigfish.y);
            if(len < 900){
                //fruit eaten
                fruit.dead(i);
                score.fruitNum ++;
                bigfish.bigfishbodyCount ++;
                if( bigfish.bigfishbodyCount >7){
                    bigfish.bigfishbodyCount = 7;
                }
                if(fruit.fruitType[i] == 'blue'){//蓝色果实
                    score.double = 2;
                }
            }
        }
    }
}

//大鱼喂小鱼
function bigfishsmallfishCollision(){
    var len = calLength2(bigfish.x,bigfish.y,smallfish.x,smallfish.y);
    if(len < 900){
        //smallfish recover
        //使小鱼的计时器为零
        smallfish.smallfishbodyCount = 0;//眼睛的执行帧数
        

        //大鱼的序列帧恢复
        bigfish.bigfishbodyCount = 0;

        //score update
        score.addScore();
    }
}