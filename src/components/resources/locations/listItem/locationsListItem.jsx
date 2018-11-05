import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './../../../common/components/icon/icon';


const LocationsListItem = ({
  location,
  member,
}) => {
  const BannerImage = location.bannerImage ? location.bannerImage : member.bannerImage;

  return (
    <Link
      key={location._id}
      to={`/members/${member.slug}/${location.name.toLowerCase().split(' ').join('-')}`}
      className="locations-list-item"
      style={{ backgroundImage: `url('${BannerImage}')` }}
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

LocationsListItem.propTypes = {
  location: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  member: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

LocationsListItem.defaultProps = {
};

export default LocationsListItem;
