import React, { Component } from 'react';
import './App.css';

import Board from './components/board.js'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Board  maxRows={50} maxItemsPerRow={40} />
      </div> 
    );
  }
}



export default App;
