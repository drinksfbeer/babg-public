import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../components/icon/icon';

const HeaderItem = ({
  title,
  to,
  icon,
  key,
  classContainer,
}) => (
  <li
    key={key}
    className={classContainer}
  >
    <NavLink
      to={to}
      activeClassName="active"
      className=""
      alt={title}

    >
      <Icon
        icon={icon}
      />
      <span>{title}</span>
    </NavLink>
  </li>
);

HeaderItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  icon: PropTypes.string.isRequired,
  key: PropTypes.string,
  classContainer: PropTypes.string,
};

HeaderItem.defaultProps = {
  key: '',
  to: '',
  classContainer: '',
};

export default HeaderItem;
