import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './../../common/components/icon/icon';

import SectionHeader from './../../common/components/header/sectionHeader';

// import { Route } from 'react-router-dom';

const ChaptersContainer = ({
  chapters,
  development,
}) => (

  <section className="chapters">
    <div className="container">

      <div className="grid">
        <div className="item">
          <SectionHeader
            title="Guild Chapters"
            icon="anchor"
            centered
          />
        </div>
      </div>

      <div className="chapters-list">
        {chapters.map(chapter => (
          <a
            key={chapter._id}
            className="chapter-item"
            style={{ backgroundImage: `url('${chapter.image}')` }}
            href={development ? `http://${chapter.subdomain}.localhost:3000/` : `http://${chapter.subdomain}.bayareabrewersguild.floc.beer`}
          >
            <div className="content">
              <Icon icon={chapter.icon} />
              <h3
                className="chapter-name"
                style={{ color: `${chapter.color}` }}
              >
                {chapter.name}
              </h3>
              <h6 className="chapter">CHAPTER</h6>
            </div>
          </a>

        ))}
      </div>
    </div>
  </section>

);

ChaptersContainer.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({})),
  development: PropTypes.bool,
};
ChaptersContainer.defaultProps = {
  chapters: [],
  development: true,
};
export default connect(
  state => ({
    chapters: state.chapters.list._list,
    development: state.development,
  }),
  null,
  null,
  { pure: false },
)(ChaptersContainer);
