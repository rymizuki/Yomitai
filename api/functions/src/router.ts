import { Router } from 'express'

import { BookFinder } from './domain/entities/book-finder';
import { BooksRepository } from './infra/repositories/books';

const router = Router()

router.get('/', (_req, res) => {
  res.json({ message: 'hello world'})
})

router.get('/books', async (req, res) => {
  const { field, keyword, period } = req.query

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

export default router
