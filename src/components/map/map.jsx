import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {connect} from 'react-redux';
import {
  ICON_URL,
  ICON_URL_ACTIVE,
  ICON_SIZE,
  TILE_LAYER,
  ATTRIBUTION
} from './../../consts/map.js';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
    this._icon = leaflet.icon({
      iconUrl: ICON_URL,
      iconSize: [ICON_SIZE, ICON_SIZE]
    });
    this._iconActive = leaflet.icon({
      iconUrl: ICON_URL_ACTIVE,
      iconSize: [ICON_SIZE, ICON_SIZE]
    });
  }

  render() {
    return <section ref={this._mapRef} className={`${this.props.mapClass} map`} id="map">
    </section>;
  }

  get currentCity() {
    return this.props.properties[0].city;
  }

  getMarkers() {
    const activeCardId = this.props.activeCard ? this.props.activeCard.id : NaN;
    const markers = Array.from(this.props.properties.map((el) => {
      const icon = (el.id === activeCardId ? this._iconActive : this._icon);
      return leaflet.marker([el.location.latitude, el.location.longitude], {icon});
    }));
    return markers;
  }

  componentDidMount() {
    this._chosenCity = this.currentCity;
    const {latitude, longitude, zoom} = this.currentCity.location;
    const cityPosition = [latitude, longitude];

    if (this._mapRef.current) {
      const map = leaflet.map(this._mapRef.current, {
        center: cityPosition,
        zoom,
        zoomControl: false,
        marker: true
      });
      this._map = map;
      map.setView(cityPosition, this._zoom);

      leaflet
      .tileLayer(TILE_LAYER, {
        attribution: ATTRIBUTION
      })
      .addTo(map);

      this.markersLayer = leaflet.layerGroup(this.getMarkers()).addTo(this._map);
    }
  }

  componentDidUpdate() {
    this.markersLayer.clearLayers();
    this.markersLayer = leaflet.layerGroup(this.getMarkers()).addTo(this._map);

    if (this._chosenCity !== this.currentCity) {
      this._chosenCity = this.currentCity;
      const {latitude, longitude, zoom} = this.currentCity.location;
      this._map.setView([latitude, longitude], zoom);
    }
  }
}

Map.propTypes = {
  mapClass: PropTypes.string.isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
      }),
    }).isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
  activeCard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }),
  }),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCard: state.activeCard,
});

const MapWrapped = connect(mapStateToProps)(Map);

export {Map};
export default MapWrapped;

