
const unit = 30;

let head;
let tail;
let apple;
let context = document.querySelector("canvas").getContext("2d");

let xv = 1;
let yv = 0;
let speed = 1;

let screen = {
  width: 20,
  height: 20
}

context.canvas.width = screen.width * unit;
context.canvas.height = screen.height * unit;

let controller = {
  left: false,
  up: false,
  right: false,
  down: false,
  keyListener: function(event) {
    let key_state = (event.type == "keydown") ? true : false;
    switch(event.keyCode) {
      case 37:
        if(xv == 0){
          xv = -1; yv = 0;
        }
        break;
      case 38:
        if(yv == 0){
          yv = -1; xv = 0;
        }
        break;
      case 39:
        if(xv == 0){
          xv = 1; yv = 0;
        }
        break;
      case 40:
        if(yv == 0){
          yv = 1; xv = 0;
        }
        break;
    }
  }
};

function Block(height, width, x, y) {
  this.height = height;
  this.width = width;
  this.x = x;
  this.y = y;
}

function loop(){
  move();
  drawScreen();
  setTimeout(function(){window.requestAnimationFrame(loop);}, 1000/speed);
}

function move(){
  
  for(i=tail.length-1; i>0; i--){
    tail[i].x = tail[i-1].x;
    tail[i].y = tail[i-1].y;
  }

  tail[0].x = head.x;
  tail[0].y = head.y;

  head.x += xv;
  head.y += yv;

  if(head.x >= screen.width){
    head.x = 0;
  } else if(head.x < 0){
    head.x = 19;
  }
  
  if(head.y >= 20){
    head.y = 0;
  } else if(head.y < 0){
    head.y = 19;
  }

  if(head.x == apple.x && head.y == apple.y){
    apple.x = Math.floor(Math.random() * 20);
    apple.y = Math.floor(Math.random() * 20);
    tail.push(new Block(1, 1, tail[0].x, tail[0].y));
    speed++;
  }

  for(i=0;i<tail.length;i++){
    if(head.x == tail[i].x && head.y == tail[i].y){
      head = new Block(1, 1, 9, 9);
      tail = [
        new Block(1, 1, 8, 9),
        new Block(1, 1, 8, 8),
        new Block(1, 1, 9, 8)
      ];
      apple = new Block(1, 1, 2, 2);
      speed = 1;
    }
  }
}

function drawScreen(){
  
  context.fillStyle = "black";
  context.fillRect(0, 0, screen.width *unit, screen.height*unit);

  context.fillStyle = "white";
  context.fillRect(head.x*unit, head.y*unit, head.width*unit, head.height*unit);
  
  for(i = 0; i < tail.length; i++){
    let block = tail[i];
    context.fillStyle = "green";
    context.fillRect(block.x*unit, block.y*unit, block.width*unit, block.height*unit);
  }

  context.fillStyle = "red";
  context.fillRect(apple.x*unit, apple.y*unit, apple.width*unit, apple.height*unit);
}

window.addEventListener("keydown", controller.keyListener);
  
head = new Block(1, 1, 9, 9);
tail = [
  new Block(1, 1, 8, 9),
  new Block(1, 1, 8, 8),
  new Block(1, 1, 9, 8)
];

apple = new Block(1, 1, 2, 2);
window.requestAnimationFrame(loop);