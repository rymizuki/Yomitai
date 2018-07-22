import moment from 'moment'
import { IBooksRepository, TBooksRepositoryParamField } from '../../domain/repositories/books';
import { TBooks } from '../../types';
import { APACClient, TAPACClientSearchBooksParams } from '../../helpers/apac-client';
import { TPeriodCategory } from '../../interface/period';

const associateTag = process.env.APAC_ACCESS_KEY || ''
const accessKeyId = process.env.APAC_ACCESS_KEY || ''
const accessSecretKey = process.env.APAC_ACCESS_SECRET_KEY || ''

export class BooksRepository implements IBooksRepository {
  private client: APACClient
  constructor () {
    this.client = new APACClient({
      associateTag,
      accessKeyId,
      accessSecretKey,
    })
  }
  async search (...args: any[]): Promise<TBooks> {
    const params = this.createSearchParam(args)
    return await this.client.searchBooks(params)
  }
  async searchByAuthor (keyword: string, period_category: TPeriodCategory): Promise<TBooks> {
    return await this.search('author', keyword, period_category)
  }
  async searchByTitle (keyword: string, period_category: TPeriodCategory): Promise<TBooks> {
    return await this.search('title', keyword, period_category)
  }
  private createSearchParam (args: any[]): TAPACClientSearchBooksParams {
    let field: TBooksRepositoryParamField | null = null
    let period_category: TPeriodCategory
    let keyword: string

    if (args.length == 2) {
      [keyword, period_category] = args
    } else {
      [field, keyword, period_category] = args
    }

    const params: TAPACClientSearchBooksParams = {}

    // set keyword
    if (field == null || field == 'any') {
      params.keyword = keyword
    } else {
      params[field] = keyword
    }

    // set period
    if (period_category != null && period_category != 'all') {
      const format_table = {
        this_month: 'MM-YYYY',
        this_year: 'YYYY'
      }
      params.period = moment().format(format_table[period_category])
    }

    return params
  }
}