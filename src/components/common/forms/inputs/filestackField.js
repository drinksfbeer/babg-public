import PropTypes from 'prop-types';
import React from 'react';
import ReactFilestack from 'filestack-react';

const FileStackField = ({
  input: {
    value,
    onChange,
  },
  label,
  options,
  preview,
}) => {
  const fileStackProps = {
    apikey: 'AOa1bxdAIQ02ckn1tmqRzz',
    options: {
      maxFiles: 1,
      ...options,
    },
    buttonClass: 'button  expanded',
    buttonText: value ? `Replace ${label}` : `Upload ${label}`,
    onSuccess: (response) => {
      onChange(response.filesUploaded[0].url);
    },
  };
  return (
    <div>
      <label>{label}</label>
      <div className="grid-x grid-padding-x align-center">
        {(value && preview) &&
          <div className="cell text-center">
            <img
              className="render-image"
              alt="uploaded"
              width="100%"
              src={value}
            />
          </div>
        }
        <div className="cell">
          <ReactFilestack
            {...fileStackProps}
            options={options || {
              imageMax: [2400, 2400],
              imageMin: [800, 800],
            }}
          />
        </div>
      </div>
    </div>
  );
};

FileStackField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  label: PropTypes.string,
  options: PropTypes.shape({}),
  preview: PropTypes.bool,
};

FileStackField.defaultProps = {
  label: '',
  options: null,
  preview: true,
};
export default FileStackField;
