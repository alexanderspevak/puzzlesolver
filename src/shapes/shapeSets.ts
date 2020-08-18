import { Shape } from './Shape';
import { Position } from './Shape';
import { CoordinatesTable } from '../reducers/board';

export const shape1 = new Shape('red', 'alfa');
shape1.addCell('alfa', Position.right, 'beta');
shape1.addCell('beta', Position.right, 'gama');

const shape2 = new Shape('green', 'alfa');
shape2.addCell('alfa', Position.top, 'beta');
shape2.addCell('beta', Position.right, 'gama');

class ShapeSet {
  shapes: Shape[] = [];
  public addShape(shape: Shape) {
    this.shapes.push(shape);
  }

  public getMatchingCoordinatesTable(
    coordinatesTable: CoordinatesTable
  ): CoordinatesTable | null {
    const solvedTable = this.placeShapes(coordinatesTable);
    if (solvedTable) {
      console.log('what is returned', solvedTable);
      return solvedTable;
    }

    const shapeToBeRotated = this.getShapeToBeRotated();
    if (shapeToBeRotated.rotations === 4) {
      return null;
    }

    shapeToBeRotated.rotateShape();

    return this.getMatchingCoordinatesTable(coordinatesTable);
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

  private getShapeToBeRotated(): Shape {
    const rotationValues = this.shapes.map(shape => shape.rotations);
    const minRotation = Math.min(...rotationValues);

    return this.shapes.find(shape => shape.rotations === minRotation)!;
  }
}

export const shapeSet = new ShapeSet();

shapeSet.addShape(shape1);
shapeSet.addShape(shape2);
