import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Map from '../../resources/locations/map/map';


const MapContainer = ({
  locations,
}) => ([
  <Route
    exact
    key="map"
    path="/map/"
    render={() => (
      <Map />
    )}
  />,
  <Route
    exact
    key="locationMap"
    path="/map/:name"
    render={({
      match: {
        params: {
          name,
        },
      },
    }) => {
      const foundLocation = locations.find(location => location.name.toLowerCase().split(' ').join('-') === name);
      if (!foundLocation) return (<Map />);
      return (
        <Map
          lat={foundLocation.coords[0]}
          long={foundLocation.coords[1]}
          zoom={15}
          clickedLocation={foundLocation}
        />
      );
    }}
  />,
]);

MapContainer.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
};

MapContainer.defaultProps = {
  locations: [],
};

export default connect(
  state => ({
    locations: state.locations.list._list,
  }),
  null,
  null,
  { pure: false },
)(MapContainer);
