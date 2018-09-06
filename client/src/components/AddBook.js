import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getAuthorsQuery = gql`
{
  authors{
    name
    id
  }
}
`;

class AddBook extends Component {
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
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

// stored in component's props
export default graphql(getAuthorsQuery)(AddBook);