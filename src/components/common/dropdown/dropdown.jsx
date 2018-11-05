import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from '../components/icon/icon';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };

    // this.toggleContent = this.toggleContent.bind(this);
  }

  toggleContent() {
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  render() {
    const { currentChapter, chapters, development } = this.props;

    const chapterColor = currentChapter && currentChapter.color ? currentChapter.color : '';


    return (
      <div className={`dropdown ${this.state.toggle ? 'active' : null}`}>
        <div
          className="drop-button"
          onClick={() => this.toggleContent()}
        >
          <div
            className="dropdown-title"
            style={{ color: `${chapterColor}` }}
          >
            {currentChapter ?
              (<div className="inside">{currentChapter.name}</div>)
            :
            (<div className="inside"><span className="choose">Choose</span><span className="chapter">Chapter</span></div>)
            }
          </div>
          <div
            className="dropdownToggle"
            style={{ color: `${chapterColor}` }}
          >
            <Icon icon={this.state.toggle ? 'angle-up' : 'angle-down'} />
          </div>


        </div>
        <ul className="dropdownContent">
          {chapters.map(chapter =>
            (
              <li className="dropdown-content-item" key={chapter.name}>
                <a
                  style={{ backgroundColor: `${chapter.color}` }}
                  href={development ? `http://${chapter.subdomain}.localhost:3000/` : `http://${chapter.subdomain}.bayareabrewersguild.floc.beer`}
                >
                  <Icon icon={chapter.icon} />
                  {chapter.name}
                </a>
              </li>
            ))}
        </ul>

      </div>
    );
  }
}

Dropdown.propTypes = {
  currentChapter: PropTypes.shape({}),
  chapters: PropTypes.arrayOf(PropTypes.shape({})),
  development: PropTypes.bool,
};

Dropdown.defaultProps = {
  currentChapter: {},
  chapters: [],
  development: true,
};

export default connect(
  state => ({
    currentChapter: state.currentChapter,
    chapters: state.chapters.list._list,
    development: state.development,
  }),
  null,
  null,
  { pure: false },
)(Dropdown);
