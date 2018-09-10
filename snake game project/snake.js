const cvs= document.getElementById("snake");
const ctx= cvs.getContext("2d");

// create the unite
const box=32;

//load image
const ground= new Image();
ground.src="image/ground.png";

const foodImg = new Image();
foodImg.src="image/food.png"

// load Audio
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src="audio/dead.mp3"
down.src="audio/down.mp3"
eat.src="audio/eat.mp3"
left.src="audio/left.mp3"
right.src="audio/right.mp3"
up.src="audio/up.mp3"

//create the snake 
 let snake =[];
snake[0]={
  x:9*box,
  y:10*box
}


//create food 
let food={
  x: Math.floor(Math.random()*17+1)*box,
  y: Math.floor(Math.random()*15+3)*box
}
 // create score 
let score=0;

// control the snake
document.addEventListener("keydown",direction);
d=""
function direction(ev){
  let key = ev.keyCode;
  if (key == 37 && d != "RIGHT") {
    d = "LEFT";
    left.play();

  } else if (key == 38 && d != "DOWN") {
    d = "UP";
    up.play();

  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
    right.play();

  } else if (key == 40 && d != "UP") {
    d = "DOWN";
    down.play();
  }
}
// check collision 
function collision(head,array){
  for(let i=0; i<array.length;i++){
    if(head.x == array[i].x && head.y == array[i].y){
      return true; 
  }
}
  return false;
}
// draw everything to the canvas

function draw(){
  ctx.drawImage(ground,0,0);
  for (let i = 0; i<snake.length ; i++){
    if(i==0){ctx.fillStyle="green"}
    else{ctx.fillStyle="white"}
//    ctx.fillStyle = (i==0)? "green" : "white";
    ctx.fillRect(snake[i].x,snake[i].y,box,box);
    
    ctx.fillStyle="red";
    ctx.fillRect(snake[i].x,snake[i].y,box,box)
}
  ctx.drawImage(foodImg,food.x,food.y)
  
  // old head position
  let snakeX=snake[0].x;
  let snakeY=snake[0].y;
   
  
  // which direction 
  if  (d=="LEFT") snakeX -=box;
  if  (d=="UP") snakeY -=box;
  if  (d=="RIGHT") snakeX +=box;
  if  (d=="DOWN") snakeY +=box;
  // if snake eat the food
  if(snakeX == food.x && snakeY == food.y)
    {
      eat.play();
      score++; // we don't revove the tail
       food = {
        x: Math.floor(Math.random() * 17 + 1) * box,
        y: Math.floor(Math.random() * 15 + 3) * box
      }
    }
    else{
        // remove the tail
        snake.pop();
  
      }
  

  // add new head
   let newHead={
     x:snakeX,y:snakeY
   }
   // gameover rule
  if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake) ){
    clearInterval(game);
    dead.play();
    
  }
  //adding head
   snake.unshift(newHead);
  
   
  ctx.fillStyle="white";
  ctx.font="45px Changa one"
  ctx.fillText(score,2*box,1.6*box);
}
//call draw function every 100 ms
let game = setInterval(draw,120);