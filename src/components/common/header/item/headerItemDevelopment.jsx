import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../components/icon/icon';

const HeaderItemDevelopment = ({
  title,
  href,
  icon,
  key,
  classContainer,
}) => (
  <li
    key={key}
    className={classContainer}
  >
    <a
      href={href}
      // activeClassName="active"
      className=""
      alt={title}
    >
      <Icon
        icon={icon}
      />
      <span>{title}</span>
    </a>
  </li>
);

HeaderItemDevelopment.propTypes = {
  key: PropTypes.string,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  classContainer: PropTypes.string,
};

HeaderItemDevelopment.defaultProps = {
  key: '',
  classContainer: '',
};
export default HeaderItemDevelopment;
