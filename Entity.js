import Behavior from './Behavior';

export default class Entity {
  constructor(game, x, y, radius, color, type = 'prey', behavior) {
    if (typeof x !== 'number' || isNaN(x)) {
      throw new Error('Invalid x coordinate');
    }
    if (typeof y !== 'number' || isNaN(y)) {
      throw new Error('Invalid y coordinate');
    }
    if (typeof type !== 'string') {
      throw new Error('Invalid type');
    }

    this.game = game;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.type = type;
    this.speed = 1 + Math.random() / 60;
    this.threatLevel = this.radius;
    this.detectionRadius = 100;
    this.dx = Math.random() - 0.5;
    this.dy = Math.random() - 0.5;
    this._behavior = behavior || new Behavior(this); // Initialize with provided behavior or create a new instance
    console.log('Entity constructor x,y:', this.x, this.y);
  }

  getDistance(x1, y1, x2, y2) {
    // console.log('Distance', x1, y1, x2, y2);
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }

  update(enemies) {
    this._behavior.update(enemies);

    // Check initial values
    // console.log(
    //   'Initial values:',
    //   this.dx,
    //   this.dy,
    //   this.speed,
    //   this.x,
    //   this.y
    // );

    // this.dx *= this.speed;
    // this.dy *= this.speed;
    // this.x += this.dx;
    // this.y += this.dy;

    // // Check values after update
    // console.log(
    //   'Values after update:',
    //   this.dx,
    //   this.dy,
    //   this.speed,
    //   this.x,
    //   this.y
    // );

    // // Check canvas and radius values
    // console.log(
    //   'Canvas and radius values:',
    //   this.radius,
    //   this.game.canvas.width,
    //   this.game.canvas.height
    // );

    // Keep entity within the canvas boundaries
    this.x = Math.max(
      this.radius,
      Math.min(this.x, this.game.canvas.width - this.radius)
    );
    this.y = Math.max(
      this.radius,
      Math.min(this.y, this.game.canvas.height - this.radius)
    );

    // Check values after boundary correction
    // console.log(
    //   'Values after boundary correction:',
    //   this.dx,
    //   this.dy,
    //   this.speed,
    //   this.x,
    //   this.y
    // );
  }
  isPredator() {
    return this.isPredator; // not this.entity.isPredator
  }
  isPrey() {
    return this.isPrey; // not this.entity.isPrey
  }

  getNearestEnemy(enemies) {
    let nearestDistance = Infinity;
    let nearestEnemy = null;

    for (let enemy of enemies) {
      let distance = this.getDistance(this.x, this.y, enemy.x, enemy.y);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestEnemy = enemy;
      }
    }

    return nearestEnemy;
  }
  draw() {
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fill();
  }
}
