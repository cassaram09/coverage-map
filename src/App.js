import React, { Component } from 'react';
import { Provider } from 'react-redux';

import loadGoogleMaps from './loadGoogleMaps'
import Sidebar from './sidebar/sidebar';
import MapContainer from './map/map';

import store from './store'

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
      <Provider store={store}>
        <div className="app">
          <Sidebar/>
          {window.google && <MapContainer />}
        </div>
      </Provider>
    );
  }
}

export default App;
