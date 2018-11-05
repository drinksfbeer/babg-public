import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import Icon from '../../../../common/components/icon/icon';

const EventListItem = ({
  event,
  key,
  defaultImage,
}) => (
  <article className="event-list-item" key={key}>

    <div className="grid">
      <Link
        to={`/events/${event.slug}`}
        style={{ backgroundImage: `url('${event.image ? event.image : defaultImage}')` }}
        className="event-list-image item size-4"
      >
        <div className="content">
          <div className="date-day">{moment(event.startDate).format('dddd')}</div>
          <div className="date-day-number">{moment(event.startDate).format('DD')}</div>
          <div className="date-month">{moment(event.startDate).format('MMM')}</div>
          <div className="date-icon">
            <Icon
              icon="clock"
              iconTheme="far"
            />
          </div>
          <div className="date-time">{moment(event.startDate).format('h A')} - {moment(event.endDate).format('h A')}</div>
        </div>
      </Link>
      <div className="event-description item size-8">
        <div className="eventDescriptionTop">

          <div className="event-member">
            <div className="member-logo"><img src={event.location.member.image} alt={event.location.member.name} /></div>
            <Link to={`/members/${event.location.member.slug}`} >
              <h4 className="member-name">{event.location.member.name}</h4>
            </Link>
          </div>

          <Link to={`/events/${event.slug}`} >
            <h2 className="event-title">{event.title}</h2>
          </Link>
          <p className="event-body" dangerouslySetInnerHTML={{ __html: event.body }} />

        </div>
        <div className="eventDescriptionBottom">

          <div className="location">
            <Link
              to={`/members/${event.location.member.slug}/${event.location.uuid}`}
            >
              <h6>{event.location.name} - {event.location.city}</h6>
            </Link>
          </div>
          <div className="categories">
            <ul className="horizontal">
              <li># {event.category}</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  </article>
);

EventListItem.propTypes = {
  key: PropTypes.string,
  event: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  defaultImage: PropTypes.string,
};

EventListItem.defaultProps = {
  key: '',
  defaultImage: '',
};

export default EventListItem;
