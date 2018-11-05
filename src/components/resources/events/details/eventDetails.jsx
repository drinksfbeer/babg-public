import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

import Button from '../../../common/components/button/button';
import SectionHeader from '../../../common/components/header/sectionHeader';
import Breadcrumbs from '../../../common/breadcrumbs/breadcrumbs';
import EventsGrid from '../grid/eventsGrid';

const EventDetails = ({
  event,
  events,
  settings,
}) => {
  if (!event) return null;
  const filteredEvents = events
    .filter(filteredEvent => moment(filteredEvent.startDate).isAfter(moment()))
    .filter(filteredEvent =>
      filteredEvent.locationUuid === event.locationUuid && filteredEvent.uuid !== event.uuid);
  return (
    <div className="event-details-container">
      <Helmet key="event-helmet">
        <title>{`Bay Area Brewers Guild - ${event.title}`}</title>
        <meta property="og:image" content={event.image} />
        <meta property="og:description" content={`Bay Area Brewers Guild Event - ${event.title}`} />
        <meta property="og:title" content={`Bay Area Brewers Guild - ${event.title}`} />
      </Helmet>

      <Breadcrumbs
        title="EVENTS"
        name={event.name}
        event={event}
      />
      <div key="event-details">

        <div
          className="event-header"
          style={{ backgroundImage: `url('${event.image ? event.image : settings[0].defaultEventBannerImage}')` }}
        >
          <div className="content">
            <Link
              className="member"
              to={`/members/${event.location.member.slug}`}
            >
              <div className="member-logo">
                <img
                  src={event.location.member.image}
                  alt={event.location.member.name}
                  aria-label={event.location.member.name}
                />
              </div>
              <h4 className="event-member-name">{event.location.member.name}</h4>
            </Link>

            <h2 className="event-title">{event.title}</h2>

            <div className="event-date">
              {moment(event.stateDate).format('LL')}
            </div>
            <div className="event-time">
              {`${moment(event.stateDate).format('h:mm A')} - ${moment(event.endDate).format('h:mm A')}`}
            </div>
            <Link
              to={`/members/${event.location.member.slug}/${event.location.uuid}`}
            >
              <h5 className="event-location-name">{event.location.name}</h5>
            </Link>

            <a
              className="eventAddress"
              href={`https://maps.google.com/?q=${event.location.street} ${event.location.city} ${event.location.state} ${event.location.zip}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {`${event.location.street} | ${event.location.city}, ${event.location.state} ${event.location.zip}`}
            </a>

            <div className="button-group">
              {event.ticketUrl &&
                <Button
                  title="BUY TICKETS"
                  href={event.ticketUrl}
                  containerClass="white"
                />
              }
              {event.eventUrl &&
                <Button
                  title="EVENT LINK"
                  href={event.eventUrl}
                  containerClass="white"
                />
              }
              <Button
                title="GET DIRECTIONS"
                href={`https://maps.google.com/?q=${event.location.street} ${event.location.city} ${event.location.state} ${event.location.zip}`}
                containerClass="white"
              />
            </div>

          </div>
        </div>
        <div className="container">
          <div className="grid">

            <div className="item ">
              <SectionHeader
                title="EVENT INFO"
                icon="calendar-check"
                centered
              />
            </div>

            <div className="item size-8 centered">
              <div className="event-description" dangerouslySetInnerHTML={{ __html: event.body }} />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="grid">
            <div className="item">
              <div
                className="eventMap"
                style={{
                  height: '300px',
                }}
              >
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyABxekPV-fRinPUZh1qGJ6iFSDL2EQndHE' }}
                  center={
                    [event.location.coords[1] || 32.9157, event.location.coords[0] || -117.1611]
                  }
                  zoom={15}
                  options={{
                    scrollwheel: false,
                  }}
                >
                  <MapPoint
                    lat={event.location.coords[1]}
                    lng={event.location.coords[0]}
                    name={event.location.name}
                    image={event.location.member.image}
                    key={event.location._id}
                  />
                </GoogleMapReact>
              </div>
            </div>
          </div>
        </div>


      </div>

      <section className="event-grid">
        <div className="container">
          <EventsGrid
            events={filteredEvents}
            sectionHeaderTitle="MORE EVENTS AT THIS LOCATION"
            sectionHeaderIcon="calendar-alt"
            key={event._id}
          />
        </div>
      </section>

    </div>
  );
};

EventDetails.propTypes = {
  event: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})),
  settings: PropTypes.arrayOf(PropTypes.shape({})),
};

EventDetails.defaultProps = {
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
)(EventDetails);


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
