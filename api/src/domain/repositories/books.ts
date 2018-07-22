import { TBooks } from '../../types'
import { TPeriodCategory } from '../../interface/period';

export type TBooksRepositoryParamPeriod = 'all' | 'this_month' | 'this_year'
export type TBooksRepositoryParamField = 'any' | 'author' | 'title'

export interface IBooksRepository {
  search(keyword: string, period_category: TPeriodCategory): Promise<TBooks>
  search(field: string, keyword: string, period_category: TPeriodCategory): Promise<TBooks>
  searchByAuthor(keyword: string, period_category: TPeriodCategory): Promise<TBooks>
  searchByTitle(keyword: string, period_category: TPeriodCategory): Promise<TBooks>
}