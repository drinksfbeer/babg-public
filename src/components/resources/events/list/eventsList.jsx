import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import EventGridItem from '../grid/gridItem/eventGridItem';
import EventListItem from './listItem/eventListItem';
import EventsGrid from '../../events/grid/eventsGrid';
import SectionHeader from '../../../common/components/header/sectionHeader';
import Icon from '../../../common/components/icon/icon';
import categories from '../../../../refs/refs';

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      activeCategory: '',
      activeChapterUuid: '',
    };

    this.onChange = this.onChange.bind(this);
    this.emptySearch = this.emptySearch.bind(this);
    this.allChapters = this.allChapters.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  allChapters() {
    window.location = this.props.development ? 'http://localhost:3000/events' : 'http://bayareabrewersguild.floc.beer/events';
  }

  emptySearch() {
    this.setState({
      searchText: '',
    });
  }

  render() {
    const { searchText } = this.state;
    const {
      events, chapters, currentChapter, settings,
    } = this.props;
    const defaultEventImage = settings[0].defaultEventBannerImage;
    // Gets the first three events, we can change later for a different filter
    const featuredEventsTop = events.slice(0, 3);
    const filteredEvents = events
      .filter(event => moment(event.startDate).isAfter(moment()))
      .filter(event => (
        event.title.toLowerCase().includes(searchText.toLowerCase().trim())
      ))
      .filter(event => (
        !this.state.activeCategory || event.category === this.state.activeCategory
      ))
      .filter(event => (
        !this.state.activeChapterUuid ||
      event.location.member.chapterUuid === this.state.activeChapterUuid
      ));
    // const featuredEventsFullWidth = filteredEvents.find(event => event.featured);
    return (
      <div className="events-list-container">

        <EventsGrid
          defaultImage={defaultEventImage}
          events={featuredEventsTop}
          className="featured"
          sectionHeaderTitle={currentChapter ? `Featured ${currentChapter.name} Chapter Events` : 'Featured Guild Events'}
          sectionHeaderIcon="calendar"
        />

        <section className="events-filter">
          <div className="container">
            <div className="grid">
              <div className="item">
                <SectionHeader
                  title={currentChapter ? `events in ${currentChapter.name} chapter` : 'all events'}
                  icon="calendar-alt"
                  description={`${filteredEvents.length} Events Found`}
                  centered
                />
              </div>
              <div className="item">

                <form className="events-filter-form">
                  <div className="grid align-center">
                    <div className="item size-4 eventFilterField">
                      <select name="activeCategory" onChange={this.onChange} aria-label="Categories">
                        <option key="1" value="" disabled selected>Category</option>
                        <option key="2" value="">All Categories</option>
                        {
                          categories.map((category, i) =>
                            <option key={`category${i + 3}`} value={category}>{category}</option>)
                        }
                      </select>
                    </div>
                    <div className="item size-4 eventFilterField">
                      {currentChapter ?
                        <div
                          className="eventsAllChapters"
                          onClick={this.allChapters}
                        >All Chapter Events
                        </div> :
                        <select name="activeChapterUuid" onChange={this.onChange} aria-label="Current Chapter">
                          <option key="chapter" value="" disabled selected>Chapter</option>
                          <option key="all-chapters" value="">All Chapters</option>
                          {chapters.map(chapter =>
                            (
                              <option
                                key={chapter.name}
                                value={chapter.uuid}
                                aria-label={chapter.name}
                              >
                                {chapter.name}
                              </option>
                            ))}
                        </select>
                      }
                    </div>
                    <div className="item size-4 eventFilterField">

                      <div className="input-group">
                        <input
                          className="input-group-field"
                          type="text"
                          name="searchText"
                          onChange={this.onChange}
                          value={this.state.searchText}
                          placeholder="Search"
                          aria-label="Event Search"
                        />

                        <div className="input-group-button" onClick={this.emptySearch}>

                          {this.state.searchText ?
                            <Icon icon="times" /> : <Icon icon="search" />
                          }
                        </div>

                      </div>

                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </section>

        <section className="events-list">
          <div className="container">
            {filteredEvents.length === 0 && <h1>Nothing Found</h1>}
            {filteredEvents.length > 0 && filteredEvents.map((event) => {
              if (event.featured) {
                return (
                  <div className="featured-event" key={event._id}>
                    <EventGridItem defaultImage={defaultEventImage} event={event} key={event._id} />
                  </div>
                );
              }

              return (
                <EventListItem defaultImage={defaultEventImage} event={event} key={event._id} />
              );
            })}
          </div>
        </section>

        {/* <section className="events-list">
          <div className="container">
          {filteredEvents.length === 0 ? <h1>Nothing Found</h1> :
          // Print first three events to make room for featured (if exists)
          filteredEvents.slice(0, 3).map(event => (
          <EventListItem event={event} key={event._id} />
          ))
          }
          </div>
          {featuredEventsFullWidth &&
          // Print the first featured event as full featuredEventsFullWidth
          <div className="featured-event">
          <EventGridItem event={featuredEventsFullWidth} />
          </div>
          }
          <div className="container">
          {filteredEvents.length < 3 ? null :
          // Print the rest of the list if exists
          filteredEvents.slice(3, filteredEvents.length).map(event => (
          <EventListItem event={event} key={event._id} />
          ))
          }
          </div>
        </section> */}

      </div>
    );
  }
}

EventsList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})),
  chapters: PropTypes.arrayOf(PropTypes.shape({})),
  currentChapter: PropTypes.shape({}),
  development: PropTypes.string,
  settings: PropTypes.arrayOf(PropTypes.shape({})),
};
EventsList.defaultProps = {
  events: [],
  chapters: [],
  currentChapter: null,
  development: null,
  settings: [],
};
export default connect(
  state => ({
    currentChapter: state.currentChapter,
    development: state.development,
    settings: state.settings.list._list,
  }),
  null,
  null,
  { pure: false },
)(EventsList);
