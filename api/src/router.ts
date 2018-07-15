import Router from 'koa-router'
import { BookFinder } from './domain/entities/book-finder';
import { BooksRepository } from './infra/repositories/books';

const router = new Router()

router.get('/api/', (ctx) => {
  ctx.body = { message: 'hello world'}
})

router.get('/api/books', async (ctx) => {
  const { field, keyword } = ctx.query

  const finder = new BookFinder(new BooksRepository())
  const books = await finder.find(field, keyword)

  ctx.body = {
    rows: books
  }
})

export default router
