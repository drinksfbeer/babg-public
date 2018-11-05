import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../../common/components/icon/icon';
import MapListItem from '../mapListItem/mapListItem';

class MapLocationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.onChange = this.onChange.bind(this);
    this.emptySearch = this.emptySearch.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  emptySearch() {
    this.setState({
      searchText: '',
    });
  }

  render() {
    const { locations } = this.props;
    const filteredLocations = locations.filter(location =>
      location.name.includes(this.state.searchText));
    return (
      <div>
        <div className="filterContainer">
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
        <div>
          {filteredLocations.map(location =>
            <MapListItem key={location._id} location={location} />)
          }
        </div>
      </div>
    );
  }
}

MapLocationsList.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({})),
};
MapLocationsList.defaultProps = {
  locations: [],
};
export default MapLocationsList;
