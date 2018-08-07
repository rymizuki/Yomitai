import express from 'express'
import morgan from 'morgan'
import router from './router'

const app = express()

app.use(morgan('dev', { immediate: true }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

export default app
