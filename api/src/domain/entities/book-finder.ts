import { IBooksRepository } from "../repositories/books"
import { TPeriodCategory } from "../../interface/period";

export type TBookFinderCategory = 'any' | 'author' | 'title'
export type TBook = {
  title: string,
  author: Array<string>,
  publicationDate: string,
  url: string,
  images: null | {
    thumbnail: {
      url: string,
      width: number,
      height: number,
    }
  }
}
export type TBooks = Array<TBook>

export class BookFinder {
  private booksRepository: IBooksRepository
  constructor (booksRepository: IBooksRepository) {
    this.booksRepository = booksRepository
  }
  async find (category: TBookFinderCategory, keyword: string, period_category: TPeriodCategory) {
    if (category == 'author') {
      return this.booksRepository.searchByAuthor(keyword, period_category)
    } else if (category == 'title') {
      return this.booksRepository.searchByTitle(keyword, period_category)
    } else {
      return this.booksRepository.search(keyword, period_category)
    }
  }
}

