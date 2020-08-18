import { combineReducers } from 'redux';
import { boardReducer, BoardCoordinates } from './board';

export interface StoreState {
  boardReducer: BoardCoordinates;
}

export const reducers = combineReducers<StoreState>({
  boardReducer
});
