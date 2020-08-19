import { combineReducers } from 'redux';
import { boardReducer, BoardState } from './board';

export interface StoreState {
  boardReducer: BoardState;
}

export const reducers = combineReducers<StoreState>({
  boardReducer
});
