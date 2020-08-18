import { ActionTypes } from './types';

export interface SetHeight {
  type: ActionTypes.setHeight;
  payload: number;
}

export interface SetWidth {
  type: ActionTypes.setWidth;
  payload: number;
}

export interface PlaceShapes {
  type: ActionTypes.placeShapes;
}

export const setHeight = (height: number): SetHeight => ({
  type: ActionTypes.setHeight,
  payload: Math.max(4, height)
});

export const setWidth = (width: number): SetWidth => ({
  type: ActionTypes.setWidth,
  payload: Math.max(4, width)
});

export const placeShapes = (): PlaceShapes => ({
  type: ActionTypes.placeShapes
});
