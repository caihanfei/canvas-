var dom = document.getElementById('clock');
var ctx = dom.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width/2;

function drawBackgroud(){
	ctx.save();
	ctx.translate(r,r);//中心点默认在左上角，该方法把中心点设置为中央
	ctx.beginPath();//调用该方法开始画图。
	ctx.lineWidth = 10;//边的粗细
	ctx.arc(0,0,r-5,0,2*Math.PI,false);//圆的x坐标 y左边 半径 起始角 结束角 顺时针
	ctx.stroke();//画图

	var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
	ctx.font = '18px Arial';//设置数字字体大小
	ctx.textAlign = 'center';//设置数字位置
	ctx.textBaseline = 'middle';//同上
	hourNumbers.forEach(function(number,i){
		var rad = 2 * Math.PI / 12 * i;
		var x = Math.cos(rad)*(r-30);
		var y = Math.sin(rad)*(r-30);
		ctx.fillText(number,x,y);
	});

	for(var i = 0; i<60;i++){
		var rad = 2*Math.PI/60*i;
		var x = Math.cos(rad)*(r-18);
		var y = Math.sin(rad)*(r-18);
		ctx.beginPath();
		if(i%5===0){
		ctx.fillStyle = '#000';
		ctx.arc(x,y,2,0,2*Math.PI,false);
	}else{
		ctx.fillStyle = '#ccc';
		ctx.arc(x,y,2,0,2*Math.PI,false);
	}
		ctx.fill();
	}
}
function drawHour(hour,minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI/12*hour;
	var mrad = 2*Math.PI/12/60*minute;
	ctx.rotate(rad+mrad);
	ctx.lineWidth = 6;
	ctx.lineCap = 'round';
	ctx.moveTo(0,10);
	ctx.lineTo(0,-r/2);
	ctx.stroke();
	ctx.restore();

}
function drawMinute(minute){
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI/60*minute;
	ctx.rotate(rad);
	ctx.lineWidth = 3;
	ctx.lineCap = 'round';
	ctx.moveTo(0,10);
	ctx.lineTo(0,-r+30);
	ctx.stroke();
	ctx.restore();
}
function drawSecond(second){
	ctx.save();
	ctx.beginPath();
	var rad = 2*Math.PI/60*second;
	ctx.fillStyle='#c14543'
	ctx.rotate(rad);
	ctx.moveTo(-2,20);//???????
	ctx.lineTo(2,20);//???????
	ctx.lineTo(1,-r+18);//???????
	ctx.lineTo(-1,-r+18);//???????
	ctx.fill();
	ctx.restore();
}
function drawDot(){
	ctx.beginPath();
	ctx.arc(0,0,3,0,2*Math.PI,false);
	ctx.fill();
}




function draw(){
	ctx.clearRect(0,0,width,height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackgroud();
	drawHour(hour,minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}
draw();
setInterval(draw,1000);//每秒执行一次