import React from 'react';
import Board from './Board';
import { connect } from 'react-redux';

import { setHeight, setWidth, placeShapes } from '../actions';

interface Props {
  setHeight: Function;
  setWidth: Function;
  placeShapes: Function;
}
const App = ({ setHeight, setWidth, placeShapes }: Props) => {
  return (
    <div>
      <label>height:</label>
      <input onChange={event => setHeight(event.target.value)} />
      <label>width:</label>
      <input onChange={event => setWidth(event.target.value)} />
      <button onClick={() => placeShapes()}>place shape</button>

      <Board />
    </div>
  );
};

export default connect(null, { setHeight, setWidth, placeShapes })(App);
