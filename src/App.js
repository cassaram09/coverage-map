import React, { Component } from 'react';
import loadGoogleMaps from './loadGoogleMaps'
import Sidebar from './sidebar/sidebar';
import MapContainer from './map/map';

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
      <div className="app">
        <Sidebar/>
        {window.google && <MapContainer />}
      </div>
    );
  }
}

export default App;
