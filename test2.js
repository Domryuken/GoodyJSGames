
var context = document.querySelector("canvas").getContext("2d");

var screen = {
  width: 1400,
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

var platform = {
  height: 10,
  width: 200,
  x: 200,
  y: 850,

  left: function(){return this.x - (this.width/2)},
  right: function(){return this.x + (this.width/2)},
  top: function(){return this.y - (this.height/2)},
  bottom: function(){return this.y + (this.height/2)}

}

var ground = {
  height: 10,
  width: screen.width,
  x: screen.width/2,
  y: screen.height - 5,

  left: function(){return this.x - (this.width/2)},
  right: function(){return this.x + (this.width/2)},
  top: function(){return this.y - (this.height/2)},
  bottom: function(){return this.y + (this.height/2)}

}

var player = {
  height: 20,
  width: 10,
  x: 100,
  y: 800,
  xv: 0,
  yv: 0,
  friction: 0.9,
  speed: 0.3,
  airborne: true,

  left: function(){return this.x - (this.width/2)},
  right: function(){return this.x + (this.width/2)},
  top: function(){return this.y - (this.height/2)},
  bottom: function(){return this.y + (this.height/2)},

  setTop: function(value){this.y = value + (this.height/2)},
  setBottom: function(value){this.y = value - (this.height/2)},

  ontop: function(thing){
    return this.bottom() >= thing.top() && this.top() <= thing.bottom() && this.right() >= thing.left() && this.left() <= thing.right();
  },

  movement: function(input){
    if(input.right){this.xv += this.speed;};
    if(input.left){this.xv -= this.speed;};
    if(!this.airborne && input.space){
      this.y -= 1;
      this.yv -= 5;
      this.airborne = true;
    };
    this.x = Math.round(this.x + this.xv);
    
    this.xv *= this.friction;
    this.yv *= 0.99;
  }
}

var barriers = [
  ground,
  platform
];

var gravity = function(object){
  if(object.airborne) {
    object.yv += 0.1;
  } else {
    object.yv = 0;
  }
}

var collision = function(object, others){

  object.airborne = true;

  for(i = 0; i < others.length; i++) {
    let other = others[i];
    if(object.ontop(other)){
      if(object.yv >= 0) {
        object.setBottom(other.top());
        object.airborne = false;
      } else if(object.yv < 0) {
        object.yv *= -1;
        object.setTop(other.bottom() + 1);
      }
    }   
  }

  object.y = Math.round(object.y + object.yv);
}

var loop = function(){

  player.movement(controller);
  gravity(player);
  collision(player, barriers);
  

  // console.log(player.yv + "\n" + player.y, "\n" + player.airborne + "\n" + player.bottom() + "\n" + ground.top());
  
  drawScreen();

  // setTimeout(function(){window.requestAnimationFrame(loop);}, 1000/20)
  window.requestAnimationFrame(loop);
}



var drawScreen = function(){
  
  context.fillStyle = "black";
  context.fillRect(0, 0, screen.width, screen.height);
  context.fillStyle = "white";
  context.fillRect(platform.left(), platform.top(), platform.width, platform.height);
  context.fillStyle = "white";
  context.fillRect(ground.left(), ground.top(), ground.width, ground.height);
  
  context.fillStyle = "red";
  context.fillRect(player.left(), player.top(), player.width, player.height);
}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);