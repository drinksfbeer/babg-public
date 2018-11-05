import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  containerClass = '',
  containerStyle = {},
  inputClass = '',
  labelClass = '',
  errorStyle = {},
  labelStyle = {},
  inputStyle = {},
  input,
  label,
  placeholder,
  type = 'text',
  meta: { touched, error },
}) => (
  <div
    className={containerClass}
    style={{ ...containerStyle }}
  >

    <label
      style={{ ...labelStyle }}
      className={labelClass}
      htmlFor={label}
    >
      {label}


      {touched &&
        error && (
          <span
            className="errorMessage"
            style={{ ...errorStyle }}
          >
            {error}
          </span>
        )}
      <input
        {...input}
        style={{
          ...inputStyle,
        }}
        className={inputClass}
        placeholder={placeholder || label}
        type={type}
        arria-label={label}
      />
    </label>
  </div>
);

TextField.defaultProps = {
  containerClass: 'text-field',
  inputClass: '',
  labelClass: '',
  containerStyle: {},
  errorStyle: {},
  labelStyle: {},
  inputStyle: {},
  placeholder: '',
  type: 'text',
  meta: {
    touched: false,
    error: '',
  },
  label: '',
};

TextField.propTypes = {
  containerClass: PropTypes.string,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  containerStyle: PropTypes.shape({}),
  errorStyle: PropTypes.shape({}),
  labelStyle: PropTypes.shape({}),
  inputStyle: PropTypes.shape({}),
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default TextField;
