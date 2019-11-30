import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {connect} from 'react-redux';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
    this._zoom = 12;
    this._icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });
    this._iconActive = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 30]
    });
  }

  render() {
    return <section ref={this._mapRef} className="cities__map map" id="map">
    </section>;
  }

  getMarkers() {
    const activeCardId = this.props.activeCard ? this.props.activeCard.id : NaN;
    const markers = Array.from(this.props.properties.map((el) => {
      const icon = (el.id === activeCardId ? this._iconActive : this._icon);
      return leaflet.marker([el.coor.latitude, el.coor.longitude], {icon});
    }));
    return markers;
  }

  componentDidMount() {
    const city = [52.38333, 4.9];

    if (this._mapRef.current) {
      const map = leaflet.map(this._mapRef.current, {
        center: city,
        zoom: this._zoom,
        zoomControl: false,
        marker: true
      });
      this._map = map;
      map.setView(city, this._zoom);

      leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

      this.markersLayer = leaflet.layerGroup(this.getMarkers()).addTo(this._map);
    }
  }

  componentDidUpdate() {
    this.markersLayer.clearLayers();
    this.markersLayer = leaflet.layerGroup(this.getMarkers()).addTo(this._map);
    if (this.props.activeCard) {
      const activeCoors = [this.props.activeCard.coor.latitude, this.props.activeCard.coor.longitude];
      this._map.setView(activeCoors, this._zoom);
    }
  }
}

Map.propTypes = {
  properties: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    priceCurrency: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    coor: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
  activeCard: PropTypes.shape({
    id: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    priceCurrency: PropTypes.string.isRequired,
    priceValue: PropTypes.number.isRequired,
    priceText: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    coor: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  }),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  properties: state.properties,
  activeCard: state.activeCard,
});

const MapWrapped = connect(mapStateToProps)(Map);

export {Map};
export default MapWrapped;

