import express from 'express'
import { BookFinder } from './domain/entities/book-finder';
import { BooksRepository } from './infra/repositories/books';
import { TBook } from './types';
import { SeriesRegistrar } from './domain/entities/series-registrar';
import { SeriesRepository } from './infra/repositories/series';

const router = express.Router()

router.get('/api/', (_req, res) => {
  res.json({ message: 'hello world'})
})

router.get('/api/books', async (req, res) => {
  const { field, keyword, period } = req.query
  console.log('book', field, keyword, period)

  try {
    const finder = new BookFinder(new BooksRepository())
    const books = await finder.find(field, keyword, period)

    res.json({
      rows: books
    })
  } catch (error) {
    console.error(error)
    if (error.message) {
      res.json({ error: error.message })
    } else {
      res.json({ error })
    }
  }
})

router.post('/api/series', async (req, res) => {
  const { book } = req.body

  console.log('body', book)

  if (!book) {
    res.send(401)
  } else {
    try {
      const registrar = new SeriesRegistrar(new SeriesRepository())
      await registrar.register(book as TBook)

      res.json({ book })
    } catch (error) {
      res.json({ error })
    }
  }
})

router.get('/api/series', async (_req, res) => {
  try {
    const repos = new SeriesRepository()
    const rows = await repos.search()

    res.json({ rows })
  } catch (error) {
    res.json({ error })
  }
})

export default router
