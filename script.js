var canvas = document.getElementById("myCanvas");
var ctx= canvas.getContext('2d');
var ballRadius = 10;
var x= canvas.width/2;
var y = canvas.height-30;
var dx= 6;
var dy= -6;
var paddleheight = 10;
var paddleWidth = 250;
var paddleX = (canvas.width-paddleWidth)/2;
var leftPressed = false;
var rightPressed = false;
var brickRowCount = 10;
var brickColCount = 5;
var brickWidth = 80;
var brickHeight = 50;
var brickPadding = 5;
var brickOffsetLeft = 30;
var brickOffsetTop = 30;
var score= 0;
var lives = 3;
var bricks=[];
for(var c=0;c<brickColCount;c++){
    bricks[c]=[];
    for(var r=0;r<brickRowCount;r++){
        bricks[c][r] = {x:0, y:0, status:1}
    }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e){
    if(e.keyCode==39){
        rightPressed=true;
    }
    if(e.keyCode==37){
        leftPressed=true;
    }
}
function keyUpHandler(e){
    if(e.keyCode==39){
        rightPressed=false;
    }
    if(e.keyCode==37){
        leftPressed=false;
    }
}
function mouseMoveHandler(e){
    
    var relX= e.clientX-canvas.offsetLeft;
    //console.log(relX);
    if(relX >0 && relX < canvas.width){
        paddleX= relX- paddleWidth/2;
    }
}
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleheight, paddleWidth, paddleheight);
    ctx.fillStyle='#0095DD';
    ctx.fill();
    ctx.closePath();
}
function drawBricks(){
    for(var c=0;c<brickColCount;c++){
        for(var r=0;r<brickRowCount;r++){
            if(bricks[c][r].status==1){
                var brickX = (r*(brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (c*(brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle='#0095DD';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function collisionDetection(){
    for(var c=0;c<brickColCount;c++){
        for(var r=0;r<brickRowCount;r++){
            var b=bricks[c][r];
            if(b.status==1){
                if(x>b.x && x<brickWidth+b.x && y>b.y && y<brickHeight+b.y){
                    dy=-dy;
                    b.status=0;
                    score++;
                }
            }
        }
    }
}
function drawScore(){
    ctx.font = '16px Arial';
    ctx.fillStyle='#0095DD';
    ctx.fillText("Score: "+score,8,20);
}
function drawLives(){
    ctx.font = '16px Arial';
    ctx.fillStyle='#0095DD';
    ctx.fillText("Lives: "+lives,canvas.width-65,20);
}
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle='#0095DD';
    ctx.fill();
    ctx.closePath();
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBricks();
    drawScore();
    drawLives();
    drawPaddle();
    drawBall();
    collisionDetection();
    x+=dx;
    y+=dy;
    if(x+dx<ballRadius || x+dx>canvas.width-ballRadius){
        dx=-dx;
    }
    if(y+dy<ballRadius){
        dy=-dy;
    }
    if(y+dy>canvas.height-ballRadius){
        if(x+dx>paddleX && x+dx<paddleX+paddleWidth){
            dy=-dy;
        }
        else{
            lives--;
            if(lives==0){
                alert("YOU LOST");
                document.location.reload();
            }
            else{
                x=canvas.width/2;
                y=canvas.height-30;
                dx=6;
                dy=-6;
                paddleX=(canvas.width-paddleWidth)/2;
            }
        }
    }
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    
    requestAnimationFrame(draw);
}
draw();
