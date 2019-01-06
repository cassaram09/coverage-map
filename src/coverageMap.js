import React, { Component } from 'react';

class CoverageMap extends Component {

  initialize(){
    var myLatLng = new window.google.maps.LatLng(33.5190755, -111.9253654);
    // General Options
    var mapOptions = {
      zoom: 12,
      center: myLatLng,
      mapTypeId: window.google.maps.MapTypeId.RoadMap
    };

    var map = new window.google.maps.Map(document.getElementById('map-canvas'),mapOptions);
    // Polygon Coordinates
    var triangleCoords = [
      new window.google.maps.LatLng(33.5362475, -111.9267386),
      new window.google.maps.LatLng(33.5104882, -111.9627875),
      new window.google.maps.LatLng(33.5004686, -111.9027061)
    ];
    // Styling & Controls
    this.myPolygon = new window.google.maps.Polygon({
      paths: triangleCoords,
      draggable: true, // turn off if it gets annoying
      editable: true,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });

    this.myPolygon.setMap(map);
    //window.google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
    window.google.maps.event.addListener(this.myPolygon.getPath(), "insert_at",this.getPolygonCoords.bind(this));
    //window.google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
    window.google.maps.event.addListener(this.myPolygon.getPath(), "set_at", this.getPolygonCoords.bind(this));

    window.google.maps.event.addListener(this.myPolygon, 'rightclick', e => {
      console.log(e)
      // Check if click was on a vertex control point
      if (e.vertex == undefined) {
        return;
      }

      function DeleteMenu() {
        this.div_ = document.createElement('div');
        this.div_.className = 'delete-menu';
        this.div_.innerHTML = 'Delete';

        var menu = this;
        window.google.maps.event.addDomListener(this.div_, 'click', function() {
          menu.removeVertex();
        });
      }
      DeleteMenu.prototype = new window.google.maps.OverlayView();

      DeleteMenu.prototype.onAdd = function() {
        var deleteMenu = this;
        var map = this.getMap();
        this.getPanes().floatPane.appendChild(this.div_);

        // mousedown anywhere on the map except on the menu div will close the
        // menu.
        this.divListener_ = window.google.maps.event.addDomListener(map.getDiv(), 'mousedown', function(e) {
          if (e.target != deleteMenu.div_) {
            deleteMenu.close();
          }
        }, true);
      };

      DeleteMenu.prototype.onRemove = function() {
        window.google.maps.event.removeListener(this.divListener_);
        this.div_.parentNode.removeChild(this.div_);

        // clean up
        this.set('position');
        this.set('path');
        this.set('vertex');
      };

      DeleteMenu.prototype.close = function() {
        this.setMap(null);
      };

      DeleteMenu.prototype.draw = function() {
        var position = this.get('position');
        var projection = this.getProjection();

        if (!position || !projection) {
          return;
        }

        var point = projection.fromLatLngToDivPixel(position);
        this.div_.style.top = point.y + 'px';
        this.div_.style.left = point.x + 'px';
      };

      /**
       * Opens the menu at a vertex of a given path.
       */
      DeleteMenu.prototype.open = function(map, path, vertex) {
        this.set('position', path.getAt(vertex));
        this.set('path', path);
        this.set('vertex', vertex);
        this.setMap(map);
        this.draw();
      };

      /**
       * Deletes the vertex from the path.
       */
      DeleteMenu.prototype.removeVertex = function() {
        var path = this.get('path');
        var vertex = this.get('vertex');

        if (!path || vertex == undefined) {
          this.close();
          return;
        }

        path.removeAt(vertex);
        this.close();
      };



      var deleteMenu = new DeleteMenu();

      deleteMenu.open(map, this.myPolygon.getPath(), e.vertex);
    });
  }

  getPolygonCoords() {
  var len = this.myPolygon.getPath().getLength();
  var htmlStr = "";
  for (var i = 0; i < len; i++) {
    htmlStr += "new google.maps.LatLng(" + this.myPolygon.getPath().getAt(i).toUrlValue(5) + "), ";
    //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
    //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
  }
  document.getElementById('info').innerHTML = htmlStr;
}

  componentDidMount(){
    this.initialize();
  }

  render() {
    return (
      <div className="coverage-map">
        <div id="map-canvas"></div>
        <div id="info"></div>
      </div>
    );
  }
}

export default CoverageMap;


