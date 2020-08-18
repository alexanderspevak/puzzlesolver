import { CoordinatesTable } from '../reducers/board';

interface ShapeCell {
  name: string;
  left?: ShapeCell | undefined;
  right?: ShapeCell | undefined;
  top?: ShapeCell | undefined;
  bottom?: ShapeCell | undefined;
  positionHeight?: number;
  positionWidth?: number;
}

export enum Position {
  right = 'right',
  left = 'left',
  bottom = 'bottom',
  top = 'top'
}

export class Shape {
  public color: string;
  public container: ShapeCell[];
  public firstCell: ShapeCell;
  public rotations = 0;

  constructor(color: string, firstCellName: string) {
    this.color = color;

    const firstCell = {
      name: firstCellName
    };

    this.firstCell = firstCell;
    this.container = [firstCell];
  }

  public addCell(
    connectedCellName: string,
    atPosition: Position,
    newCellName: string
  ): void {
    let connectedCell = this.container.find(
      cell => cell.name === connectedCellName
    );

    if (this.container.find(cell => cell.name === newCellName)) return;

    if (!connectedCell) {
      return;
    }

    if (connectedCell[atPosition]) {
      return;
    }
    const newCell: ShapeCell = {
      name: newCellName
    };

    connectedCell[atPosition] = newCell;

    this.container.push(newCell);
  }

  public rotateShape() {
    this.container.forEach((cell: ShapeCell) => {
      let topPosition = cell.top;
      cell.top = cell.left;
      cell.left = cell.bottom;
      cell.bottom = cell.right;
      cell.right = topPosition;
    });
    this.rotations++;
  }

  public getShapeCoordinates(
    tableCoordinates: CoordinatesTable
  ): CoordinatesTable | null {
    if (!this.setFirstCellCoordinates(tableCoordinates)) {
      return null;
    }

    this.setShapeCoordinates();
    this.container.forEach(({ positionHeight, positionWidth }: ShapeCell) => {
      tableCoordinates[positionHeight!][positionWidth!].taken = true;
      tableCoordinates[positionHeight!][positionWidth!].color = this.color;
    });

    return tableCoordinates;
  }

  private setFirstCellCoordinates(tableCoordinates: CoordinatesTable): boolean {
    const tableHeight = tableCoordinates.length;
    const tableWidth = tableCoordinates[0].length;

    for (let i = 0; i < tableHeight; i++) {
      for (let j = 0; j < tableWidth; j++) {
        if (this.findMatchingPosition(this.firstCell, tableCoordinates, i, j)) {
          this.setCellCoordinates(this.firstCell, i, j);
          return true;
        }
      }
    }

    return false;
  }

  private setShapeCoordinates(
    cell = this.firstCell!,
    positionHeight = this.firstCell.positionHeight,
    positionWidth = this.firstCell.positionWidth
  ): void {
    this.setCellCoordinates(cell, positionHeight!, positionWidth!);

    if (cell.top) {
      this.setShapeCoordinates(cell.top, positionHeight! + 1, positionWidth);
    }
    if (cell.right) {
      this.setShapeCoordinates(cell.right, positionHeight!, positionWidth! + 1);
    }
    if (cell.bottom) {
      this.setShapeCoordinates(cell.bottom, positionHeight! - 1, positionWidth);
    }

    if (cell.left) {
      this.setShapeCoordinates(cell.left, positionHeight!, positionWidth! - 1);
    }
  }

  private findMatchingPosition(
    cell: ShapeCell,
    tableCoordinates: CoordinatesTable,
    cellHeightPosition: number,
    cellWidthPosition: number
  ): boolean {
    if (
      !this.valuateCoordinate(
        tableCoordinates,
        cellHeightPosition,
        cellWidthPosition
      )
    ) {
      return false;
    }

    let valuatedTop = true;
    let valuatedBottom = true;
    let valuatedRight = true;
    let valuatedLeft = true;

    if (cell.top) {
      if (
        !this.valuateCoordinate(
          tableCoordinates,
          cellHeightPosition + 1,
          cellWidthPosition
        )
      ) {
        return false;
      }

      valuatedTop = this.findMatchingPosition(
        cell.top as ShapeCell,
        tableCoordinates,
        cellHeightPosition + 1,
        cellWidthPosition
      );
    }

    if (cell.right) {
      if (
        !this.valuateCoordinate(
          tableCoordinates,
          cellHeightPosition,
          cellWidthPosition + 1
        )
      ) {
        return false;
      }

      valuatedRight = this.findMatchingPosition(
        cell.right as ShapeCell,
        tableCoordinates,
        cellHeightPosition,
        cellWidthPosition + 1
      );
    }

    if (cell.bottom) {
      if (
        !this.valuateCoordinate(
          tableCoordinates,
          cellHeightPosition - 1,
          cellWidthPosition
        )
      ) {
        return false;
      }

      valuatedBottom = this.findMatchingPosition(
        cell.bottom as ShapeCell,
        tableCoordinates,
        cellHeightPosition - 1,
        cellWidthPosition
      );
    }

    if (cell.left) {
      if (
        !this.valuateCoordinate(
          tableCoordinates,
          cellHeightPosition,
          cellWidthPosition - 1
        )
      ) {
        return false;
      }

      valuatedLeft = this.findMatchingPosition(
        cell.left as ShapeCell,
        tableCoordinates,
        cellHeightPosition,
        cellWidthPosition - 1
      );
    }

    return valuatedTop && valuatedRight && valuatedBottom && valuatedLeft;
  }

  private valuateCoordinate(
    tableCoordinates: CoordinatesTable,
    cellHeightPosition: number,
    cellWidthPosition: number
  ): boolean {
    const row = tableCoordinates[cellHeightPosition];
    if (!row) return false;

    const square = row[cellWidthPosition];
    if (!square) return false;

    if (square.taken) return false;

    return true;
  }

  private setCellCoordinates(
    cell: ShapeCell,
    height: number,
    width: number
  ): void {
    cell.positionHeight = height;
    cell.positionWidth = width;
  }

  public resetPositions(): void {
    this.container.forEach((cell: ShapeCell): void => {
      cell.positionHeight = undefined;
      cell.positionWidth = undefined;
    });
  }
}
