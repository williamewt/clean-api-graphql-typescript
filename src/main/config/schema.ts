import { buildSchema } from 'graphql'

export default buildSchema(`
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
    deleteCategory(id: ID!): Boolean

    createAuthor(name: String!): Author,
    updateAuthor(id: ID!, name: String): Author,
    deleteAuthor(id: ID!): Boolean,

    createBook(name: String!, category_id: Int, author_id: Int): Book,
    updateBook(id: ID!, name: String, category_id: Int, author_id: Int): Book,
    deleteBook(id: ID!): Boolean
  }
`)