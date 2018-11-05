import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import MissingPage from '../../components/common/missingPage/missingPage';
import Loading from '../../components/common/loading/loading';
import Sections from '../../components/common/sections/index';
// import grabSubDomainString from '../../helpers/subDomainString';

class PagesContainer extends React.Component {
  render() {
    const {
      pages,
      loading,
      match: {
        params: {
          slug,
        },
      },
    } = this.props;
    // const subdomain = grabSubDomainString();
    const foundPage = pages.find(page => page.slug === (slug || 'home'));
    if (!foundPage && loading) return <Loading />;
    if (!foundPage) return <MissingPage />;
    if (!foundPage.sections) return null;

    return ([
      <Helmet key="helmet">
        <title>{foundPage.metaTitle}</title>
        <meta property="og:image" content={foundPage.metaImage} />
        <meta property="og:description" content={foundPage.metaDescription} />
        <meta property="og:title" content={foundPage.metaDescription} />
      </Helmet>,
      foundPage.sections.map((section, i) => {
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


PagesContainer.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  loadData: PropTypes.func,
};

PagesContainer.defaultProps = {
  pages: [],
  loading: false,
  loadData: null,
};

export default connect(
  state => ({
    pages: state.pages.list._list,
    loading: state.pages.list.loading,
  }),
  null,
  null,
  { pure: false },
)(withRouter(PagesContainer));
