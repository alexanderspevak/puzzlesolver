import { Shape } from './Shape';
import { Position } from './Shape';
import { CoordinatesTable } from '../reducers/board';

export const shape1 = new Shape('red', 'alfa');
shape1.addCell('alfa', Position.right, 'beta');
shape1.addCell('beta', Position.right, 'gama');

const shape2 = new Shape('green', 'alfa');
shape2.addCell('alfa', Position.top, 'beta');
shape2.addCell('beta', Position.right, 'gama');

const shape3 = new Shape('purple', 'alfa');
shape3.addCell('alfa', Position.right, 'beta');
shape3.addCell('beta', Position.right, 'gama');
shape3.addCell('gama', Position.right, 'delta');
shape3.addCell('delta', Position.right, 'omega');

const shape4 = new Shape('yellow', 'alfa');

const POSITION_COUNT = 4;
class ShapeSet {
  shapes: Shape[] = [];
  public addShape(shape: Shape) {
    this.shapes.push(shape);
  }

  public getSolvedCoordinatesTable(
    coordinatesTable: CoordinatesTable
  ): CoordinatesTable | null {
    const maxRotations = POSITION_COUNT ** this.shapes.length;

    for (let i = 1; i <= maxRotations; i++) {
      const solvedTable = this.placeShapes(coordinatesTable);

      if (solvedTable) {
        console.log('returned solved table', solvedTable);
        return solvedTable;
      }

      this.rotateShapes(i);
    }

    return null;
  }

  private placeShapes(
    coordinatesTable: CoordinatesTable
  ): null | CoordinatesTable {
    let temporaryCoordinatesTable: CoordinatesTable | null = this.getCopyOfCoordinatesTable(
      coordinatesTable
    );

    this.shapes.forEach(shape => {
      if (temporaryCoordinatesTable) {
        temporaryCoordinatesTable = shape.getShapeCoordinates(
          temporaryCoordinatesTable
        );
      } else {
        return null;
      }
    });

    return temporaryCoordinatesTable;
  }

  private getCopyOfCoordinatesTable(
    coordinatesTable: CoordinatesTable
  ): CoordinatesTable {
    return coordinatesTable.map(row =>
      row.map(cell => {
        return { ...cell };
      })
    ) as CoordinatesTable;
  }

  private rotateShapes(rotateCounter: number): void {
    const thresholds = this.shapes.map(
      (shape, index) => POSITION_COUNT ** index
    );

    const rotateThresholds = thresholds.filter(
      threshold => rotateCounter % threshold === 0
    );

    rotateThresholds.forEach((threshold, index) => {
      console.log('rotateShape', index);
      this.shapes[index].rotateShape();
    });
  }
}

export const shapeSet = new ShapeSet();

shapeSet.addShape(shape1);
shapeSet.addShape(shape2);
shapeSet.addShape(shape3);
shapeSet.addShape(shape4);
