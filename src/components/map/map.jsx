import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {connect} from 'react-redux';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
  }

  render() {
    console.log(`componentRender`);
    return <section ref={this._mapRef} className="cities__map map" id="map">
    </section>;
  }

  componentDidMount() {
    console.log(`componentDidMount`);
    const city = [52.38333, 4.9];
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;
    if (this._mapRef.current) {
      const map = leaflet.map(this._mapRef.current, {
        center: city,
        zoom,
        zoomControl: false,
        marker: true
      });
      this._map = map;
      map.setView(city, zoom);

      leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);
/*
      this.props.properties.forEach((el) => {
        leaflet
        .marker([el.coor.latitude, el.coor.longitude], {icon})
        .addTo(map);
      });*/

      let a = Array.from(this.props.properties.map((el) => {
        return leaflet.marker([el.coor.latitude, el.coor.longitude], this.icon);
      }));
      this.markersLayer = leaflet.layerGroup(a).addTo(this._map);
    }
  }

  componentDidUpdate() {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    this.markersLayer.clearLayers();
    let a = Array.from(this.props.properties.map((el) => {
      return leaflet.marker([el.coor.latitude, el.coor.longitude], icon);
    }));
    this.markersLayer = leaflet.layerGroup(a).addTo(this._map);
/*
    this.props.properties.forEach((el) => {
      leaflet
      .marker([el.coor.latitude, el.coor.longitude], {icon})
      .addTo(this._map);
    });*/
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
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  properties: state.properties,
});

const MapWrapped = connect(mapStateToProps)(Map);

export default MapWrapped;
