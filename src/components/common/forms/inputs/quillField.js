import React from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';


class QuillField extends React.Component {
  imageHandler = (image, callback) => {
    const range = this.quillRef.getEditor().getSelection();
    const value = prompt('What is the image URL');
    this.quillRef.getEditor().insertEmbed(range.index, 'image', value);
  }
  render() {
    const {
      label,
      containerClass,
      input,
      height,
    } = this.props;

    const modules = {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video', 'fullImage'],
          ['clean'],
        ],
        handlers: {
          image: this.imageHandler,
          fullImage: this.imageHandler,
        },
      },
    };
    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link',
    ];
    return (
        <div className={containerClass}>
            <div>{label}</div>
            <ReactQuill
                style={{
                  height,
                  paddingBottom: '60px',
                  marginBottom: '42px',
                }}
                modules={modules}
                formats={formats}
                value={input.value}
                onChange={input.onChange}
                ref={(el) => { this.quillRef = el; }}
            />
        </div>
    );
  }
}
QuillField.propTypes = {
  label: PropTypes.string,
  containerClass: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  height: PropTypes.string,
};

QuillField.defaultProps = {
  label: '',
  containerClass: '',
  height: '350px',
};
  

export default QuillField