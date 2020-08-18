import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../reducers';

import Cell from './Cell';

interface Props {
  coordinates: StoreState['boardReducer']['coordinates'];
}

class Board extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.state = { coordinates: [] };
  }

  fillRows = (rowIndex: number) => {
    const cells = [];
    const row = this.props.coordinates[rowIndex];
    if (!row) return;
    for (let i = 0; i < row.length; i++) {
      cells.push(
        <Cell
          color={this.props.coordinates[rowIndex][i].color}
          key={`${rowIndex}-${i}`}
        ></Cell>
      );
    }
    return cells;
  };

  createTable = () => {
    const rows = [];
    for (let i = 0; i < this.props.coordinates.length; i++) {
      rows.push(<tr key={i}>{this.fillRows(i)}</tr>);
    }
    return rows;
  };

  render() {
    return (
      <table>
        <tbody>{this.createTable()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ boardReducer }: StoreState) => {
  return { coordinates: boardReducer.coordinates };
};

export default connect(mapStateToProps)(Board);
