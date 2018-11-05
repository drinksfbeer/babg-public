import PropTypes from 'prop-types';
import React from 'react';
import BlogPostListItem from '../listItem/blogPostListItem';
import SectionHeader from '../../../common/components/header/sectionHeader';

const BlogPostsList = ({
  blogPosts,
}) => {
  const visibleBlogPosts = blogPosts.filter(blogPost => !blogPost.hidden);
  return (
    <section className="blogPosts">
      <div className="container">

        <div className="grid">
          <div className="item">
            <SectionHeader
              title="Blog"
              icon="newspaper"
              centered
            />
          </div>
        </div>

        <div className="grid blogPosts-list">
          {
          visibleBlogPosts.length === 0 ? <h1>No Posts</h1> :
          visibleBlogPosts.map(blogPost => (
            <BlogPostListItem blogPost={blogPost} />
          ))}
        </div>
      </div>
    </section>
  );
};

BlogPostsList.propTypes = {
  blogPosts: PropTypes.arrayOf(PropTypes.shape({})),
};
BlogPostsList.defaultProps = {
  blogPosts: [],
};
export default BlogPostsList;
