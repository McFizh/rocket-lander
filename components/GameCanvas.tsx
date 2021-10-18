import Sketch from 'react-p5';
import p5Types from 'p5';

const setup = (p5: p5Types, canvasParentRef: Element) => {
  p5.createCanvas(500,500, p5.WEBGL).parent(canvasParentRef);
};

const draw = (p5: p5Types) => {
  p5.background(0);

  // @ts-ignore:next-line
  p5.beginShape('tess');
  p5.vertex(20, 20);
  p5.vertex(40, 20);
  p5.vertex(40, 40);
  p5.endShape();
};

const GameCanvas = () => {
  return (
    <Sketch setup={setup} draw={draw}/>
  );
};

export default GameCanvas;