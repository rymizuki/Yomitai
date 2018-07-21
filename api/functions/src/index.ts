import { https } from 'firebase-functions'
import app from './app'

const api = https.onRequest(app)

export { api }