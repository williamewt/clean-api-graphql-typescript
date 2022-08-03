import { gql } from 'apollo-server-express'

export default gql`
  type Category {
    id: ID,
    name: String,
  }

  type Author {
    id: ID,
    name: String,
  }

  type Book {
    id: ID,
    name: String,
    author: Author,
    category: Category
  }

  type Query {
    categories: [Category],
    getCategoryById(id: ID): Category

    authors: [Author],
    getAuthorById(id: ID): Author,

    books: [Book],
    getBookById(id: ID): Book
  }

  type Mutation {
    createCategory(name: String!): Category,
    updateCategory(id: ID!, name: String): Category,
    deleteCategory(id: ID!): Category

    createAuthor(name: String!): Author,
    updateAuthor(id: ID!, name: String): Author,
    deleteAuthor(id: ID!): Author,

    createBook(name: String!, categoryId: Int, authorId: Int): Book,
    updateBook(id: ID!, name: String, categoryId: Int, authorId: Int): Book,
    deleteBook(id: ID!): Book
  }
`
