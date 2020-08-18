import React from 'react';

interface CellProps {
  color: string;
}

export default ({ color }: CellProps) => {
  return <td style={{ backgroundColor: color }}></td>;
};
