import { BoardAction, ActionTypes } from '../actions';
import { shapeSet1, Shape, shape1 } from '../shapes';

export interface Coordinates {
  coordinates: Cell[][];
}

interface Cell {
  color: string;
  taken: boolean;
}

export interface BoardCoordinates {
  coordinates: Cell[][];
}

const createTable = (
  height: number,
  width: number
): BoardCoordinates['coordinates'] => {
  if (isNaN(height) || isNaN(width)) {
    return createTable(4, 4);
  }

  const coordinates: BoardCoordinates['coordinates'] = [];

  const row = new Array(width);
  row.fill({ color: 'blue', taken: false });

  for (let i = 0; i < height; i++) {
    coordinates.push(row);
  }

  return coordinates;
};

const placeShapes = (
  currentCoordinates: BoardCoordinates['coordinates'],
  shapeSets: Shape[]
): BoardCoordinates['coordinates'] => {
  const temporaryCoordinates: BoardCoordinates['coordinates'] = currentCoordinates.map(
    row => row.map(cell => cell)
  );

  const newCoordinates = shape1.getShapeCoordinates(temporaryCoordinates);
  if (newCoordinates) {
    return newCoordinates;
  }

  return temporaryCoordinates;
};

export const boardReducer = (
  state: BoardCoordinates = { coordinates: createTable(4, 4) },
  action: BoardAction
): BoardCoordinates => {
  switch (action.type) {
    case ActionTypes.setHeight:
      return {
        coordinates: createTable(
          action.payload,
          state.coordinates[0] ? state.coordinates[0].length : 4
        )
      };

    case ActionTypes.setWidth:
      return {
        coordinates: createTable(state.coordinates.length || 4, action.payload)
      };

    case ActionTypes.placeShapes:
      return {
        coordinates: placeShapes(state.coordinates, shapeSet1)
      };

    default:
      return state;
  }
};
