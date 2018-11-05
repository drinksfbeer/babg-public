
import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../components/icon/icon';

const MembersSocialLinks = ({
  instaLink,
  facebookLink,
  twitterLink,
}) => (

  <ul className="social-links horizontal">
    {instaLink &&
      <li><a aria-label="Instagram Account" alt="Instagram Account" href={instaLink} target="_blank" rel="noopener noreferrer"><Icon icon="instagram" iconTheme="fab" iconSize="" classContainer="" /></a></li>
    }
    {facebookLink &&
      <li><a aria-label="Facebook Account" alt="Facebook Account" href={facebookLink} target="_blank" rel="noopener noreferrer"><Icon icon="facebook" iconTheme="fab" iconSize="" classContainer="" /></a></li>
    }
    {twitterLink &&
      <li><a aria-label="Twitter Account" alt="Twitter Account" href={twitterLink} target="_blank" rel="noopener noreferrer"><Icon icon="twitter" iconTheme="fab" iconSize="" classContainer="" /></a></li>
    }
  </ul>
);

MembersSocialLinks.propTypes = {
  instaLink: PropTypes.string,
  twitterLink: PropTypes.string,
  facebookLink: PropTypes.string,
};

MembersSocialLinks.defaultProps = {
  instaLink: '',
  twitterLink: '',
  facebookLink: '',
};

export default MembersSocialLinks;
