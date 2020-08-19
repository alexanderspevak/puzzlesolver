import { SetHeight, SetWidth, PlaceShapes, SwitchShape } from './boardSize';

export enum ActionTypes {
  setHeight,
  setWidth,
  placeShapes,
  switchSet
}

export type BoardAction = SetHeight | SetWidth | PlaceShapes | SwitchShape;
