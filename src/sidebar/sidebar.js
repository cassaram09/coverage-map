import React, { Component } from 'react';

import PolygonForm from '../polygonForm/polygonForm';

class Sidebar extends Component {


  // will render a list of block fors each polygon
  renderPolygonControls = () => {

  }

  render() {
    return (
      <div className="sidebar">
        <PolygonForm />
      </div>
    );
  }
}

export default Sidebar;
