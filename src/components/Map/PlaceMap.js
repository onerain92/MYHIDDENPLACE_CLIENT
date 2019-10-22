import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

class PlaceMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  handleMarkerClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const lat = this.props.location.coordinates
      ? this.props.location.coordinates[1]
      : 37.566682;
    const lng = this.props.location.coordinates
      ? this.props.location.coordinates[0]
      : 126.978382;

    const GoogleMaps = withGoogleMap(props => (
      <GoogleMap defaultCenter={{ lat, lng }} defaultZoom={13}>
        <Marker
          position={{ lat: lat, lng: lng }}
          onClick={this.handleMarkerClick}
        >
          {this.state.isOpen && <InfoWindow onCloseClick={this.handleMarkerClick}>
            <div>{this.props.address}</div>
          </InfoWindow>}
        </Marker>
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMaps
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default PlaceMap;
