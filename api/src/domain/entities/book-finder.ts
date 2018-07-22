import { IBooksRepository } from "../repositories/books"
import { TPeriodCategory } from "../../interface/period";
import { TBookFinderCategory } from '../../types'

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

