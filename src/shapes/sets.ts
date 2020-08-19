import { Shape } from './Shape';
import { Position } from './Shape';
import { ShapeSet } from './ShapeSet';

const shape1 = new Shape('red', 'alfa');
shape1.addCell('alfa', Position.right, 'beta');
shape1.addCell('beta', Position.right, 'gama');

const shape2 = new Shape('green', 'alfa');
shape2.addCell('alfa', Position.top, 'beta');
shape2.addCell('beta', Position.right, 'gama');
shape2.addCell('beta', Position.left, 'teta');

const shape3 = new Shape('purple', 'alfa');
shape3.addCell('alfa', Position.right, 'beta');
shape3.addCell('beta', Position.right, 'gama');
shape3.addCell('gama', Position.right, 'delta');
shape3.addCell('delta', Position.right, 'omega');

const shape4 = new Shape('yellow', 'alfa');

const shape5 = new Shape('white', 'alfa');

shape5.addCell('alfa', Position.bottom, 'beta');
shape5.addCell('beta', Position.bottom, 'gama');
shape5.addCell('gama', Position.bottom, 'delta');
shape5.addCell('delta', Position.left, 'omega');

const shape7 = new Shape('blue', 'alfa');
shape7.addCell('alfa', Position.bottom, 'beta');
shape7.addCell('alfa', Position.top, 'gama');
shape7.addCell('alfa', Position.left, 'delta');
shape7.addCell('alfa', Position.right, 'teta');

export const shapeSet1 = new ShapeSet();

shapeSet1.addShape(shape1);
shapeSet1.addShape(shape2);
shapeSet1.addShape(shape3);
shapeSet1.addShape(shape4);
shapeSet1.addShape(shape5);
shapeSet1.addShape(shape7);

const shape6 = new Shape('blue', 'alfa');
shape6.addCell('alfa', Position.right, 'beta');
shape6.addCell('beta', Position.right, 'gama');
shape6.addCell('gama', Position.right, 'delta');
shape6.addCell('delta', Position.right, 'epsilon');
shape6.addCell('epsilon', Position.top, 'zeta');
shape6.addCell('delta', Position.top, 'teta');

export const shapeSet2 = new ShapeSet();
shapeSet2.addShape(shape6);
shapeSet2.addShape(shape1);
shapeSet2.addShape(shape2);
shapeSet2.addShape(shape3);
shapeSet2.addShape(shape4);
shapeSet2.addShape(shape5);
