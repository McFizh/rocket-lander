import { useCallback, useContext, useEffect, useRef } from 'react';
import P5 from 'p5';

import ParticleSystem from '../utils/ParticleSystem';
import { StoreContext } from '../utils/Store';

let particleSystem: ParticleSystem | null = null;
let rocketX = 290;
let rocketY = 100;
let yVelocity = 0.0;

const setup = (p5: P5, canvasParentRef: Element | null) => {
  if(canvasParentRef === null) {
    return;
  }

  p5
    .createCanvas(500, 500)
    .parent(canvasParentRef);

  p5.background(0);

  particleSystem = new ParticleSystem(
    p5, rocketX, rocketY + 10, 476
  );
};

const drawMountain = (p5: P5) => {
  p5.stroke('white');
  p5.strokeWeight(5);
  p5.line(0, 450, 100, 400);
  p5.line(100, 400, 200, 480);
  p5.line(200, 480, 400, 480);
  p5.line(400, 480, 500, 300);
};

const drawRocket = (p5: P5, x: number, y: number) => {
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

const draw = (p5: P5) => {
  const x = Math.round(rocketX);
  const y = Math.round(rocketY);

  p5.background(0);
  p5.smooth();
  p5.noFill();

  drawMountain(p5);
  drawRocket(p5, x, y);

  if(particleSystem) {
    particleSystem.updatePosition(x, y + 10);
    particleSystem.run();
  }

  rocketY+=yVelocity;
};

const GameCanvas = () => {
  const { running, setRunning } = useContext(StoreContext);

  const ref = useRef(null);

  const setRef = useCallback( (node) => {
    if(ref.current) {
      // Unmount
    }

    if(node) {
      new P5( (p) => {
        p.setup = () => setup(p, node);
        p.draw = () => draw(p);
      });
    }

    ref.current = node;
  }, []);
  return (
    <div className="p5Container" ref={setRef} />
  );
};

export default GameCanvas;