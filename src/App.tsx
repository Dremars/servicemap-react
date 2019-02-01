import React, { Component } from 'react';
import './App.css';
import './Map/MapView'
import MapView from './Map/MapView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapView></MapView>
      </div>
    );
  }
}

export default App;
