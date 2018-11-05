
import React from 'react';

import Icon from '../components/icon/icon';

const SocialLinks = () => (

  <ul className="social-links horizontal">
    <li><a aria-label="Instagram Account" alt="Instagram Account" href="#" target="_blank" rel="noopener noreferrer"><Icon icon="instagram" iconTheme="fab" /></a></li>
    <li><a aria-label="Facebook Account" alt="Facebook Account" href="#" target="_blank" rel="noopener noreferrer"><Icon icon="facebook" iconTheme="fab" /></a></li>
    <li><a aria-label="Vimeo Account" alt="Twitter Account" href="#" target="_blank" rel="noopener noreferrer"><Icon icon="twitter" iconTheme="fab" /></a></li>
  </ul>
);

export default SocialLinks;
