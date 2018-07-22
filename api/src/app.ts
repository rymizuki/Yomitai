import express from 'express'
import morgan from 'morgan'
import router from './router'

const app = express()

app.use(morgan('dev', { immediate: true }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(3000, () => {
  console.log('listen app server on 3000')
})

export default app