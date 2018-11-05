import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../../components/icon/icon';

const HeaderItem = ({
  title,
  itemHref,
  icon,
  key,
  classContainer,
}) => (
  <li
    key={key}
    className={classContainer}
  >
    <a
      href={itemHref}
      activeClassName="active"
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

HeaderItem.propTypes = {
  title: PropTypes.string.isRequired,
  itemHref: PropTypes.string,
  icon: PropTypes.string.isRequired,
  key: PropTypes.string,
  classContainer: PropTypes.string,
};

HeaderItem.defaultProps = {
  key: '',
  itemHref: '',
  classContainer: '',
};

export default HeaderItem;
