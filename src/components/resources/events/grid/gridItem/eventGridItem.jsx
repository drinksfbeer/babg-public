import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import Icon from '../../../../common/components/icon/icon';

const EventGridItem = ({
  event,
  itemSize,
  key,
  defaultImage,
}) => (
  <Link
    to={`/events/${event.slug}`}
    className={`event-grid-item item ${itemSize}`}
    style={{ backgroundImage: `url('${event.image ? event.image : defaultImage}')` }}
    key={key}
  >
    <div className="content">

      <div className="top">
        <div className="icon">
          <Icon
            icon="calendar-alt"
            iconSize="lg"
            iconTheme="far"
          />
        </div>
        <div className="event-date">
          <div className="day">{moment(event.startDate).format('D')}</div>
          <div className="month">{moment(event.startDate).format('MMM')}</div>
        </div>
      </div>

      <div className="center">
        <h3 className="event-title">{event.title}</h3>
        <div className="event-location-name">{event.location.name}</div>
        <div className="member-logo">
          <img
            src={event.location.member.image}
            alt={event.location.member.name}
          />
        </div>
      </div>

      <div className="bottom">
        <div className="event-tag"># {event.category}</div>
        <div className="event-time">
          {`${moment(event.startDate).format('hA')}
          -
          ${moment(event.endDate).format('hA')}`}
        </div>
      </div>

    </div>
  </Link>
);

EventGridItem.propTypes = {
  key: PropTypes.string,
  itemSize: PropTypes.string,
  event: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  defaultImage: PropTypes.string,
};

EventGridItem.defaultProps = {
  itemSize: '',
  key: '',
  defaultImage: '',
};

export default EventGridItem;
