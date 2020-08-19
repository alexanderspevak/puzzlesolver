import { ShapeSet } from '../ShapeSet';
import { createShape } from './Shape.test';

const createSet = (): ShapeSet => {
  const shapeSet = new ShapeSet();
  const shape1 = createShape();
  const shape2 = createShape();
  shapeSet.addShape(shape1);
  shapeSet.addShape(shape2);

  return shapeSet;
};

describe('tests shapeSet', () => {
  it('returns null when can not place shapes', () => {
    const shapeSet = createSet();

    const coordinatesTable = shapeSet.getSolvedCoordinatesTable([
      [
        { color: 'white', taken: false },
        { color: 'white', taken: false },
        { color: 'white', taken: false }
      ],
      [
        { color: 'white', taken: false },
        { color: 'white', taken: false },
        { color: 'white', taken: true }
      ]
    ]);

    expect(coordinatesTable).toEqual(null);
  });

  it('returns coordinates when shapes can be placed', () => {
    const shapeSet = createSet();

    const coordinatesTable = shapeSet.getSolvedCoordinatesTable([
      [
        { color: 'white', taken: false },
        { color: 'white', taken: false },
        { color: 'white', taken: false }
      ],
      [
        { color: 'white', taken: false },
        { color: 'white', taken: false },
        { color: 'white', taken: false }
      ]
    ]);

    coordinatesTable!.forEach(row => {
      row.forEach(cell => {
        expect(cell).toEqual({ taken: true, color: 'red' });
      });
    });
  });

  it('returns coordinates when shapes can be placed with rotation', () => {
    const shapeSet = createSet();

    const coordinatesTable = shapeSet.getSolvedCoordinatesTable([
      [{ color: 'white', taken: false }],
      [{ color: 'white', taken: false }],
      [{ color: 'white', taken: false }],

      [{ color: 'white', taken: false }],
      [{ color: 'white', taken: false }],
      [{ color: 'white', taken: false }]
    ]);

    coordinatesTable!.forEach(row => {
      row.forEach(cell => {
        expect(cell).toEqual({ taken: true, color: 'red' });
      });
    });
  });
});
