// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import HeaderItem from './item/headerItem';
import HeaderItemDevelopment from './item/headerItemDevelopment';
import PageBuilderHeaderItem from './item/pageBuilderHeaderItem';
import Icon from './../components/icon/icon';
import SocialLinks from './../socialLinks/socialLinks';
import MobileNav from './mobileNav/mobileNav';

import Dropdown from '../dropdown/dropdown';
// import grabSubDomain from '../../../helpers/subDomainString';

const HeaderContainer = ({
  pages,
  currentChapter,
  development,
}) => {
  const headerPages = pages.filter(page => page.activeOnHeader);
  const title = currentChapter ? `${currentChapter.name} Chapter` : 'BAY AREA BREWERS GUILD';
  const chapterColor = currentChapter && currentChapter.color ? currentChapter.color : '';
  const currentChapterClass = currentChapter ? 'chapter-active' : '';


  // const chapterColor
  // = currentChapter && currentChapter.hasOwnProperty('color') ? currentChapter.color : '';
  // eslint-disable-line
  return (
    <header
      className={`header-container ${currentChapterClass}`}
    >
      <MobileNav />
      <div
        className="header-top"
        style={{
          backgroundImage: `url(${currentChapter ? currentChapter.image : 'https://cdn.filestackcontent.com/fEvun4XYSRuZJHBHpIew'})`,
        }}
      >

        <div className="content">
          <div className="left">
            <SocialLinks />
          </div>

          <div className="center">

            <a
              className="site-logo"
              href={development ? 'http://localhost:3000/' : 'http://bayareabrewersguild.floc.beer/'}
            >
              <h1><span className="main">Bay Area</span><span className="secondary">Brewers Guild</span></h1>
            </a>
            {
              //  If current chapter exists add chapter logo
              currentChapter &&
              <a
                href={development ? `http://${currentChapter.subdomain}.localhost:3000/` : `http://${currentChapter.subdomain}.bayareabrewersguild.floc.beer`}
                className="current-chapter"
                style={{ color: `${chapterColor}` }}
              >
                <Icon
                  icon={currentChapter.icon}
                  style={{ color: `${chapterColor}` }}
                />
                <h3
                  style={{ color: `${chapterColor}` }}
                >
                  <span className="the">The</span>{title}<span className="chapter">Chapter</span>
                </h3>
              </a>
            }

          </div>

          <div className="sign-in">
            <ul className="top-nav horizontal">
              {/* <li>
                <Link
                  to=""
                >
                  Join
                </Link>
              </li> */}
              <li>
                <a
                  href={development ? '' : 'http://members.bayareabrewersguild.floc.beer/'}
                >
                  Sign In
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <div
        className="header-bottom"
        style={{ backgroundColor: `${chapterColor}` }}
      >
        <nav className="header-nav">
          <ul
            className="horizontal"
          >
            {!currentChapter ?
              <HeaderItemDevelopment classContainer="mobile-hide" key="guild" title="GUILD:" icon="crown" href={development ? 'http://localhost:3000/' : 'http://bayareabrewersguild.floc.beer/'} /> : <HeaderItemDevelopment classContainer="mobile-hide" key="chapter" title="CHAPTER:" icon="anchor" href={development ? `http://${currentChapter.subdomain}.localhost:3000/` : `http://${currentChapter.subdomain}.bayareabrewersguild.floc.beer`} />
            }

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
            {!currentChapter &&
              <HeaderItem
                title="Chapters"
                to="/chapters"
                icon="anchor"
                key="chapters"
                classContainer="mobile-extra"
              />
            }
            <HeaderItem
              title="Map"
              to="/map"
              icon="map"
              key="locations"
              classContainer="mobile-extra"
            />
            <HeaderItem
              title="Blog"
              to="/blog"
              icon="newspaper"
              key="blogPosts"
              classContainer="mobile-extra"
            />
            <HeaderItem
              title="Contact"
              to="/contact"
              icon="envelope"
              key="contactForm"
              classContainer="mobile-extra"
            />
            {headerPages.map(page => (
              <PageBuilderHeaderItem
                title={page.headerTitle}
                itemHref={development ? `http://localhost:3000/${page.slug}` : `http://bayareabrewersguild.floc.beer/${page.slug}`}
                icon={page.headerIcon}
                key={page.headerTitle}
                classContainer="mobile-extra"
              />
            ))}

          </ul>
        </nav>

        <Dropdown
          clasName="dropdownNav"
        />
      </div>
    </header>
  );
};

HeaderContainer.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  currentChapter: PropTypes.shape({}),
  development: PropTypes.bool,
};
HeaderContainer.defaultProps = {
  pages: [],
  currentChapter: null,
  development: true,
};
export default connect(
  state => ({
    pages: state.pages.list._list,
    currentChapter: state.currentChapter,
    development: state.development,
  }),
  null,
  null,
  { pure: false },
)(HeaderContainer);
