import React, {createRef} from 'react'
const { Map, Marker, Popup, TileLayer } = require('react-leaflet')
require("proj4leaflet")
var L = require("leaflet-mml-layers")
import TransitStopTimes from'./TransitStopTimes'
import './MapView.css'
import { BusIcon, TramIcon } from './icons'

interface MapComponentState {
  position : [number, number]
  // query: any;
  stops: any
}

class MapView extends React.Component<{}, MapComponentState> {
  private mapRef = createRef() 
  constructor(props: any) {
    super(props)
    // this.mapRef = React.createRef()
    this.state = {
      position: [60.171631597530016, 24.906860323934886],
      stops: []
      // query: "{stopsByRadius(lat:60.199, lon:24.938, radius:500) {edges {node {stop {gtfsId name}distance}}}}",
    }
  }

  onZoomEvent (map: any) {
    // const query = this.state
    if (map.current.leafletElement._zoom >= 14) {
      this.fetchStops(map)
    } else {
      this.setState({stops: []})
    }
  }

  async fetchStops (map: any) {
    const bounds = map.current.leafletElement.getBounds()
    fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
      method: 'post',
      headers: { "Content-Type": "application/graphql" },
      body: 
        `{ 
          stopsByBbox(minLat: ${bounds._southWest.lat - 0.002070372076}, minLon: ${bounds._southWest.lng - 0.002070372076}, maxLat: ${bounds._northEast.lat + 0.002070372076}, maxLon: ${bounds._northEast.lng + 0.002070372076} ) {
            id
            name
            lat
            lon
            patterns {
              route {
                mode
              }
            }
          } 
          }`
    }).then(response => response.json())
      .then(data => this.setState({ stops: data.data.stopsByBbox}))
      // .then(data => {return data.data.stopsByBbox})
  }

  render() {
    const { position, stops } = this.state
    let icon: any
    return(
      <Map
        id="mapid"
        center={position} 
        zoom={10}
        crs={L.TileLayer.MML.get3067Proj()}
        minZoom={6}
        maxZoom={15}
        maxBounds={[
          [60.73428157014129, 26,60179232355852],
          [59.59191469116564, 23.40571236451516]
        ]}
        ref={this.mapRef}
        onMoveEnd={()=> this.onZoomEvent(this.mapRef)}
        onClick={(e: any)=> console.log(e)}
      >
        <TileLayer
          url="https://geoserver.hel.fi/mapproxy/wmts/osm-sm-hq/etrs_tm35fin_hq/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {stops.map((stop: any) => 
          <Marker 
            key={stop.id} 
            position={[stop.lat, stop.lon]}
            icon={stop.patterns[0].route.mode == 'BUS' ? BusIcon : TramIcon }
          >
             <Popup>
               <TransitStopTimes stop={stop}/>
             </Popup>
        </Marker>)}

      </Map> 
    )
  }
}

export default MapView