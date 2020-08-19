import { Shape } from '../Shape';
import { Position } from '../Shape';

export const createShape = (): Shape => {
  const shape = new Shape('red', 'alfa');
  shape.addCell('alfa', Position.right, 'beta');
  shape.addCell('beta', Position.right, 'gama');
  return shape;
};

describe('test shape', () => {
  it('add celll to shape', () => {
    const shape = createShape();
    expect(shape.container.length).toEqual(3);
  });

  it('rotates shape', () => {
    const shape = createShape();
    shape.rotateShape();
    const alfaCell = shape.container.find(cell => cell.name === 'alfa');
    const betaCell = shape.container.find(cell => cell.name === 'beta');

    expect(alfaCell!.bottom).toBeTruthy();
    expect(betaCell!.bottom).toBeTruthy();
  });

  it('returns null when can not place shape on coordinates', () => {
    const shape = createShape();
    const coordinates = shape.getShapeCoordinates([
      [
        { color: 'white', taken: true },
        { color: 'white', taken: false },
        { color: 'white', taken: false }
      ]
    ]);
    expect(coordinates).toBe(null);
  });

  it('returns coordinates when places shape on coordinates', () => {
    const shape = createShape();
    const coordinates = shape.getShapeCoordinates([
      [
        { color: 'white', taken: false },
        { color: 'white', taken: false },
        { color: 'white', taken: false }
      ]
    ]);

    coordinates![0].forEach(cell => {
      expect(cell.taken).toEqual(true);
    });
  });
});
