import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import BlogPostsList from '../../resources/blog/list/blogPostsList';
import BlogPost from '../../resources/blog/post/post';

const MapContainer = ({
  blogPosts,
}) => ([
  <Route
    exact
    key="blog"
    path="/blog/"
    render={() => (
      <BlogPostsList blogPosts={blogPosts} />
    )}
  />,
  <Route
    exact
    key="locationMap"
    path="/blog/:slug"
    render={({
      match: {
        params: {
          slug,
        },
      },
    }) => {
      const foundBlogPost = blogPosts.find(blogPost => blogPost.slug === slug);
      if (!foundBlogPost) return null;
      return (
        <BlogPost
          blogPost={foundBlogPost}
        />
      );
    }}
  />,
]);

MapContainer.propTypes = {
  blogPosts: PropTypes.arrayOf(PropTypes.shape({})),
};

MapContainer.defaultProps = {
  blogPosts: [],
};

export default connect(
  state => ({
    blogPosts: state.blogPosts.list._list,
  }),
  null,
  null,
  { pure: false },
)(MapContainer);
