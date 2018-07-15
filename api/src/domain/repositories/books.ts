import { TBooks } from '../entities/book-finder'

export interface IBooksRepository {
  searchByAuthor(keyword: string): Promise<TBooks>
}
