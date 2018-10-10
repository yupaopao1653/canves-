
window.requestAnimationFrame = window.requestAnimationFrame||function (fn) {return setTimeout(fn,1000/60)}
    window.cancelAnimationFrame = window.cancelAnimationFrame ||clearTimeout;

// window.requestAnimationFrame = (function(){
//     return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.mozRequestAnimationFrame;
//     function(callback,){
//         return window.setTimeout(callback,1000/60);
//     }
// })();

function lerpDistance(aim,cur,ratio){
    var delta = cur - aim;
    return aim + delta * ratio;//按照一定比例趋向于目标值的一个值
}

function lerpAngle(a,b,t){//角度中的返回按照一定比例趋向于目标值的一个值
    var d = b-a;
    if(d > Math.PI) d = d - 2 * Math.PI;
    if(d < -Math.PI) d = d + 2 * Math.PI;
    return a + d * t;
}

function calLength2(x1,y1,x2,y2){//计算三角形的斜边平方
    return Math.pow(x1-x2,2) + Math.pow(y1-y2,2);
}