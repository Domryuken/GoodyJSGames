
var controller;

var context = document.querySelector("canvas").getContext("2d");

var screen = {
  width: 1400,
  height: 900
}

context.canvas.width = screen.width;
context.canvas.height = screen.height;

var player = {
  x: 1300,
  y: 800,
  xv: 0,
  yv: 0,
  height: 20,
  width: 20,
  x2: function(){return this.x + this.width;},
  y2: function(){return this.y + this.height;},
  speed: 0.3,
  friction: 0.9,
  bounce: 0.99
};

var box = {
  x: 500,
  y: 800,
  xv: 0,
  yv: 0,
  height: 40,
  width: 40,
  x2: function(){return this.x + this.width;},
  y2: function(){return this.y + this.height;},
  friction: 0.9
}

controller = {
  up: false,
  left: false,
  right: false,
  down: false,
  keyListener: function(event) {
    var key_state = (event.type == "keydown")?true:false;
    switch(event.keyCode) {
      case 37:
        controller.left = key_state;
        break;
      case 38:
        controller.up = key_state;
        break;
      case 39:
        controller.right = key_state;
        break;
      case 40:
        controller.down = key_state;
        break;
    }
  }
};

var loop = function(){

  handleMovement();
  handleBoxCollision();
  
  handleScreenEdge(player);
  handleScreenEdge(box);
  drawScreen();
  window.requestAnimationFrame(loop);
}

var handleMovement = function(){

  if (controller.left) {player.xv -= player.speed;}
  if (controller.up) {player.yv -= player.speed;}
  if (controller.right) {player.xv += player.speed;}
  if (controller.down) {player.yv += player.speed;}

  player.y += player.yv;
  player.x += player.xv;
  player.yv *= player.friction;
  player.xv *= player.friction;
}

var handleScreenEdge = function(thing){

  if (thing.x <= 0) {
    thing.x += 1;
    thing.xv *= thing.bounce;
    thing.xv *= -1;
  } else if(thing.x2() >= screen.width) {
    thing.x -= 1;
    thing.xv *= thing.bounce;
    thing.xv *= -1;
  }
  if (thing.y <= 0) {
    thing.y += 1;
    thing.yv *= thing.bounce;
    thing.yv *= -1;
  }else if(thing.y2() >= screen.height){
    thing.y -= 1;
    thing.yv *= thing.bounce;
    thing.yv *= -1;
  }
}

var handleBoxCollision = function(){

  if(player.x <= box.x2()){
    box.xv -= player.speed
  }
  
  box.y += box.yv;
  box.x += box.xv;
  box.yv *= box.friction;
  box.xv *= box.friction;
}

var drawScreen = function(){
  
  context.fillStyle = "black";
  context.fillRect(0, 0, screen.width, screen.height);
  context.fillStyle = "red";
  context.fillRect(player.x, player.y, player.width, player.height);
  context.fillStyle = "green";
  context.fillRect(box.x, box.y, box.width, box.height);
}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
