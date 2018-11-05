import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import Sections from '../../../../components/common/sections/index';

class BlogPost extends React.Component {
  render() {
    const {
      sections,
    } = this.props.blogPost;

    return ([
      sections.map((section, i) => {
        const { component, ...sectionProps } = section;
        const Section = Sections[component];
        const SectionComponent = Section && Section.component;
        if (!SectionComponent) return null;

        return (
          <SectionComponent
            key={i} // eslint-disable-line
            {...sectionProps}
          />
        );
      }),
    ]);
  }
}


BlogPost.propTypes = {
  blogPost: PropTypes.shape({
    section: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

BlogPost.defaultProps = {
  blogPost: {},
};

export default BlogPost;
