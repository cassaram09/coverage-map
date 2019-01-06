import React, { Component } from 'react';

class MapContainer extends Component {

  initialize = () => {
    const center = new window.google.maps.LatLng(33.5190755, -111.9253654);

    const mapOptions = {
      zoom: 12,
      center: center,
      mapTypeId: window.google.maps.MapTypeId.RoadMap
    };

    const map = new window.google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  }

  componentDidMount(){
    this.initialize();
  }

  render() {
    return (
      <div className="map-container">
        <div id="map-canvas"></div>
      </div>
    );
  }
}

export default MapContainer;
