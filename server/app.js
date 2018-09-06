const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://user:test123@ds247852.mlab.com:47852/gql-ninja', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

// middleware
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// TODO: fix this hardcoded port
app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');
});