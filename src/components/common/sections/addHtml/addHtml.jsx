import React from 'react';
import PropTypes from 'prop-types';

const addHtml = ({
  input,
}) => (
  // eslint-disable-next-line
  <div dangerouslySetInnerHTML={{ __html: `${input}` }} />
);

addHtml.propTypes = {
  input: PropTypes.string,
};

addHtml.defaultProps = {
  input: '',
};


export default addHtml;
