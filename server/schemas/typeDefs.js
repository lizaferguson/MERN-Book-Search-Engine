const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        _id: ID!
        authors: String
        description: String
        bookId: String!
        image: String
        link: String
        title: String
    }

    input savedBooks {
        authors: [String]
        description: String
        bookId: String
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
        deleteBook(bookId: ID!): User
    }
`;
module.exports = typeDefs;