import { BoardAction, ActionTypes } from '../actions';
import { shapeSet } from '../shapes';

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

export type CoordinatesTable = BoardCoordinates['coordinates'];

const createTable = (height: number, width: number): CoordinatesTable => {
  if (isNaN(height) || isNaN(width)) {
    return createTable(4, 4);
  }

  const coordinates: CoordinatesTable = [];

  const row = new Array(width);
  row.fill({ color: 'gray', taken: false });

  for (let i = 0; i < height; i++) {
    coordinates.push(row);
  }

  return coordinates;
};

const placeShapes = (
  currentCoordinates: CoordinatesTable
): CoordinatesTable => {
  const temporaryCoordinates: CoordinatesTable = currentCoordinates.map(row =>
    row.map(cell => {
      return { ...cell };
    })
  );

  const newCoordinates = shapeSet.getMatchingCoordinatesTable(
    temporaryCoordinates
  );

  if (newCoordinates) {
    return newCoordinates;
  }

  return temporaryCoordinates;
};

export const boardReducer = (
  state: BoardCoordinates = { coordinates: createTable(4, 4), message: '' },
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
        coordinates: placeShapes(state.coordinates)
      };

    default:
      return state;
  }
};
