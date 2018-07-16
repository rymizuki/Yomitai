import Router from 'koa-router'
import { BookFinder } from './domain/entities/book-finder';
import { BooksRepository } from './infra/repositories/books';

const router = new Router()

router.get('/api/', (ctx) => {
  ctx.body = { message: 'hello world'}
})

router.get('/api/books', async (ctx) => {
  const { field, keyword, period } = ctx.query

  try {
    const finder = new BookFinder(new BooksRepository())
    const books = await finder.find(field, keyword, period)

    ctx.body = {
      rows: books
    }
  } catch (error) {
    console.error(error)
    if (error.message) {
      ctx.body = { error: error.message }
    } else {
      ctx.body = { error }
    }
  }
})

export default router
