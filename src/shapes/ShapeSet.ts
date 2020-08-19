import { Shape } from './Shape';
import { CoordinatesTable } from '../types';

const POSITION_COUNT = 4;
export class ShapeSet {
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
      this.shapes[index].rotateShape();
    });
  }
}
