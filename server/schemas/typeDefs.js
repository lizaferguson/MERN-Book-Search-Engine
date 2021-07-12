const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        bookId: String! 
        authors: String
        description: String
        image: String
        link: String
        title: String
    }

    input savedBooks {
        bookId: String 
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }
    
    type Query {
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, email: String!, password: String!): Auth
        saveBook(input: savedBooks!): User
        removeBook(bookId: ID!): User
    }
`;
module.exports = typeDefs;