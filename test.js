
var controller;

var context = document.querySelector("canvas").getContext("2d");

var screen = {
  width: 1400,
  height: 900
}

context.canvas.width = screen.width;
context.canvas.height = screen.height;

var player = {
  x: 470,
  y: 770,
  xv: 0,
  yv: 0,
  height: 20,
  width: 20,
  x2: function(){return this.x + this.width;},
  y2: function(){return this.y + this.height;},
  friction: 0.9,
  speed: 0.5
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
  friction: 0.98
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
  handleBoxCollision(player);
  drawScreen();

  
  player.yv *= player.friction;
  player.xv *= player.friction;
  
  box.yv *= box.friction;
  box.xv *= box.friction;
  // printCollision();
  // setTimeout(function(){window.requestAnimationFrame(loop);}, 1000/20)
  window.requestAnimationFrame(loop);
}

var handleMovement = function(){

  if (controller.left) {player.xv -= player.speed;}
  if (controller.up) {player.yv -= player.speed;}
  if (controller.right) {player.xv += player.speed;}
  if (controller.down) {player.yv += player.speed;}

  player.y += player.yv;
  player.x += player.xv;

  handleScreenEdge(player);
}

var handleBoxCollision = function(thing){

  if(thing.x < box.x2() && thing.x2() > box.x && thing.y < box.y2() && thing.y2() > box.y){
        
    let diffx = Math.abs(thing.x - box.x2());
    let diffx2 = Math.abs(thing.x2() - box.x);
    let diffy = Math.abs(thing.y - box.y2());
    let diffy2 = Math.abs(thing.y2() - box.y);
    let hori = Math.min(diffx, diffx2);
    let vert = Math.min(diffy, diffy2);

    if (hori < vert) {
      box.xv = thing.xv;
    } else {
      box.yv = thing.yv;
    }
  }
  
  box.y += box.yv;
  box.x += box.xv;
  handleScreenEdge(box);

  if(thing.x < box.x2() && thing.x2() > box.x && thing.y < box.y2() && thing.y2() > box.y){
        
    let diffx = Math.abs(thing.x - box.x2());
    let diffx2 = Math.abs(thing.x2() - box.x);
    let diffy = Math.abs(thing.y - box.y2());
    let diffy2 = Math.abs(thing.y2() - box.y);
    let min = Math.min(diffx, diffx2, diffy, diffy2);

    if(min == diffy){
      if(thing.yv >= -0.5) {
        thing.y = box.y2();
        thing.yv = 0;
      } else {
        thing.y -= thing.yv;
        thing.yv *= -thing.friction;
      }
    } else if(min == diffy2){
      if(thing.yv <= 0.5) {
        thing.y = box.y - thing.height;
        thing.yv = 0;
      } else {
        thing.y -= thing.yv;
        thing.yv *= -thing.friction;
      }
    } else if(min == diffx){
      if(thing.xv >= -0.5) {
        thing.x = box.x2();
        thing.xv = 0;
      } else {
        thing.x -= thing.xv;
        thing.xv *= -thing.friction;
      }
    } else if(min == diffx2){
      if(thing.xv <= 0.5) {
        thing.x = box.x - thing.width;
        thing.xv = 0;
      } else {
        thing.x -= thing.xv;
        thing.xv *= -thing.friction;
      }
    }
  }
}

var handleScreenEdge = function(thing){

  if (thing.x <= 0) {
    if(thing.xv > -0.5) {
      thing.x = 0;
      thing.xv = 0;
    } else {
      thing.x -= thing.xv;
      thing.xv *= -1;
    }
  } else if(thing.x2() >= screen.width) {
    if(thing.xv < 0.5) {
      thing.x = screen.width - thing.width;
      thing.xv = 0;
    } else {
      thing.x -= thing.xv;
      thing.xv *= -1;
    }
  }
  
  if (thing.y <= 0) {
    if(thing.yv > -0.5) {
      thing.y = 0;
      thing.yv = 0;
    } else {
      thing.y -= thing.yv;
      thing.yv *= -1;
    }
  } else if(thing.y2() >= screen.height) {
    if(thing.yv < 0.5) {
      thing.y = screen.height - thing.height;
      thing.yv = 0;
    } else {
      thing.y -= thing.yv;
      thing.yv *= -1;
    }
  }
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




var printCollision = function(){
  var print =
  "player x more than box x: " + (player.xv > box.xv) + 
  "\n  player x = " + player.x + 
  "\n player x2 = " + player.x2() +
  "\n player xv = " + player.xv +
  "\n  player y = " + player.y + 
  "\n player y2 = " + player.y2() + 
  "\n player yv = " + player.yv + 
  "\n     box x = " + box.x + 
  "\n    box x2 = " + box.x2() +
  "\n    box xv = " + box.xv +
  "\n     box y = " + box.y +
  "\n    box y2 = " + box.y2();
  "\n    box yv = " + box.yv;

  console.log(print);
}