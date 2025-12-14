import { useCallback, useRef } from 'react';
import P5 from 'p5';

import { GameEngine } from '../utils/GameEngine';

let gameEngine: GameEngine;

const setup = (p5: P5, canvasParentRef: Element | null) => {
  if(canvasParentRef === null) {
    return;
  }

  p5.createCanvas(500, 500).parent(canvasParentRef);
  gameEngine.particleSystem.setP5Instance(p5);
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
  const x = Math.round(gameEngine.rocketX);
  const y = Math.round(gameEngine.rocketY);

  p5.background(0);
  p5.smooth();
  p5.noFill();

  drawMountain(p5);
  drawRocket(p5, x, y);

  gameEngine.particleSystem.display();
  gameEngine.update();
};

const GameCanvas = ({ engine }: { engine: GameEngine }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const setRef = useCallback( (node: HTMLDivElement) => {
    if(ref.current) {
      // Unmount
    }

    gameEngine = engine;

    if(node) {
      new P5( (p) => {
        p.setup = () => setup(p, node);
        p.draw = () => draw(p);
      });
    }

    ref.current = node;
  }, [engine]);

  return (
    <div className="p5Container" ref={setRef} />
  );
};

export default GameCanvas;