import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries';

class BookList extends Component {
  displayBooks() {
    const data = this.props.data;
    console.log(data);
    if (data.loading) {
      return (<div>Loading...</div>);
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id}>{book.name}</li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
      </div>
    );
  }
}

// stored in component's props
export default graphql(getBooksQuery)(BookList);
