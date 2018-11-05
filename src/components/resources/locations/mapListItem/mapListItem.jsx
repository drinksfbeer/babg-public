import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './../../../common/components/icon/icon';


const MapListItem = ({
  location,
}) => {
  if (!location) {
    return null;
  }
  return (
    <Link
      to={`/map/${location.name.toLowerCase().split(' ').join('-')}`}
      className="locations-list-item"
      style={{
        width: '100%',
      }}
    >
      <div className="content">
        <div className="icon">
          <Icon icon="map-marker-alt" />
        </div>
        <h5 className="location-name">{location.name}</h5>
        <div className="location-address">
          <div className="street-address">
            {`${location.street} `}
          </div>
          <div className="city-state">
            {`${location.city}, ${location.state} ${location.zip}`}
          </div>
        </div>
      </div>
    </Link>
  );
};

MapListItem.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

MapListItem.defaultProps = {
};

export default MapListItem;
