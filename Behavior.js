export default class Behavior {
  constructor(entity) {
    this.entity = entity;
    console.log('Behavior constructor x,y:', this.entity.x, this.entity.y);
  }

  update(enemies) {
    if (this.entity.isPrey) {
      // Prey behavior
      this.evadePredators(enemies);
      this.seekSafety();
    } else if (this.entity.isPredator) {
      // Predator behavior
      this.chasePrey(enemies);
      this.capturePrey();
    }
  }

  evadePredators(enemies) {
    let nearestPredator = this.entity.getNearestEnemy(enemies);
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
    let nearestPrey = this.entity.getNearestEnemy(enemies);
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
}
