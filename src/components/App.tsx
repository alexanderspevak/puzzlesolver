import React from 'react';
import Board from './Board';
import { connect } from 'react-redux';

import { setHeight, setWidth } from '../actions';

interface Props {
  setHeight: Function;
  setWidth: Function;
}
const App = ({ setHeight, setWidth }: Props) => {
  return (
    <div>
      <label>height:</label>
      <input onChange={event => setHeight(event.target.value)} />
      <label>width:</label>
      <input onChange={event => setWidth(event.target.value)} />
      <Board />
    </div>
  );
};

export default connect(null, { setHeight, setWidth })(App);
