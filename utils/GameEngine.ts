import ParticleSystem from './ParticleSystem';

const YLimit = 470;
const YInit = 70;

export class GameEngine {
  running = false;
  yVelocity = 0;
  rocketX = 0;
  rocketY = 0;
  fuel = 0;
  rocketCode = '';
  rocketCodeShadow = '';
  lastError: string | null = null;
  elapsedMs = 0;
  private runStartedAt: number | null = null;
  particleSystem: ParticleSystem;

  constructor() {
    this.particleSystem = new ParticleSystem(
      this.rocketX, this.rocketY + 10, YLimit
    );

    this.reset();
  }

  update() {
    if(!this.running) return;

    const x = Math.round(this.rocketX);
    const y = Math.round(this.rocketY);

    const code = `((fuel_level, height) => {${this.rocketCode}})(${this.fuel}, ${470 - this.rocketY})`;

    let throttle: number;

    try {
      throttle = eval(code);
    } catch (err) {
      this.lastError = err instanceof Error ? err.message : String(err);
      this.stopRunning();
      return;
    }

    const isValidThrottle = typeof throttle === 'number' && Number.isFinite(throttle);
    throttle = !isValidThrottle || throttle < 0 || throttle > 10 || this.fuel <= 0 ? 0 : throttle;

    this.fuel -= 0.4 * Math.log10(1 + throttle);
    this.fuel = this.fuel < 0 ? 0 : this.fuel;


    this.particleSystem.updateParams(x, y + 10, this.yVelocity);
    this.particleSystem.update(this.fuel > 0 && throttle > 0);

    this.yVelocity += 0.01 - (throttle * 0.002);

    this.rocketY += this.yVelocity;

    if(this.rocketY >= YLimit) {
      this.rocketY = YLimit;
      this.stopRunning();
    }
  }

  setCode(codeToRun: string) {
    this.rocketCodeShadow = codeToRun;
  }

  getElapsedMs(): number {
    return this.elapsedMs + (this.runStartedAt !== null ? Date.now() - this.runStartedAt : 0);
  }

  reset() {
    this.running = false;
    this.yVelocity = 0.1;
    this.rocketX = 270;
    this.rocketY = YInit;
    this.fuel = 100;
    this.lastError = null;
    this.elapsedMs = 0;
    this.runStartedAt = null;
    this.particleSystem.reset();
  };

  start() {
    if(this.running) {
      return;
    }

    this.lastError = null;
    this.running = true;
    this.runStartedAt = Date.now();

    // Only set new code, if this is first start after reset
    if(this.rocketY === YInit) {
      this.rocketCode = this.rocketCodeShadow;
    }
  }

  pause() {
    if(!this.running) {
      return;
    }

    this.stopRunning();
  }

  private stopRunning() {
    if(this.runStartedAt !== null) {
      this.elapsedMs += Date.now() - this.runStartedAt;
      this.runStartedAt = null;
    }

    this.running = false;
  }
}
