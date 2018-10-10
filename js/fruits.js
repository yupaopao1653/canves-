var fruitObj = function () {
    this.alive = []; //bool 判断是否活着
    this.x = [];
    this.y = [];
    this.l = []; //图片的长度
    this.fruitType = [];//果实类型
    this.spd = []; //每个果实都有自己的速度，即成长速度和向上移动速度
    this.orange = new Image(); //橙色果实
    this.blue = new Image(); //蓝色果实
}

fruitObj.prototype.num = 30; //池子中果实的数量
fruitObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        //告诉每一个果实的状态
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.spd[i] = Math.random() * 0.017 + 0.003; //[0.002,0.015)
        this.fruitType[i] = "";
        this.born(i); //初始化时，所有的果实都找到位置出生
    }
    this.orange.src = "./images/orange.png";
    this.blue.src = "./images/blue.png";
}
fruitObj.prototype.draw = function () {
    //长在海葵上
    for (var i = 0; i < this.num; i++) {
        if (this.alive[i] == true) {
            if(this.fruitType[i] == "blue"){
                var pic = this.blue;
            }else{
                var pic = this.orange;
            }
            //绘制果实draw 找到一个海葵find 然后长大grow 漂浮fly up 
            if (this.l[i] <= 10) {
                this.l[i] += this.spd[i] * deltaTime; //过程变得平缓
            } else {
                this.y[i] -= this.spd[i] * 7 * deltaTime; //果实向上移动，减小果实的纵坐标
            }
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
            if (this.y[i] < 10) {
                this.alive[i] = false;
            }
        }

    }
}
fruitObj.prototype.born = function (i) {
    //随机找一个海葵的位置，并记录
    var aneID = Math.floor(Math.random() * ane.num); //随机找一个海葵
    this.x[i] = ane.x[aneID];
    this.y[i] = canHeight - ane.len[aneID];
    this.l[i] = 0; //果实长度从零开始长大
    this.alive[i] = true;
    var ran = Math.random();
    if(ran < 0.2){
        this.fruitType[i] =  "blue";
    }else{
         this.fruitType[i] = "orange";
    }
   
}
fruitObj.prototype.dead = function(i){
    this.alive[i] = false;
}
// fruitObj.prototype.update = function(){
//     //检测当前屏幕上有多少果实
//     var num = 0;
//     for(var i=0;i<this.num;i++){
//         if(this.alive[i]){
//             num ++;
//         }
//     }

// }
function fruitMonitor(){//监视屏幕上有多少果实是活着的
    var num = 0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i] == true) num++;      
    }
    if(num < 30 ){
        //如果果实数量少于15个，则自动生成
        //sendFruit
        sendFruit();
        return;
    }
}
function sendFruit(){//判断屏幕中当前果实的状态
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}
//3.绘制果实，黄色果实和蓝色果实
//使用到的API：drawImages();
//长大 => 成熟
//果实允许范围 = 15
//游戏规则：保持屏幕上有15个果实