import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class List extends Component {
  render() {
    const { obj } = this.props;
    const url = `/album/${obj.collectionId}`;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${obj.collectionId}` }
          to={ url }
        >
          <h2>
            Album:
            { obj.collectionName }
          </h2>
          <img src={ obj.artworkUrl100 } alt={ obj.collectionName } />
        </Link>
        <p>
          Nome:
          { obj.artistName }
        </p>
      </div>
    );
  }
}

List.propTypes = {
  obj: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};
export default List;
