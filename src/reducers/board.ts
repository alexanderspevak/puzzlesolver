import { BoardAction, ActionTypes } from '../actions';
import { shapeSet1, shapeSet2, ShapeSet } from '../shapes';
import { CoordinatesTable } from '../types';

export interface BoardState {
  coordinates: CoordinatesTable;
  message: string;
  shapeSet: number;
}

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
  currentCoordinates: CoordinatesTable,
  shapeSet: ShapeSet
): CoordinatesTable | null => {
  const temporaryCoordinates: CoordinatesTable = createTable(
    currentCoordinates.length,
    currentCoordinates[0].length
  );

  const newCoordinates = shapeSet.getSolvedCoordinatesTable(
    temporaryCoordinates
  );

  if (newCoordinates) {
    return newCoordinates;
  }

  return null;
};

const shapeSets: [ShapeSet, ShapeSet] = [shapeSet1, shapeSet2];

export const boardReducer = (
  state: BoardState = {
    coordinates: createTable(5, 5),
    message: '',
    shapeSet: 0
  },
  action: BoardAction
): BoardState => {
  switch (action.type) {
    case ActionTypes.setHeight:
      return {
        ...state,
        message: '',
        coordinates: createTable(
          action.payload,
          state.coordinates[0] ? state.coordinates[0].length : 4
        )
      };

    case ActionTypes.setWidth:
      return {
        ...state,
        message: '',
        coordinates: createTable(state.coordinates.length || 4, action.payload)
      };

    case ActionTypes.placeShapes:
      const newCoordinates = placeShapes(
        state.coordinates,
        shapeSets[state.shapeSet]
      );
      if (newCoordinates) {
        return {
          ...state,
          message: '',
          coordinates: newCoordinates
        };
      }
      return { ...state, message: 'Solution not found, try bigger table' };

    case ActionTypes.switchSet:
      return { ...state, shapeSet: 1 - state.shapeSet };
    default:
      return state;
  }
};
