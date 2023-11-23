const { gql } = require('apollo-server-express');

// typeDefs
const typeDefs = gql`
    type Book {
        bookID: ID
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]        
    }
    type Query {
        me: User
    }
    input SavedBook {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(book: SavedBook): User
        removeBook(bookId: String!): User
}
    type Auth {
        token: ID!
        user: User
        }
`;

// export the typeDefs
module.exports = typeDefs;