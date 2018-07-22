import Router from 'koa-router'
import { BookFinder } from './domain/entities/book-finder';
import { BooksRepository } from './infra/repositories/books';
import { TBook } from './types';
import { SeriesRegistrar } from './domain/entities/series-registrar';
import { SeriesRepository } from './infra/repositories/series';

const router = new Router()

router.get('/api/', (ctx) => {
  ctx.body = { message: 'hello world'}
})

router.get('/api/books', async (ctx) => {
  const { field, keyword, period } = ctx.query
  console.log('book', field, keyword, period)

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

router.post('/api/series', async (ctx) => {
  const { book } = ctx.request.body as any

  console.log('body', book)

  if (!book) {
    ctx.body = {}
  } else {
    try {
      const registrar = new SeriesRegistrar(new SeriesRepository())
      await registrar.register(book as TBook)

      ctx.body = { book }
    } catch (error) {
      ctx.body = { error }
    }
  }
})

router.get('/api/series', async (ctx) => {
  try {
    const repos = new SeriesRepository()
    const rows = await repos.search()

    ctx.body = { rows }
  } catch (error) {
    ctx.body = { error }
  }
})

export default router
