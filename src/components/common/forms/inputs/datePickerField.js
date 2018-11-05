import React from 'react';
import Flatpickr from 'react-flatpickr';
/*
  this input will output unix time stamp. Unix time stamp is way better than native javascript date object!!!!!!!!!!!!!
  
*/
const DatePickerField = ({
  label,
  containerClass,
  input,
  placeholder,
  options = {},
  meta: { touched, error },
}) => (
  <div className={containerClass}>
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
    <Flatpickr
      data-enable-time
      options={{
        altInput: true,
        defaultDate: input.value || null,
        ...options
      }}
      placeholder={placeholder || label}
      onChange={v => input.onChange(Date.parse(v[0]))}
    />
  </div>
);


export default DatePickerField;
