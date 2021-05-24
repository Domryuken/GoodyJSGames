
var context = document.querySelector("canvas").getContext("2d");

var screen = {
  width: 900,
  height: 900
}

context.canvas.width = screen.width;
context.canvas.height = screen.height;

var controller = {
  up: false,
  left: false,
  right: false,
  down: false,
  space: false,
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
      case 32:
        controller.space = key_state;
        break;
    }
  }
};

var terrain = {
  height: 100,
  width: 100,
  x: screen.width/2,
  y: screen.height/2,

  left: function(){return this.x - (this.width/2)},
  right: function(){return this.x + (this.width/2)},
  top: function(){return this.y - (this.height/2)},
  bottom: function(){return this.y + (this.height/2)}
}

var player = {
  height: 20,
  width: 20,
  x: 100,
  y: 800,
  xv: 0,
  yv: 0,
  nx: 100,
  ny: 800,
  friction: 0.9,
  speed: 0.3,

  left: function(){return this.x - (this.width/2)},
  right: function(){return this.x + (this.width/2)},
  top: function(){return this.y - (this.height/2)},
  bottom: function(){return this.y + (this.height/2)},

  nleft: function(){return this.nx - (this.width/2)},
  nright: function(){return this.nx + (this.width/2)},
  ntop: function(){return this.ny - (this.height/2)},
  nbottom: function(){return this.ny + (this.height/2)},

  setTop: function(value){this.y = value + (this.height/2)},
  setBottom: function(value){this.y = value - (this.height/2)},

  movement: function(input){
    
    if(input.right){this.xv += this.speed;};
    if(input.left){this.xv -= this.speed;};
    if(input.down){this.yv += this.speed;};
    if(input.up){this.yv -= this.speed;};

    this.nx = Math.round(this.x + this.xv);
    this.ny = Math.round(this.y + this.yv);

    this.xv *= this.friction;
    this.yv *= this.friction;
  }
}

var terrains = [
  terrain
];

var collision = function(object, others){

  for(i = 0; i < others.length; i++) {
    let other = others[i]; 
  }
}

var loop = function(){

  player.movement(controller);
  collision(player, terrains);
  
  drawScreen();

  // setTimeout(function(){window.requestAnimationFrame(loop);}, 1000/20)
  window.requestAnimationFrame(loop);
}

var drawScreen = function(){
  
  context.fillStyle = "black";
  context.fillRect(0, 0, screen.width, screen.height);
  context.fillStyle = "white";
  context.fillRect(terrain.left(), terrain.top(), terrain.width, terrain.height);
  context.fillStyle = "red";
  context.fillRect(player.left(), player.top(), player.width, player.height);
}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);