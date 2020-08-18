import { SetHeight, SetWidth, PlaceShapes } from './boardSize';

export enum ActionTypes {
  setHeight,
  setWidth,
  placeShapes
}

export type BoardAction = SetHeight | SetWidth | PlaceShapes;
