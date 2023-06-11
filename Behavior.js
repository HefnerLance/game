import Entity from './entity.js';
let entity = Entity;
export default class Behavior {
  constructor(entity) {
    this.entity = entity;
  }

  update(enemies) {
    if (this.entity.type === 'prey') {
      // Prey behavior
      this.evadePredators(enemies);
      this.seekSafety();
    } else if (this.entity.type === 'predator') {
      // Predator behavior
      this.chasePrey(enemies);
      this.capturePrey();
    }
  }

  evadePredators(enemies) {
    let nearestPredator = this.getNearestEnemy(enemies, 'predator');
    if (nearestPredator) {
      let dx = this.entity.x - nearestPredator.x;
      let dy = this.entity.y - nearestPredator.y;
      let magnitude = Math.sqrt(dx * dx + dy * dy);

      // Normalize and set entity direction away from predator
      this.entity.dx = dx / magnitude;
      this.entity.dy = dy / magnitude;
    }
  }

  seekSafety() {
    // Prey behavior to seek safety
    // Adjust entity's movement to move towards safety or avoid danger
  }

  chasePrey(enemies) {
    let nearestPrey = this.getNearestEnemy(enemies, 'prey');
    if (nearestPrey) {
      let dx = nearestPrey.x - this.entity.x;
      let dy = nearestPrey.y - this.entity.y;
      let magnitude = Math.sqrt(dx * dx + dy * dy);

      // Normalize and set entity direction towards prey
      this.entity.dx = dx / magnitude;
      this.entity.dy = dy / magnitude;
    }
  }

  capturePrey() {
    // Predator behavior to capture prey
    // Check if the entity has captured prey and perform necessary actions
  }

  getNearestEnemy(enemies, type) {
    let nearestDistance = Infinity;
    let nearestEnemy = null;

    for (let enemy of enemies) {
      if (enemy.type === type) {
        let distance = this.getDistance(
          this.entity.x,
          this.entity.y,
          enemy.x,
          enemy.y
        );

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestEnemy = enemy;
        }
      }
    }

    return nearestEnemy;
  }

  getDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
