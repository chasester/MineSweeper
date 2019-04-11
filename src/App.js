import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Board />
      </div>
    );
  }
}

var NumberColors = ["#","#000000","#AA0000","#00AA00","#AAAA00","#0000AA","#AA00AA","#00AAAA","#AAAAAA"] //could change this to be calculated as nuber back bit witched for each value where 1 is FF and 0 is DD so 0 would be DDDDDD 1 would be FFDDD 2 would be DDFFDD etc
var board = [];
class Square extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      active: true,
     //count is how many bombs are around me, this is not used till the button is clicked.
    }
    this.count = -1;
    this.flaged = 0;
  }
  checkAround()
  {
    var count = 0;
   
    for(let i =-1; i < 2; i++)
    {
      for(let j=-1; j < 2; j++)
      {
       
        if(this.props.row +i < 0 || this.props.row +i >= board.length || this.props.col+j < 0 || this.props.col+j >= board[this.props.row+i].length || (i===0 && j===0)) continue;
        count += board[this.props.row +i][this.props.col+j].props.value === "*";
      }
    }
    console.log(count);
    return count;
  }
  changeState()
  {
    this.setState({active: false})
    if(this.props.value === "*") return;
    this.count = this.checkAround();
  }
  changeFlag(){
    this.setState({active: true}) //here so that it triggers a rerenter on this object.
    this.flaged = (this.flaged+1)%3;
  }
  render()
  {
    var styleNumber = 
    {
      color: `${NumberColors[this.count]}`
    }
    var nostyle = {}
    return(
      //later change style to be different colors based on reviled
    <div className={`square square${this.props.row}-${this.props.col} ${this.state.active ? '' : "square-show"}`} onClick={(e) => {if(this.state.active) if(!e.shiftKey)this.changeState(); else this.changeFlag();}} style={this.count > 0 ? styleNumber : nostyle}> 
     {this.state.active ? this.flaged > 0 ? this.flaged===1 ? <i class="fas fa-flag fa-xs"></i> : <i class="fas fa-question fa-sm"></i> : "" : this.count > 0 ? this.count : this.props.value === "*" ? <i className="fas fa-bomb"></i> : ""}
    </div>
    );
  }
}

var maxItemsPerRow = 40;
var maxRows = 50;
class Board extends React.Component
{
  render() {
    const status = 'Next player: X';

    this.createboard = () => 
    {
      var divboard = []; 
      for (let i = 0; i < maxRows; i++)
      {
        let children = [];
        let valuechild = [];
        for (let j = 0; j < maxItemsPerRow; j++)
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
        <div className="status">{status}</div>
        {this.createboard()}
      </div>
    );
  }
  renderSquare(v,r,c) {
    return <Square value={v} row={r} col={c}/>;
  }
}

export default App;
