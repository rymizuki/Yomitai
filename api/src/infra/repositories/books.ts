import { IBooksRepository } from '../../domain/repositories/books';
import { TBooks } from '../../domain/entities/book-finder';
import { APACClient } from '../../helpers/apac-client';

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
  async searchByAuthor (keyword: string): Promise<TBooks> {
    return await this.client.searchBooks({
      author: keyword,
    })
  }
  async searchByTitle (keyword: string): Promise<TBooks> {
    return await this.client.searchBooks({
      title: keyword,
    })
  }
}