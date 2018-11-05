import React from 'react';
import PropTypes from 'prop-types';

// TODO FINISH THIS

const ToggleField = ({
  containerClass = 'cell',
  containerStyle = {},
  labelStyle = {},
  label,
  input,
  meta: { error },
}) => (
  <div
    className={containerClass}
    style={{
      margin: '20px',
      ...containerStyle,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div style={labelStyle}>{label}</div>
      {error && <div>{error}</div>}
    </div>
    <input
      type="checkbox"
      onClick={() => input.onChange(!input.value)}
      defaultChecked={input.value}
      style={{
        width: '40px',
      }}
    />
  </div>
);

ToggleField.defaultProps = {
  containerClass: '',
  containerStyle: {},
  labelStyle: {},
  meta: {
    error: '',
  },
};

ToggleField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  containerClass: PropTypes.string,
  containerStyle: PropTypes.shape({}),
  labelStyle: PropTypes.shape({}),
  meta: PropTypes.shape({
    error: PropTypes.string,
  }),
};

export default ToggleField;
