import React from 'react';
import PropTypes from 'prop-types';

const FullWidthImage = ({
  backgroundImageUrl,
  containerClass = '',
  minHeight,
}) => (
  <section className={`fullWidthImage ${containerClass}`} style={{ background: `url('${backgroundImageUrl}')`, minHeight }} />
);
FullWidthImage.propTypes = {
  backgroundImageUrl: PropTypes.string,
  containerClass: PropTypes.string,
  minHeight: PropTypes.string,
};

FullWidthImage.defaultProps = {
  backgroundImageUrl: 'https://via.placeholder.com/1200x800',
  containerClass: '',
  minHeight: '20vh',
};

export default FullWidthImage;
