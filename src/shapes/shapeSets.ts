import { Shape } from './Shape';
import { Position } from './Shape';

const shape1 = new Shape('blue', 'alfa');
shape1.addCell('alfa', Position.right, 'beta');
shape1.addCell('alfa', Position.right, 'gama');

const shape2 = new Shape('red', 'alfa');
shape1.addCell('alfa', Position.right, 'beta');
shape1.addCell('alfa', Position.right, 'gama');

export const shapeSet1 = [shape1, shape2];
