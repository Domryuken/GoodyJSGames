
let context = document.querySelector("canvas").getContext("2d");

let screen = {
  width: 1400,
  height: 900
}

context.canvas.width = screen.width;
context.canvas.height = screen.height;

let controller = {
  up: false,
  left: false,
  right: false,
  down: false,
  keyListener: function(event) {
    let key_state = (event.type == "keydown")?true:false;
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

let loop = function(){
  drawScreen();
  // setTimeout(function(){window.requestAnimationFrame(loop);}, 1000/20)
  window.requestAnimationFrame(loop);
}



let drawScreen = function(){
  
  context.fillStyle = "black";
  context.fillRect(0, 0, screen.width, screen.height);
}

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);