import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MemberListItem from '../listItem/memberListItem';
// import Icon from './../../../common/components/icon/icon';
import SectionHeader from '../../../common/components/header/sectionHeader';
import Button from '../../../common/components/button/button';
import Icon from '../../../common/components/icon/icon';

class MembersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      activeChapterUuid: '',
    };

    this.onChange = this.onChange.bind(this);
    this.chapterActive = this.chapterActive.bind(this);
    this.emptySearch = this.emptySearch.bind(this);
    this.allMembers = this.allMembers.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  allMembers() {
    window.location = this.props.development ? 'http://localhost:3000/members' : 'http://bayareabrewersguild.floc.beer/members';
  }

  chapterActive(uuid) {
    this.setState({
      activeChapterUuid: uuid,
    });
  }

  emptySearch() {
    this.setState({
      searchText: '',
    });
  }

  render() {
    const { searchText } = this.state;
    const { members, chapters, currentChapter } = this.props;
    const filteredMembers = members
      .filter(member => (
        member.name.toLowerCase().includes(searchText.toLowerCase().trim())
      ))
      .filter(member => (
        !this.state.activeChapterUuid || member.chapterUuid === this.state.activeChapterUuid
      ));
    return (
      <section className="members-list-section">
        <div className="container">

          <div className="grid">
            <div className="item">
              <SectionHeader
                title={currentChapter ? 'Chapter Breweries' : 'Guild Breweries'}
                icon="beer"
                description={`${filteredMembers.length} Breweries Found`}
                centered
              />
            </div>
          </div>

          <div className="members-list-filter">
            {currentChapter && // ul for when current chapter exists
              <ul className="chapter-names horizontal">\
                <li
                  className="chapter"
                  key={currentChapter._id}
                >
                  {currentChapter.name.toUpperCase()}
                </li>
                <Button
                  title="See all guild breweries"
                  onClick={this.allMembers}
                  containerClass="outlined gray small"
                  icon="anchor"
                />
              </ul>
            }
            {// ul for when current chapter does not exist
              !currentChapter &&
              <ul className="chapter-names horizontal">
                {// Map though all chapters
                  chapters.map(chapter => (
                    <li
                      className={this.state.activeChapterUuid === chapter.uuid ? 'active chapter' : 'chapter'}
                      key={chapter._id}
                      onClick={() => this.chapterActive(chapter.uuid)}
                    >
                      {chapter.name.toUpperCase()}
                    </li>
                  ))}
                {// Clear chapter filter if chapter filter is active
                  this.state.activeChapterUuid ?
                    <Button
                      title="Clear Selection"
                      onClick={() => this.chapterActive('')}
                      containerClass="outlined gray small"
                      icon="times"
                    />
                  : null
                }
              </ul>
            }
            {/* <div className="filter-members-length">
              {filteredMembers.length} Breweries Found
            </div> */}

            <div className="input-group">
              <input
                className="input-group-field"
                type="text"
                name="searchText"
                onChange={this.onChange}
                value={this.state.searchText}
                placeholder="Search"
                aria-label="Event Search"
              />

              <div className="input-group-button" onClick={this.emptySearch}>

                {this.state.searchText ?
                  <Icon icon="times" /> : <Icon icon="search" />
                }
              </div>

            </div>

          </div>

          <section className="members-list">
            {
              filteredMembers.length === 0 ? <h1>Nothing Found</h1> :
              filteredMembers.sort((a, b) => {
                    const textA = a.name.toUpperCase();
                    const textB = b.name.toUpperCase();
                    if (textA < textB) {
                        return -1;
                      } else if (textA > textB) {
                        return 1;
                      }
                        return 0;
                }).map(member => (

                  <MemberListItem member={member} />

              ))
            }
          </section>

        </div>
      </section>
    );
  }
}

MembersList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({})),
  chapters: PropTypes.arrayOf(PropTypes.shape({})),
  currentChapter: PropTypes.shape({}),
  development: PropTypes.string,
};
MembersList.defaultProps = {
  members: [],
  chapters: [],
  currentChapter: null,
  development: null,
};
export default connect(
  state => ({
    currentChapter: state.currentChapter,
    development: state.development,
  }),
  null,
  null,
  { pure: false },
)(MembersList);
