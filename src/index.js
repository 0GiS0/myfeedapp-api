const { ApolloServer, PubSub } = require('apollo-server');
const { MongoClient } = require('mongodb');

//1. Schema
const typeDefs = require('./schema');

//2. Resolvers
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const pubsub = new PubSub();

const resolvers = {
    Query,
    Mutation,
    Subscription
};

//3. MongoDB
//new mongodb: docker run --name mongodb -d -p 27017:27017 mongo
//existing mongo: docker start mongodb
MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function (err, client) {
    if (err)
        throw err;

    console.log("Connected successfully to MongoDB");

    const db = client.db('realfoodingdb');

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: {
            Products: db.collection('products'),
            pubsub
        }
    });

    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    });
});