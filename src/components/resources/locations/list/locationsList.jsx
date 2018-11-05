import PropTypes from 'prop-types';
import React from 'react';
import LocationsListItem from '../listItem/locationsListItem';

const LocationsList = ({ member }) => (
  <div className="locations-list">
    {
      member.locations.map(location =>
        (
          <LocationsListItem location={location} member={member} />
        ))
    }
  </div>
);

LocationsList.propTypes = {
  member: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

LocationsList.defaultProps = {
};

export default LocationsList;
