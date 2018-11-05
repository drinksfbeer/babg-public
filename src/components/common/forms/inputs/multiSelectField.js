import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

/*
  This Component will allow you to output an array of strings based on the available options provided through the options prop
*/
class MultiSelectField extends React.Component {
  state = {
    active: false,
    selectedItems: [],
  }
  componentDidMount() {
    this.prepopulateField();
  }
  prepopulateField() {
    const { value } = this.props.input;
    if (value) {
      this.setState({ selectedItems: value });
    }
  }
  handleClickOutside() {
    const { input } = this.props;
    const { selectedItems } = this.state;
    this.setState({ active: false });
    input.onChange(selectedItems);
    if (this.dropDown) {
      this.dropDown.scrollTop = 0;
    }
  }

  render() {
    const {
      label,
      options,
      placeholder,
      optionStyle = {},
      lastOptionStyle = {},
      containerClass = '',
      containerStyle = {},
      meta: { touched, error },
    } = this.props;
    const { active, selectedItems } = this.state;
    const numSelected = selectedItems.length;
    const placeholderLabel = numSelected > 0 ? `${numSelected} items selected` : (placeholder || label)
    return (
      <div
        className={containerClass}
        style={{
          // margin: '20px',
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
        <div
          style={{
            position: 'relative',
            height: '40px',
          }}
        >
          <div
            ref={(ref) => { this.dropDown = ref; }}
            style={{
              zIndex: '10',
              borderRadius: '3px',
              padding: '8px',
              height: active ? '200px' : '40px',
              backgroundColor: 'white',
              transition: 'all 0.3s',
              boxShadow: active ? '0px 2px 10px rgba(0,0,0,0.08)' : 'rgba(10, 10, 10, 0.1) 0px 1px 2px inset',
              border: 'solid rgba(0,0,0,0.2) 1px',
              position: 'absolute',
              overflowX: 'hidden',
              width: '100%',
              overflowY: active ? 'scroll' : 'hidden',
            }}
          >
            <div onClick={() => this.setState({ active: !active })}>
              <div
                style={{
                  color: 'rgba(0,0,0,0.6)',
                  paddingBottom: '25px',
                  cursor: 'pointer',
                  height: '25px',
                }}
              >
                {active ? 'close this dropdown' : placeholderLabel }
              </div>
            </div>
            {options.map((option, i) => {
              const isActive = selectedItems.includes(option.value);

              return (
                <div
                  style={{
                    ...optionStyle,
                    ...(i === options.length - 1 ? lastOptionStyle : {}),
                    backgroundColor: isActive ? '#222' : 'white',
                    color: isActive ? 'white' : '#222',
                    cursor: 'pointer',
                    padding: '3px',
                    borderRadius: '1px',
                    paddingLeft: '4px',
                  }}
                  key={option.value}
                  value={option.value}
                  onClick={() => {
                    const newSelectedItems = isActive ? (
                      selectedItems.filter(item => item !== option.value)
                    ) : (
                      selectedItems.concat(option.value)
                    );
                    this.setState({ selectedItems: newSelectedItems });
                  }}
                >
                  {option.title || options.value}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

MultiSelectField.defaultProps = {
  placeholder: '',
  optionStyle: {},
  lastOptionStyle: {},
  containerClass: '',
  containerStyle: {},
  meta: {
    touched: false,
    error: '',
  },
};


MultiSelectField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
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
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};
export default onClickOutside(MultiSelectField);
