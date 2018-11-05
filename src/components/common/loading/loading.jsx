import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ inline }) => (
  <div
    style={{
      minHeight: inline ? undefined : '40vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <img
      alt="loading"
      src="https://i.imgur.com/zjM3rnQ.gif"
      style={{
        width: '40px',
        height: '40px',
      }}
    />
  </div>
);

Loading.defaultProps = {
  inline: false,
};

Loading.propTypes = {
  inline: PropTypes.bool,
};

export default Loading;
