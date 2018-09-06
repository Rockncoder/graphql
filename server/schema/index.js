const graphql = require('graphql');
const _ = require('lodash');
const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

const books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
  {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
  {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
  {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
  {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
  {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'},
];

const authors = [
  {name: 'Patrick Rothfuss', age: 44, id: '1'},
  {name: 'Brandon Sanderson', age: 42, id: '2'},
  {name: 'Terry Pratchett', age: 66, id: '3'}
];

// defines schema, relationships, and root queries

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    // 5n
    author: {
      type: AuthorType,
      // parent, args
      resolve(parent){
        // use console.log to see what the data looks like
        console.log(parent);
        return _.find(authors, {id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  // why is this wrapped in a function?
  // JS does a two passes
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent){
        return _.filter(books, {authorId: parent.id});
      }
    },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        console.log(typeof args.id);
        //args.id
        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return _.find(authors, {id: args.id});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      // parent, args
      resolve(){
        return books;
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery
});