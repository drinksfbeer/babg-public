import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from '../../../common/components/icon/icon';

const BlogPostListItem = ({
  blogPost,
}) => (
  <Link
    to={`/blog/${blogPost.slug}`}
    className="blogPostListItem item size-12"
  >
    <article
      className="blogPostListItemContent"
      style={{
        backgroundImage: `url(${blogPost.image})`,
      }}
    >
      <h1>{blogPost.name}</h1>
      <p>{blogPost.description}</p>
      <p><span><Icon icon="tag" /></span>   {blogPost.tags.toUpperCase().split(',').join('   ')}</p>
    </article>
  </Link>
);

BlogPostListItem.propTypes = {
  blogPost: PropTypes.shape({}),
};

BlogPostListItem.defaultProps = {
  blogPost: {},
};

export default BlogPostListItem;
