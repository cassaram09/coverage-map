import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import loadGoogleMaps from './loadGoogleMaps'
import CoverageMap from './coverageMap'

class App extends Component {
  componentWillMount(){
    if ( !window.google ){
      loadGoogleMaps("AIzaSyCAyqBJmg-cr4Fu5uA6UxEV44T_c4QjzW8", ['drawing', 'visualization']).then(resp => {
        this.setState({ loaded: true })
      })
    }
  }

  render() {
    return (
      <div className="App">
        {window.google && <CoverageMap />}
      </div>
    );
  }
}

export default App;
