import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';

const getBooksQuery = gql`
{
  books{
    name
    id
  }
}
`

class BookList extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <ul id="book-list">
          <li>book name here</li>
        </ul>
      </div>
    );
  }
}

// stored in component's props
export default graphql(getBooksQuery)(BookList);
