interface Cell {
  name: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

export enum Position {
  right = 'right',
  left = 'left',
  bottom = 'bottom',
  top = 'top'
}

export class Shape {
  public color: string;
  public container: Cell[];
  public firstCellName: string;

  constructor(color: string, firstCellName: string) {
    this.color = color;
    this.firstCellName = firstCellName;
    this.container = [
      {
        name: firstCellName
      }
    ];
  }

  public addCell(
    connectedCellName: string,
    atPosition: Position,
    newCellName: string
  ): void {
    if (
      atPosition !== Position.right &&
      atPosition !== Position.left &&
      atPosition !== Position.bottom &&
      atPosition !== Position.top
    ) {
      return;
    }

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

    connectedCell[atPosition] = newCellName;
    const newCell: Cell = {
      name: newCellName,
      [this.getReversePosition(atPosition)]: connectedCellName
    };

    this.container.push(newCell);
  }

  public getReversePosition(position: Position): Position {
    if (position === Position.bottom) {
      return Position.top;
    }
    if (position === Position.top) {
      return Position.bottom;
    }
    if (position === Position.right) {
      return Position.left;
    }

    return Position.right;
  }

  private rotateShapes() {
    this.container.forEach(shape => {
      let topPosition = shape.top;
      shape.top = shape.left;
      shape.left = shape.bottom;
      shape.bottom = shape.right;
      shape.right = topPosition;
    });
  }

  public traverseShape(): { height: number; width: number } | null {
    return null;
  }
}
