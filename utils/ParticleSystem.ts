import p5Types from 'p5';

class Particle {
  x = 0;
  y = 0;
  color = 'red';
  xSpeed = 0;
  ySpeed = 0;
  yLimit = 0;
  life = 40;
  p5: p5Types;

  constructor(p5: p5Types, x: number, y: number, xSpeed: number, ySpeed: number, yLimit: number) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.yLimit = yLimit;
    this.p5 = p5;
    this.color = Math.random() > 0.5 ? 'red' : 'orange';
  }

  display() {
    this.p5.stroke( this.life < 10 ? 'gray' : this.color );
    this.p5.ellipse( Math.round(this.x), Math.round(this.y), 4, 4);
  }

  run() {
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
    if(this.y >= this.yLimit && this.ySpeed > 0) {
      this.ySpeed = -1 * this.ySpeed;
      this.xSpeed *= 4;
      this.life /= 2;
      this.color = 'gray';
    }
    this.life--;
  }
}

export default class ParticleSystem {
  particles:Particle[] = [];
  p5: p5Types | null = null;
  x: number = 0;
  y: number = 0;
  yLimit: number = 0;
  yVelocity: number = 1.5;

  constructor(x: number, y:number, yLimit: number) {
    this.particles = [];
    this.x = x;
    this.y = y;
    this.yLimit = yLimit;
  }

  setP5Instance(p5: p5Types) {
    this.p5 = p5;
  }

  updateParams(x: number, y:number, v:number) {
    this.x = x;
    this.y = y;
    this.yVelocity = v + 1.5;
  }

  addParticle() {
    if(!this.p5 || Math.random() < 0.5) {
      return;
    }

    this.particles.push(
      new Particle(
        this.p5,
        this.x+(Math.random()*8-4), this.y,
        (Math.random()/2)-0.25, Math.random()+this.yVelocity,
        this.yLimit
      )
    );
  }

  display() {
    if(!this.p5) {
      return;
    }

    this.p5.strokeWeight(2);

    for(const particle of this.particles) {
      particle.display();
    }
  }

  update(createNew: boolean) {
    for(let idx = (this.particles.length - 1); idx >= 0; idx --) {
      this.particles[idx].run();
      if(this.particles[idx].life <= 0) {
        this.particles.splice(idx, 1);
      }
    }

    if(createNew && this.particles.length < 50) {
      this.addParticle();
    }
  }

  reset() {
    this.particles = [];
  }
}