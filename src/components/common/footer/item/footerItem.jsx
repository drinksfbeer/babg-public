import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
// import Icon from '../../components/icon/icon';

const FooterItem = ({
  title,
  to,
  // icon,
  key,
}) => (
  <li>
    <NavLink
      to={to}
      activeClassName="active"
      className=""
      alt={title}
      ket={key}
    >
      {/* <Icon
        icon={icon}
      /> */}
      <span>{title}</span>
    </NavLink>
  </li>
);

FooterItem.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  // icon: PropTypes.string.isRequired,
  key: PropTypes.string,
};

FooterItem.defaultProps = {
  key: '',
};

export default FooterItem;
