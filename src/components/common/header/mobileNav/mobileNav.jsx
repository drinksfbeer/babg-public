import { connect } from 'react-redux';
import React, { Component } from 'react';

import HeaderItem from '../item/headerItem';
import Icon from '../../components/icon/icon';
import SocialLinks from '../../socialLinks/socialLinks';

class MobileNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };

    // this.toggleContent = this.toggleContent.bind(this);
  }

  toggleContent() {
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  render() {
    // const headerPages = pages.filter(page => page.activeOnHeader);
    return (
      <div className={`mobile-nav ${this.state.toggle ? 'active' : null}`}>
        <div
          className="button"
          onClick={() => this.toggleContent()}
        >
          {this.state.toggle ?
            <Icon iconSize="2x" icon="times" /> : <Icon iconSize="2x" icon="bars" />
          }
        </div>

        <div className="content">
          <nav className="mobile-nav">
            <ul>
              <li className="nav-title">NAV</li>
              <HeaderItem
                title="Breweries"
                to="/members"
                icon="beer"
                key="breweries"
              />
              <HeaderItem
                title="Events"
                to="/events"
                icon="calendar-alt"
                key="events"
              />
              <HeaderItem
                title="Chapters"
                to="/chapters"
                icon="anchor"
                key="chapters"
                classContainer="mobile-extra"
              />
              <HeaderItem
                title="Map"
                to="/map"
                icon="map"
                key="locations"
              />
              <HeaderItem
                title="Blog"
                to="/blog"
                icon="newspaper"
                key="blogPosts"
              />
              {/* {headerPages.map(page => (
                <HeaderItem
                  title={page.headerTitle}
                  to={page.slug}
                  icon="star"
                  key={page.headerTitle}
                />
              ))} */}
            </ul>
          </nav>
          <SocialLinks />
        </div>

      </div>
    );
  }
}

MobileNav.propTypes = {
};

MobileNav.defaultProps = {
};

export default connect(
  state => ({
    currentChapter: state.currentChapter,
    chapters: state.chapters.list._list,
    development: state.development,
  }),
  null,
  null,
  { pure: false },
)(MobileNav);
