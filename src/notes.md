src
  /polygons
    index.js
    /polygon (component)
      /index
      /polygon.js
      /polygon.scss
    /polygonForm (component)
      /index
      /polygonForm.js
      /polygonForm.scss
    /polygonControls (component)
      /index
      /polygonControls.js
      /polygonControls.scss
    /polygonRedux
      /index
      /polygonActions
      /polygonReducer
      /polygonTypes
  /store
  /utils
  /map
  /sidebar

export function polyonReducer(state = INITIAL_STATE, action) {
  switch(action.type){
    case ACTIONS.ADD_POLYGON:
      return { ...state, polygons: [...state.polygons, action.payload] }
    case ACTIONS.DELETE_POLYGON:
      let polygons = clonedeep(state.polygons).filter(polygon => polygon.id !== action.payload);
      return { ...state, polygons }
    case ACTIONS.DELETE_POLYGON_VERTEX:
      let polygon = state.polygons.find(polygon => polygon.id == action.payload.id)
      // find the vertex id from that polygon and remove it
      // then add the new polygon back into the list of polygons
    case ACTIONS.ADD_POLYGON_VERTEX:
      // after a vertex is added, this action should be dispatched
      let polygon = state.polygons.find(polygon => polygon.id == action.payload.id)
      // find the vertex id from that polygon and remove it
      // then add the new polygon back into the list of polygons
    case ACTIONS.SAVE_POLYGON:
      //polygons should be saved on creation.
    case ACTIONS.SAVE_POLYGONS: (?)

    case ACTIONS.LOAD_POLYGONS:
      // load all microcommunities from DB, convert data into polygon objects
      return { ...state, polygons: [ ...action.payload ] }
    default:
      return state;
  }

}

INITIAL_STATE = {
  polygons: [ <Polygon>, <Polygon>... ]
}

polygon = {
  id: 1
  path: [<LatLng>, <LatLng>... ],
  name: string
  editable: false,
  draggable: false,
  active: bool (active in DB)
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35
}

LatLng = {
  latitude: float,
  longitude: float,
}

