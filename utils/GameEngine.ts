import ParticleSystem from './ParticleSystem';

const YLimit = 470;

export class GameEngine {
  running = false;
  yVelocity = 0;
  rocketX = 0;
  rocketY = 0;
  fuel = 0;
  rocketCode = '';
  rocketCodeShadow = '';
  particleSystem: ParticleSystem;

  constructor() {
    this.particleSystem = new ParticleSystem(
      this.rocketX, this.rocketY + 10, YLimit
    );

    this.reset();
  }

  update() {
    if(!this.running) {
      return;
    }

    const x = Math.round(this.rocketX);
    const y = Math.round(this.rocketY);

    this.particleSystem.updatePosition(x, y + 10);
    this.particleSystem.update();

    const code = `((fuel_level, height) => {${this.rocketCode}})(${this.fuel}, ${470 - this.rocketY})`;

    let throttle = eval(code);
    throttle = throttle < 0 || throttle > 10 || this.fuel <= 0 ? 0 : throttle;

    this.fuel -= throttle;
    this.fuel = this.fuel < 0 ? 0 : this.fuel;

    this.yVelocity += 0.01 - (throttle * 0.002);

    this.rocketY += this.yVelocity;

    if(this.rocketY >= YLimit) {
      this.rocketY = YLimit;
      this.running = false;
    }
  }

  setCode(codeToRun: string) {
    this.rocketCodeShadow = codeToRun;
  }

  reset() {
    this.running = false;
    this.yVelocity = 0.1;
    this.rocketX = 270;
    this.rocketY = 100;
    this.fuel = 1000;
    this.particleSystem.reset();
  };

  start() {
    if(this.running) {
      return;
    }

    this.running = true;

    // Only set new code, if this is first start after reset
    if(this.rocketY === 100) {
      this.rocketCode = this.rocketCodeShadow;
    }
  }

  pause() {
    if(!this.running) {
      return;
    }

    this.running = false;
  }
}