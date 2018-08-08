import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import config from '../nuxt.config'
import api from './api'

declare var __DEV__: boolean;

config.mode = 'universal'
const nuxt = new Nuxt(config)

console.log(process.env.NODE_ENV)
console.log(config.dev)

if (__DEV__) {
  new Builder(nuxt).build()
}

const app = express()

app.use('/api', api)
app.use(nuxt.render)

export default app
