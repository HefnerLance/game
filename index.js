import Game from './Game.js';

const canvas = document.getElementById('gameCanvas');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

const game = new Game(canvas);
for (let i = 0; i < 4; i++) {
  let radius = Math.random() * 50;
  let x = Math.random() * 50;
  let y = Math.random() * 50;
  let color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
    Math.random() * 255
  })`;
  let type = i < 2 ? 'prey' : 'predator'; // first two entities are prey, others are predators
  //test
  // Checking if the variables have valid values
  console.log(x, y, color, type);

  game.addEntity(radius, color, type);
}
function gameLoop() {
  game.updateAndDraw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
