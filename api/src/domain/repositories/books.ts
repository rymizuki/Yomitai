import { TBooks } from '../entities/book-finder'

export interface IBooksRepository {
  search(keyword: string): Promise<TBooks>
  searchByAuthor(keyword: string): Promise<TBooks>
  searchByTitle(keyword: string): Promise<TBooks>
}