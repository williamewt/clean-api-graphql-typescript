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
import { adaptResolver } from '@/main/adapters'

export default {
  Query: {
    categories: adaptResolver(makeGetAllCategoryController()),
    getCategoryById: adaptResolver(makeGetOneByIdCategoryController()),

    authors: adaptResolver(makeGetAllAuthorController()),
    getAuthorById: adaptResolver(makeGetOneByIdAuthorController()),

    books: adaptResolver(makeGetAllBookController()),
    getBookById: adaptResolver(makeGetOneByIdBookController())
  },
  Mutation: {
    createCategory: adaptResolver(makeCreateCategoryController()),
    updateCategory: adaptResolver(makeUpdateCategoryController()),
    deleteCategory: adaptResolver(makeDeleteCategoryController()),

    createAuthor: adaptResolver(makeCreateAuthorController()),
    updateAuthor: adaptResolver(makeUpdateAuthorController()),
    deleteAuthor: adaptResolver(makeDeleteAuthorController()),

    createBook: adaptResolver(makeCreateBookController()),
    updateBook: adaptResolver(makeUpdateBookController()),
    deleteBook: adaptResolver(makeDeleteBookController())
  }
}
