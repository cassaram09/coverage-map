import React, { Component } from 'react';

class Polygon extends Component {

  addPolygon = () => {
    alert('adding')
  }

  render() {
    return (
      <div className="polygon-form">
        <button onClick={this.addPolygon}>Add Polygon</button>
      </div>
    );
  }
}

export default Polygon;
