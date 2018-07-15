import { IBooksRepository } from "../repositories/books";

export type TBookFinderCategory = 'author' | 'title'
export type TBook = {
  title: string,
  author: Array<string>,
  publicationDate: string,
  url: string,
}
export type TBooks = Array<TBook>

export class BookFinder {
  private booksRepository: IBooksRepository
  constructor (booksRepository: IBooksRepository) {
    this.booksRepository = booksRepository
  }
  async find (category: TBookFinderCategory, keyword: string) {
    if (category == 'author') {
      return this.booksRepository.searchByAuthor(keyword)
    } else {
      throw new Error(`Not exists support category "${ category }"`)
    }
  }
}

