
const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

// middleware
app.use('/graphql', graphqlHTTP({

}));

// TODO: fix this hardcoded port
app.listen(4000, () => {
  console.log('Now listening for requests on port 4000');

});