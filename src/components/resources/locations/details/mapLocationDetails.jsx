import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './../../../common/components/icon/icon';
import SectionHeader from './../../../common/components/header/sectionHeader';
import Button from './../../../common/components/button/button';

const MapListItem = ({
  location,
}) => {
  if (!location) {
    return null;
  }
  return (
    <div
      className="locations-list-item"
    >
      <div className="content">
        <Link
          to={`/members/${location.member.slug}/`}
        >
          <h3 className="location-brewery">{location.member.name}</h3>
        </Link>
        <div className="icon">
          <Icon icon="map-marker-alt" />
        </div>
        <Link
          to={`/members/${location.member.slug}/${location.name.toLowerCase().split(' ').join('-')}`}
        >
          <h3 className="location-name">{location.name}</h3>
        </Link>
        <div className="street-address">
          {`${location.street} `}
        </div>
        <div className="city-state">
          {`${location.city}, ${location.state} ${location.zip}`}
        </div>
        <div className="item size-2">
          <SectionHeader
            title="phone"
            icon="phone"
            centered
          />
          <div className="location-phone">
            {location.phone ?
              <a href={`tel:${location.phone}`}>{location.phone}</a> : <span>No phone number listed</span>
              }
          </div>
        </div>
        <div className="hours">
          <div className="item size-3">
            <SectionHeader
              title="hours"
              icon="calendar-alt"
              centered
            />

            <ul className="location-hours">
              {!location.hoursMonday ?
                <li>Monday: No hours listed</li> : <li>Monday: {location.hoursMonday}</li>
                }
              {!location.hoursTuesday ?
                <li>Tuesday: No hours listed</li> : <li>Tuesday: {location.hoursTuesday}</li>
                }
              {!location.hoursWednesday ?
                <li>Wednesday: No hours listed</li> :
                <li>Wednesday: {location.hoursWednesday}</li>
                }
              {!location.hoursThursday ?
                <li>Thursday: No hours listed</li> :
                <li>Thursday: {location.hoursThursday}</li>
                }
              {!location.hoursFriday ?
                <li>Friday: No hours listed</li> :
                <li>Friday: {location.hoursFriday}</li>
                }
              {!location.hoursSaturday ?
                <li>Saturday: No hours listed</li> :
                <li>Saturday: {location.hoursSaturday}</li>
                }
              {!location.hoursSunday ?
                <li>Sunday: No hours listed</li> :
                <li>Sunday: {location.hoursSunday}</li>
                }
            </ul>
          </div>
        </div>
        <div className="backButton">
          <Link
            to="/map"
          >
            <Button
              title="Back"
              icon="chevron-left"
              containerClass="white"
            />
          </Link>
        </div>
      </div>
    </div>
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
