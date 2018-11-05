import React from 'react';
import PropTypes from 'prop-types';

const PullQuoteSection = ({
  text,
  containerClass = '',
}) => (
  <section
    className={`pull-quote-section ${containerClass}`}
  >
    <div className="container">
      <div className="grid">
        <div className="span">
          <p className="pull-quote">{text}</p>
        </div>
      </div>
    </div>
  </section>
);
PullQuoteSection.propTypes = {
  text: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
};

PullQuoteSection.defaultProps = {
  containerClass: '',
};

export default PullQuoteSection;
