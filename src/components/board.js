import React from 'react';
import Square from './square.js'
import board from './game.js'

class Board extends React.Component
{
  render() {
    this.createboard = () => 
    {
      var divboard = []; 
      for (let i = 0; i < this.props.maxRows; i++)
      {
        let children = [];
        let valuechild = [];
        for (let j = 0; j < this.props.maxItemsPerRow; j++)
        {
          let flag = Math.random() >0.2;
          children.push( this.renderSquare(`${flag? "":"*"}`,i,j) ); valuechild.push(flag);
        }
        board.push(children);
        divboard.push(<div className={`row row${i}`} id={`row${i}`}>{children}</div>)
      }
      return divboard;
    }

    return (
      <div className="board">
        {this.createboard()}
      </div>
    );
  }
  renderSquare(v,r,c) {
    return <Square value={v} row={r} col={c}/>;
  }
}

export default Board;