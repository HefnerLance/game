import Entity from './entity.js';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    console.log(this.canvas);
    this.entities = [];
  }

  addEntity(radius, color, type) {
    const x = radius + Math.random() * (this.canvas.width - radius * 2);
    const y = radius + Math.random() * (this.canvas.height - radius * 2);
    console.log('Game addEntity x,y:', x, y);
    this.entities.push(new Entity(this, x, y, radius, color, type));
    console.log(this.entities);
  }

  updateAndDraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update(this.entities);
      this.entities[i].draw();
    }

    // Other game logic...
  }
}
