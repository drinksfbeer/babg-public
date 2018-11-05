import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import EventsGrid from '../../events/grid/eventsGrid';
import LocationsList from '../../locations/list/locationsList';
import MembersSocialLinks from '../../../common/socialLinks/membersSocialLinks';
import SectionHeader from '../../../common/components/header/sectionHeader';

import Breadcrumbs from '../../../common/breadcrumbs/breadcrumbs';

class MemberDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionToggle: false,
    };
  }
  render() {
    const {
      member, events, development, settings,
    } = this.props;
    const defaultEventImage = settings[0].defaultEventBannerImage;
    const filteredEvents = events
      .filter(filteredEvent => moment(filteredEvent.startDate).isAfter(moment()))
      .filter(event =>
        event.location.member.uuid === member.uuid);

    const maxLength = 360;

    const shortDescription = member.description.substr(0, maxLength);
    if (!member) return null;
    return (
      [
        <Helmet key="member-helmet">
          <title>{`Bay Area Brewers Guild - ${member.name}`}</title>
          <meta property="og:image" content={member.image} />
          <meta property="og:description" content={`Bay Area Brewers Guild Member - ${member.name}`} />
          <meta property="og:title" content={`Bay Area Brewers Guild - ${member.name}`} />
        </Helmet>,
        <div className="member-details" key="member-details">

          <Breadcrumbs
            title="BREWERY"
            name={member.name}
          />
          <section
            className="member-header"
            style={{ backgroundImage: `url('${member.bannerImage}')` }}
          >
            <div className="content">
              <div className="member">
                <div className="member-logo">
                  <img src={member.image} alt={member.name} />
                </div>
                <h2 className="member-name">{member.name}</h2>
                <a href={member.website} className="member-website">
                  {member.website}
                </a>
              </div>
              <div className="description">
                <p className="description">{this.state.descriptionToggle ? member.description : `${shortDescription}...`}</p>
                <span className="read-more" onClick={() => { this.setState({ descriptionToggle: !this.state.descriptionToggle }); }}>{this.state.descriptionToggle ? 'Read Less' : 'Read More'}</span>
              </div>
              <div className="member-chapter">
                <a
                  href={development ? `http://${member.chapter.subdomain}.localhost:3000/` : `http://${member.chapter.subdomain}.bayareabrewersguild.floc.beer`}
                >
                  {member.chapter.name} CHAPTER
                </a>
              </div>
              {member.instagram && member.facebook && member.twitter &&
                <div className="social-links">
                  <MembersSocialLinks
                    instaLink={member.instagram}
                    facebookLink={member.facebook}
                    twitterLink={member.twitter}
                  />
                </div>
              }
            </div>
          </section>

          <div className="container">
            <div className="grid">
              <div className="item">
                <SectionHeader
                  title="Locations"
                  icon="map-marker-alt"
                  centered
                />
              </div>
            </div>
            <LocationsList member={member} />
          </div>

          <div className="container">
            <EventsGrid
              defaultImage={defaultEventImage}
              events={filteredEvents}
              sectionHeaderTitle="EVENTS"
              sectionHeaderIcon="calendar-alt"
            />
          </div>

        </div>,
      ]
    );
  }
}


MemberDetails.propTypes = {
  development: PropTypes.bool,
  member: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})),
  settings: PropTypes.arrayOf(PropTypes.shape({})),
};

MemberDetails.defaultProps = {
  events: [],
  development: true,
  settings: [],
};

export default connect(
  state => ({
    events: state.events.list._list,
    development: state.development,
    settings: state.settings.list._list,
  }),
  null,
  null,
  { pure: false },
)(MemberDetails);
