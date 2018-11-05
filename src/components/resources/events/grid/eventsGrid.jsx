import PropTypes from 'prop-types';
import React from 'react';
import EventGridItem from './gridItem/eventGridItem';
import SectionHeader from '../../../common/components/header/sectionHeader';

const EventGrid = ({
  events,
  itemSize,
  className,
  sectionHeaderTitle,
  sectionHeaderIcon,
  key,
  defaultImage,
}) => (
  <section className={`events-grid-section ${className}`} key={key}>

    {sectionHeaderTitle &&
      <div className="container">
        <div className="grid">
          <div className="item">
            <SectionHeader
              title={sectionHeaderTitle}
              icon={sectionHeaderIcon}
              centered
            />
          </div>
        </div>
      </div>
    }
    <div className="events-grid">
      {
        events.map(eventItem =>
          (
            <EventGridItem
              defaultImage={defaultImage}
              event={eventItem}
              itemSize={itemSize}
              key={eventItem._id}
            />
          ))
      }
    </div>
  </section>
);

EventGrid.propTypes = {
  key: PropTypes.string,
  itemSize: PropTypes.string,
  className: PropTypes.string,
  sectionHeaderTitle: PropTypes.string,
  sectionHeaderIcon: PropTypes.string,
  events: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  defaultImage: PropTypes.string,
};

EventGrid.defaultProps = {
  key: '',
  itemSize: '',
  className: '',
  sectionHeaderTitle: '',
  sectionHeaderIcon: '',
  defaultImage: '',
};

export default EventGrid;
