import Koa from 'koa'
import logger from 'koa-logger'
import router from './router'
import bodyParser from 'koa-bodyparser'

const app = new Koa()

app.use(logger())

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)

console.log('listen')
