import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import React from 'react';
import MapList from '../mapList/mapLocationsList';
import MapLocationDetails from '../details/mapLocationDetails';

class LocationsMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      locations, lat, long, zoom, clickedLocation,
    } = this.props;
    return (
      <div className="location-container">
        <div className="container full">
          <div className="grid no-padding no-gap">
            <div className="item locationsMap size-9">
              <div
                className="eventMap"
                style={{
                    height: '75vh',
                }}
              >
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyABxekPV-fRinPUZh1qGJ6iFSDL2EQndHE' }}
                  center={
                      [long, lat]
                  }
                  zoom={zoom}
                  options={{
                      scrollwheel: false,
                  }}
                >
                  {
                    locations.length > 0 &&
                    locations.map(location =>
                      (<MapPoint
                        lat={location.coords[1]}
                        lng={location.coords[0]}
                        name={location.name}
                        image={location.member ? location.member.image : 'https://cdn.filestackcontent.com/wPQCRZ1rSq7V1zSrdg39'}
                        key={location._id}
                      />))
                  }
                </GoogleMapReact>
              </div>
            </div>
            <div
              className="item locationList size-3"
              style={{
                height: '75vh',
                overflowY: 'scroll',
              }}
            >
              {
                clickedLocation ?
                  <MapLocationDetails location={clickedLocation} /> :
                  <MapList locations={locations} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LocationsMap.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
  lat: PropTypes.number,
  long: PropTypes.number,
  zoom: PropTypes.number,
  clickedLocation: PropTypes.shape({}),
};

LocationsMap.defaultProps = {
  locations: [],
  lat: -122.4,
  long: 37.753,
  zoom: 12,
  clickedLocation: null,
};

export default connect(
  state => ({
    locations: state.locations.list._list,
  }),
  null,
  null,
  { pure: false },
)(LocationsMap);

const MapPoint = ({ name, image }) => (
  <Link
    to={`/map/${name.toLowerCase().split(' ').join('-')}`}
    style={{
        backgroundColor: 'white',
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderRadius: '100%',
        height: '45px',
        width: '45px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
      }}
    className="map-point"
  >
    <span
      style={{
          marginBottom: '100px',
          backgroundColor: 'white',
          borderRadius: '5px',
          padding: '5px',
          minWidth: '200px',
          justifyContent: 'center',
        }}
    >
      {name}
    </span>
  </Link>
);

MapPoint.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
