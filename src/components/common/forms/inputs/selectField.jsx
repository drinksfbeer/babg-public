import React from 'react';
import PropTypes from 'prop-types';

// options will come in as an array of  { value and title }

const SelectField = ({
  input,
  label,
  options,
  placeholder,
  optionStyle = {},
  lastOptionStyle = {},
  containerClass = '',
  containerStyle = {},
  inputStyle = {},
  onSelect,
  meta: { touched, error },
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
      <span>{label}</span>
      {touched && error && <span className="form-error-new">{error}</span>}
    </div>
    <select
      onChange={(e) => {
        input.onChange(e.target.value);
        if (onSelect) onSelect(e.target.value);
      }}
    >
      <option style={inputStyle} value="">
        {placeholder || label}
      </option>
      {options &&
        options.map((option, i) => (
          <option
            style={{
              ...optionStyle,
              ...(i === options.length - 1 ? lastOptionStyle : {}),
            }}
            key={option.value}
            value={option.value}
          >
            {option.title || options.value}
          </option>
        ))}
    </select>
  </div>
);

SelectField.defaultProps = {
  placeholder: '',
  optionStyle: {},
  lastOptionStyle: {},
  containerClass: '',
  containerStyle: {},
  inputStyle: {},
  onSelect: null,
  meta: {
    touched: false,
    error: '',
  },
};
SelectField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    title: PropTypes.string,
  })).isRequired,
  placeholder: PropTypes.string,
  optionStyle: PropTypes.shape({}),
  lastOptionStyle: PropTypes.shape({}),
  containerClass: PropTypes.string,
  containerStyle: PropTypes.shape({}),
  inputStyle: PropTypes.shape({}),
  onSelect: PropTypes.func,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default SelectField;
