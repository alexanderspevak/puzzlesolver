import { Shape } from './Shape';
import { Position } from './Shape';

export const shape1 = new Shape('red', 'alfa');
shape1.addCell('alfa', Position.right, 'beta');
shape1.addCell('beta', Position.right, 'gama');

const shape2 = new Shape('red', 'alfa');
shape2.addCell('alfa', Position.right, 'beta');
shape2.addCell('beta', Position.right, 'gama');

export const shapeSet1 = [shape1, shape2];
