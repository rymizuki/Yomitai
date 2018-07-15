import Router from 'koa-router'

const router = new Router()

router.get('/api/', (ctx) => {
  ctx.body = { message: 'hello world'}
})

export default router
