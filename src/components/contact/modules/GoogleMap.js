import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Style from './css/GoogleMapStyles.module.css';

const mapStyles = {
    width: '1000px',
    height: '600px'
  };
  
  const mainStyle = {
    position: 'relative',
    overflow: 'hidden',
    height: '600px',
    width: '1000px',
    margin: '10px auto 0px'
  } //"position:relative;overflow:hidden;height:600px;width:1000px;margin:10px auto 0px;"

export class GoogleMap extends React.Component {
    state = {
        showingInfoWindow: false,  
        activeMarker: {},         
        selectedPlace: {}          
      };

      onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


    render() {
      return (
          <div className={Style.main}>
              <div>
                  <p>Zobacz gdzie znajduje się siedziba firmy</p>
              </div>
        <div id="google-map" style={mainStyle}>
            <Map
                  google={this.props.google}
                  zoom={16}
                  style={mapStyles}
                  initialCenter={{
                      lat: 49.756832,
                      lng: 20.414998
                  }}
              >
              <Marker
          onClick={this.onMarkerClick}
          name={'Firma stolarska "Eschenholz"'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
            <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow></Map>
        </div>
        </div>
      );
    }
  }
  
  
export default GoogleApiWrapper({ apiKey: 'AIzaSyC5JhuN4hAknPU3RX-DMQ6dmfkZXyUcY00'})(GoogleMap);
