import p5Types from 'p5';

class Particle {
  x = 0;
  y = 0;
  life = 100;
  p5: p5Types;

  constructor(p5: p5Types, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.p5 = p5;
  }

  display() {
    this.p5.ellipse(this.x, this.y, 5, 5);
  }

  run() {
    this.life--;
  }
}

export default class ParticleSystem {
  particles:Particle[] = [];
  x: number = 0;
  y: number = 0;
  p5: p5Types | null = null;

  constructor(p5: p5Types, x: number, y:number) {
    this.particles = [];
    this.x = x;
    this.y = y;
    this.p5 = p5;
  }

  run() {
    this.update();
    this.display();

    if(this.particles.length < 10) {
      this.addParticle();
    }
  }

  addParticle() {
    if(!this.p5 || Math.random() < 0.5) {
      return;
    }

    this.particles.push(
      new Particle(this.p5, this.x, this.y)
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

  update() {
    for(let idx =this.particles.length - 1; idx >= 0; idx --) {
      this.particles[idx].run();
      if(this.particles[idx].life <= 0) {
        this.particles.splice(idx, 1);
      }
    }
  }
}