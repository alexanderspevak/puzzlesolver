import React from 'react';
import Board from './Board';
import { connect } from 'react-redux';

import { setHeight, setWidth, placeShapes, switchSet } from '../actions';
import { StoreState } from '../reducers';

interface Props {
  setHeight: Function;
  setWidth: Function;
  placeShapes: Function;
  switchSet: Function;
  message: string;
}
const App = ({
  setHeight,
  setWidth,
  placeShapes,
  message,
  switchSet
}: Props) => {
  return (
    <div>
      <h3>{message}</h3>
      <label>height:</label>
      <input onChange={event => setHeight(event.target.value)} />
      <label>width:</label>
      <input onChange={event => setWidth(event.target.value)} />
      <button onClick={() => placeShapes()}>place shape</button>
      <button onClick={() => switchSet()}>switch shapes</button>

      <Board />
    </div>
  );
};

const mapstateToProps = (state: StoreState) => {
  return { message: state.boardReducer.message };
};

export default connect(mapstateToProps, {
  setHeight,
  setWidth,
  placeShapes,
  switchSet
})(App);
