let N=1024,B=10;
let blocks=new Array(N*2);
let meter;
let canvasWidth,cavasHeight;
let leftest=50,rightest=350;
let uppest=200,lowest=300;
class Block{
  constructor(x,y,w,h){
    this.x=x;
    this.y=y;
    this.width=w;
    this.height=h;
  }
  paint(r,g,b,alpha){
    fill(r,g,b,alpha);
    rect(this.x,this.y,this.width,this.height);
  }
}
class Meter{
  constructor(L,R){
    this.L=L;
    this.R=R;
  }
  draw(){
    fill(256,256,256);
    rect(canvasWidth*0.1,canvasHeight*0.8-canvasHeight*0.01,canvasWidth*0.8,canvasHeight*0.02);
    fill(100);
    let unitWidth=(rightest-leftest)/N;
    triangle(this.L*unitWidth+leftest-canvasWidth*0.005,canvasHeight*0.7+canvasHeight*0.10,
             this.L*unitWidth+leftest,canvasHeight*0.69,
             this.L*unitWidth+leftest+canvasWidth*0.005,canvasHeight*0.7+canvasHeight*0.10);
    triangle(this.R*unitWidth+leftest-canvasWidth*0.005,canvasHeight*0.7+canvasHeight*0.10,
             this.R*unitWidth+leftest,canvasHeight*0.69,
             this.R*unitWidth+leftest+canvasWidth*0.005,canvasHeight*0.7+canvasHeight*0.10);
  }
}
function moveMeter(step){
  if(keyIsDown(68))meter.L=Math.max(0,meter.L-step);
  if(keyIsDown(70))meter.L=Math.min(meter.R,meter.L+step);
  if(keyIsDown(74))meter.R=Math.max(meter.L,meter.R-step);
  if(keyIsDown(75))meter.R=Math.min(N,meter.R+step);
  console.log(meter.L,meter.R);
}
function keyPressed(){
  if(key==' ') moveMeter(9);
}
function drawMeter(){
  meter.draw();
}
function initCanvas(){
  canvasWidth=windowWidth;
  canvasHeight=windowHeight;
  leftest=canvasWidth*0.1;
  rightest=canvasWidth*0.9;
  uppest=canvasHeight*0.2;
  lowest=canvasHeight*0.7;
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  initCanvas();
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  initCanvas();
  meter=new Meter(400,700);
}
function initSegtree(){
  let unitWidth=(rightest-leftest)/N;
  let unitHeight=(lowest-uppest)/B;
  for(let i=N*2-1;i>=1;i--){
    if(i>=N) blocks[i]=new Block(leftest+unitWidth*(i-N),lowest-unitHeight,unitWidth,unitHeight);
    else{
      let x=blocks[i*2].x;
      let y=blocks[i*2].y-unitHeight;
      let w=blocks[i*2].width+blocks[i*2+1].width;
      blocks[i]=new Block(x,y,w,unitHeight);
    }
  }
}
function drawSegtree(){
  for(let i=1;i<=N*2-1;i++){
    blocks[i].paint(256,256,256,256);
  }
}
function drawRange(){
  let L=meter.L,R=meter.R;
  for(L+=N,R+=N;L<R;L/=2,R/=2){
    if(L%2) blocks[L++].paint(256,0,0,256);
    if(R%2) blocks[--R].paint(0,256,0,256);
  }
}
function draw() {
  background(220);
  drawMeter();
  moveMeter(11);
  initSegtree();
  drawSegtree();
  drawRange();

}
