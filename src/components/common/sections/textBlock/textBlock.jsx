import PropTypes from 'prop-types';
import React from 'react';

const TextBlock = ({
  text,
  body,
}) => (
  <section
    style={{
        margin: '20px',
    }}
  >
    <div className="grid-container">
      <div className="grid-x grid-padding-x grid-padding-y text-center">
        <div className="cell">
          <h3>{text}</h3>
        </div>
        <div className="cell">
          <p>{body}</p>
        </div>
      </div>
    </div>
  </section>
);

TextBlock.propTypes = {
  body: PropTypes.string,
  text: PropTypes.string,
};

TextBlock.defaultProps = {
  text: 'Text Title',
  body: '',
};


export default TextBlock;
