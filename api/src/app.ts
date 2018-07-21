import express from 'express'
import logger from 'morgan'
import router from './router'

const app = express()

app.use(logger('dev', { immediate: true }))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.listen(3000)

console.log('listen')

