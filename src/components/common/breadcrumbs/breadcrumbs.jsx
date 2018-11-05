import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({
  title,
  name,
  event,
  location,
  brewery,
}) => {
  if (title === 'BREWERY') {
    return (
      <section className="breadcrumbs">
        <div className="title h5">{title}</div>

        <div className="links">
          <ul className="url-string horizontal">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/members">Breweries</Link></li>
            <li><span>{name}</span></li>
          </ul>

          {/* <ul className="anchors horizontal">
            <li><a href="#">INFO</a></li>
            <li><a href="#">INFO</a></li>
          </ul> */}
        </div>

      </section>
    );
  } else if (title === 'EVENTS') {
    return (
      <section className="breadcrumbs">
        <div className="title h5">{title}</div>
        <div className="links">
          <ul className="url-string horizontal">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to={`/members/${event.location.member.slug}/${event.location.name.toLowerCase().split(' ').join('-')}`}>{event.location.name}</Link></li>
            <li><span>{event.title}</span></li>
          </ul>

          {/* <ul className="anchors horizontal">
            <li><a href="#">INFO</a></li>
            <li><a href="#">INFO</a></li>
          </ul> */}
        </div>
      </section>
    );
  }
  return (
    // Location Breadcrumb
    <section className="breadcrumbs">
      <div className="title h5">{title}</div>
      <div className="links">
        <ul className="url-string horizontal">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/members">Breweries</Link></li>
          <li><Link to={`/members/${brewery.slug}`}>{brewery.name}</Link></li>
          <li><span>{location.name}</span></li>
        </ul>

        {/* <ul className="anchors horizontal">
          <li><a href="#">INFO</a></li>
          <li><a href="#">INFO</a></li>
        </ul> */}
      </div>
    </section>
  );
};

Breadcrumbs.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  event: PropTypes.shape({}),
  location: PropTypes.shape({}),
  brewery: PropTypes.shape({}),
};

Breadcrumbs.defaultProps = {
  title: '',
  name: '',
  event: {},
  location: {},
  brewery: {},
};
export default Breadcrumbs;
