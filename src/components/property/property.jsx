import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import PageHeader from './../page-header/page-header.jsx';
import {getPropertyById} from './../../utils.js';

class Property extends PureComponent {
  constructor(props) {
    super(props);

    this._property = getPropertyById(this.props.offers, this.props.id);
  }

  render() {
    return <div className="page">
      <PageHeader user={this.props.user}/>
      <main className="page__main page__main--property">
        <section className="property">
          {this.renderGallery()}
        </section>
      </main>
    </div>;
  }

  renderGallery() {
    return <div className="property__gallery-container container">
      <div className="property__gallery">
        {
          this._property.images.map((el, i) =>
            <div className="property__image-wrapper" key={i}>
              <img className="property__image" src={el} alt="Photo studio"></img>
            </div>
          )
        }
      </div>
    </div>;
  }
}

Property.propTypes = {
  user: PropTypes.object,
  id: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf.isRequired,
};

export default Property;
