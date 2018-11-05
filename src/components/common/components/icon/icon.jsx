import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = ({
  icon,
  iconTheme,
  iconSize,
  style,
  // classContainer,
}) => (
  <FontAwesomeIcon icon={[iconTheme, icon]} size={iconSize} style={style} />
);


Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  iconTheme: PropTypes.string,
  // classContainer: PropTypes.string,
  iconSize: PropTypes.string,
  style: PropTypes.string,
};

Icon.defaultProps = {
  iconTheme: 'fas',
  // classContainer: \'',
  iconSize: '1x',
  style: '',
};

export default Icon;
