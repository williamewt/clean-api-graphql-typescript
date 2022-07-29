import {
  makeCreateCategoryController,
  makeCreateAuthorController,
  makeCreateBookController,
  makeUpdateCategoryController,
  makeUpdateAuthorController,
  makeUpdateBookController,
  makeDeleteCategoryController,
  makeDeleteAuthorController,
  makeDeleteBookController,
  makeGetAllCategoryController,
  makeGetAllAuthorController,
  makeGetAllBookController,
  makeGetOneByIdCategoryController,
  makeGetOneByIdAuthorController,
  makeGetOneByIdBookController
} from '@/main/factories/controllers'

export default {
  Query: {
    categories: makeGetAllCategoryController().handle,
    getCategoryById: makeGetOneByIdCategoryController().handle,

    authors: makeGetAllAuthorController().handle,
    getAuthorById: makeGetOneByIdAuthorController().handle,

    books: makeGetAllBookController().handle,
    getBookById: makeGetOneByIdBookController().handle
  },
  Mutation: {
    createCategory: makeCreateCategoryController().handle,
    updateCategory: makeUpdateCategoryController().handle,
    deleteCategory: makeDeleteCategoryController().handle,

    createAuthor: makeCreateAuthorController().handle,
    updateAuthor: makeUpdateAuthorController().handle,
    deleteAuthor: makeDeleteAuthorController().handle,

    createBook: makeCreateBookController().handle,
    updateBook: makeUpdateBookController().handle,
    deleteBook: makeDeleteBookController().handle
  }
}
