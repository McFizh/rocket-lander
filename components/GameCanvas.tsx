import Sketch from 'react-p5';
import p5Types from 'p5';

import ParticleSystem from '../utils/ParticleSystem';

let particleSystem: ParticleSystem | null = null;
let rocketX = 290;
let rocketY = 50;

const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5
    .createCanvas(500, 500)
    .parent(canvasParentRef);

  particleSystem = new ParticleSystem(p5, rocketX, rocketY+15);
};

const drawMountain = (p5: p5Types) => {
  p5.stroke('white');
  p5.strokeWeight(5);
  p5.line(0, 450, 100, 400);
  p5.line(100, 400, 200, 480);
  p5.line(200, 480, 400, 480);
  p5.line(400, 480, 500, 300);
};

const drawRocket = (p5: p5Types) => {
  const x = 290;
  const y = 50;

  p5.stroke('white');
  p5.strokeWeight(3);

  // Landing gears
  p5.line(x-15, y+10, x-8, y+10);
  p5.line(x+15, y+10, x+8, y+10);

  p5.line(x-11, y+10, x-11, y);
  p5.line(x+11, y+10, x+11, y);

  // Rocket body
  p5.line(x-11, y, x+11, y);
  p5.line(x-11, y, x-11, y-20);
  p5.line(x+11, y, x+11, y-20);
  p5.line(x+11, y-20, x, y-30);
  p5.line(x-11, y-20, x, y-30);
};

const draw = (p5: p5Types) => {
  p5.background(0);
  p5.smooth();
  p5.noFill();

  drawMountain(p5);
  drawRocket(p5);

  if(particleSystem) {
    particleSystem.run();
  }
};

const GameCanvas = () => {
  return (
    <Sketch setup={setup} draw={draw}/>
  );
};

export default GameCanvas;