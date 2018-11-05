import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import EventDetails from '../../resources/events/details/eventDetails';
import EventsList from '../../resources/events/list/eventsList';

const EventsContainer = ({
  events,
  chapters,
}) => ([
  <Route
    exact
    key="events-list"
    path="/events"
    render={() => (
      <EventsList events={events} chapters={chapters} />
    )}
  />,
  <Route
    key="event-details"
    path="/events/:slug"
    render={({
      match: {
        params: {
          slug,
        },
      },
    }) => {
      const foundEvent = events.find(event => event.slug === slug);
      if (!foundEvent) return null;

      return (
        <EventDetails event={foundEvent} />
      );
    }}
  />,
]);

EventsContainer.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})),
};
EventsContainer.defaultProps = {
  events: [],
};
export default connect(
  state => ({
    events: state.events.list._list,
    chapters: state.chapters.list._list,
  }),
  null,
  null,
  { pure: false },
)(EventsContainer);
