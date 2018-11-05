import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from '../../components/icon/icon';


const SectionHeader = ({
  icon,
  title,
  centered,
  description,
}) => (
  <header
    className={classNames({
      sectionHeader: true,
      centered,
    })}
  >
    {icon &&
      <Icon icon={icon} />
    }
    <h3 className="title">{title}</h3>
    {description &&
      <h6 className="description">{description}</h6>
    }
  </header>
);


SectionHeader.propTypes = {
  description: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  centered: PropTypes.bool,
};

SectionHeader.defaultProps = {
  centered: false,
  icon: '',
  description: '',
};

export default SectionHeader;
