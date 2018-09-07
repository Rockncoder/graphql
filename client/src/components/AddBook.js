import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getAuthorsQuery} from '../queries';

class AddBook extends Component {
  displayAuthors() {
    const data = this.props.data;
    if (data.loading) {
      return (<option>Loading...</option>);
    } else {
      return data.authors.map(author => {
        return (<option key={author.id} value={author.id}>{author.name}</option>);
      });
    }
  }

  render() {
    return (
      <form id="add-book">
        <div className="field">
          <label>Book Name:</label>
          <input type="text"/>
        </div>

        <div className="fields">
          <label>Genre:</label>
          <input type="text"/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

// stored in component's props
export default graphql(getAuthorsQuery)(AddBook);
