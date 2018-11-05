import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import axios from 'axios';
import Breadcrumbs from '../../../common/breadcrumbs/breadcrumbs';
import Button from './../../../common/components/button/button';
import EventsGrid from '../../events/grid/eventsGrid';
import Icon from './../../../common/components/icon/icon';
import SectionHeader from '../../../common/components/header/sectionHeader';

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.getGoogleDetails = this.getGoogleDetails.bind(this);
  }
  // Use later for pulling place date from google
  getGoogleDetails = async (userInput) => {
    try {
      const googleDetails = await axios.post('https://sfbeer-portal.herokuapp.com/api/v1/googleDetails', {
        location: userInput,
      });
      await console.log(googleDetails.data.result);
    } catch (error) {
      if (error) console.log(error);
    }
  }

  render() {
    const {
      brewery, name, events, settings,
    } = this.props;
    const defaultEventImage = settings[0].defaultEventBannerImage;
    const [foundLocation] = brewery.locations.filter(location =>
      location.name.toLowerCase() === name.toLowerCase().split('-').join(' '));
    const filteredEvents = events
      .filter(filteredEvent => moment(filteredEvent.startDate).isAfter(moment()))
      .filter(event =>
        event.locationUuid === foundLocation.uuid);

    const BannerImage = foundLocation.bannerImage ?
      foundLocation.bannerImage : brewery.bannerImage;
    // // Use later for pulling place date from google
    // this.getGoogleDetails(`${foundLocation.name.split(' ').join('%')}%${foundLocation.city}`);
    return (
      <div className="location-container">

        <Breadcrumbs
          title="LOCATION"
          location={foundLocation}
          brewery={brewery}
        />
        <section
          className="location-header"
          style={{ backgroundImage: `url('${BannerImage}')` }}
        >
          <div className="content">
            <Link
              className="member"
              to={`/members/${brewery.slug}`}
            >
              <div className="member-logo"><img src={brewery.image} alt={brewery.name} /></div>
              <h4 className="member-name">{brewery.name}</h4>
            </Link>

            <Icon icon="map-marker-alt" />
            <h2 className="location-name">{foundLocation.name}</h2>

            <a
              href={`https://maps.google.com/?q=${foundLocation.street} ${foundLocation.city} ${foundLocation.state} ${foundLocation.zip}`}
              rel="noopener noreferrer"
              target="_blank"
              className="address"
            >
              {`${foundLocation.street} | ${foundLocation.city}, ${foundLocation.state} ${foundLocation.zip}`}
            </a>
            <span className="stage">{foundLocation.stage}</span>

            <Button
              title="Get Directions"
              href={`https://maps.google.com/?q=${foundLocation.street} ${foundLocation.city} ${foundLocation.state} ${foundLocation.zip}`}
              icon="map-marker-alt"
              containerClass="white"
            />

          </div>

        </section>

        <div className="container">
          <div className="grid align-center">
            <div className="item size-4">
              <SectionHeader
                title="Address"
                icon="calendar-alt"
                centered
              />

              <a
                className="location-address"
                href={`https://maps.google.com/?q=${foundLocation.street} ${foundLocation.city} ${foundLocation.state} ${foundLocation.zip}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {`${foundLocation.street} ${foundLocation.city}, ${foundLocation.state} ${foundLocation.zip}`}
                <Button
                  title="Get Directions"
                  href={`https://maps.google.com/?q=${foundLocation.street} ${foundLocation.city} ${foundLocation.state} ${foundLocation.zip}`}
                  icon="map-marker-alt"
                  containerClass="black"
                />
              </a>

            </div>
            <div className="item size-2">
              <SectionHeader
                title="phone"
                icon="phone"
                centered
              />
              <div className="location-phone">
                {foundLocation.phone ?
                  <a href={`tel:${foundLocation.phone}`}>{foundLocation.phone}</a> : <span>No phone number listed</span>
                }
              </div>
            </div>
            <div className="item size-3">
              <SectionHeader
                title="hours"
                icon="calendar-alt"
                centered
              />

              <ul className="location-hours">
                {!foundLocation.hoursMonday ?
                  <li>Monday: No hours listed</li> : <li>Monday: {foundLocation.hoursMonday}</li>
                }
                {!foundLocation.hoursTuesday ?
                  <li>Tuesday: No hours listed</li> : <li>Tuesday: {foundLocation.hoursTuesday}</li>
                }
                {!foundLocation.hoursWednesday ?
                  <li>Wednesday: No hours listed</li> :
                  <li>Wednesday: {foundLocation.hoursWednesday}</li>
                }
                {!foundLocation.hoursThursday ?
                  <li>Thursday: No hours listed</li> :
                  <li>Thursday: {foundLocation.hoursThursday}</li>
                }
                {!foundLocation.hoursFriday ?
                  <li>Friday: No hours listed</li> :
                  <li>Friday: {foundLocation.hoursFriday}</li>
                }
                {!foundLocation.hoursSaturday ?
                  <li>Saturday: No hours listed</li> :
                  <li>Saturday: {foundLocation.hoursSaturday}</li>
                }
                {!foundLocation.hoursSunday ?
                  <li>Sunday: No hours listed</li> :
                  <li>Sunday: {foundLocation.hoursSunday}</li>
                }
              </ul>
            </div>

            <div className="item size-3">
              <SectionHeader
                title="Categories"
                icon="calendar-alt"
                centered
              />
              {foundLocation.locationOptions.map(option => (
                <ul className="categories" key={option}>
                  <li>{option}</li>
                </ul>
              ))}
            </div>
          </div>
          {/* <div className="item size-3">
            {foundLocation.profileLocation ?
              <span>Brewery</span> : <span>Event Only Location</span> }
          </div> */}

        </div>
        <div className="container full">
          <div className="grid">
            <div className="item">
              <div
                className="eventMap"
                style={{
                    height: '25vh',
                }}
              >
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyABxekPV-fRinPUZh1qGJ6iFSDL2EQndHE' }}
                  center={
                      [foundLocation.coords[1] || 32.9157, foundLocation.coords[0] || -117.1611]
                  }
                  zoom={15}
                  options={{
                      scrollwheel: false,
                  }}
                >
                  <MapPoint
                    lat={foundLocation.coords[1]}
                    lng={foundLocation.coords[0]}
                    name={foundLocation.name}
                    image={brewery.image}
                    key={foundLocation._id}
                  />
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <EventsGrid
            defaultImage={defaultEventImage}
            events={filteredEvents}
            sectionHeaderTitle="MORE EVENTS AT THIS LOCATION"
            sectionHeaderIcon="calendar-alt"
          />
        </div>

      </div>
    );
  }
}

Location.propTypes = {
  brewery: PropTypes.shape({}),
  name: PropTypes.string,
  events: PropTypes.shape({}),
  settings: PropTypes.arrayOf(PropTypes.shape({})),
};

Location.defaultProps = {
  brewery: {},
  name: '',
  events: [],
  settings: [],
};

export default connect(
  state => ({
    events: state.events.list._list,
    settings: state.settings.list._list,
  }),
  null,
  null,
  { pure: false },
)(Location);

const MapPoint = ({ name, image }) => (
  <div
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
  </div>
);

MapPoint.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
