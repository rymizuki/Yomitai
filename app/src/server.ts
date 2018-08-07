import awsServerlessExpress from 'aws-serverless-express'
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'
import app from './app'

declare var __DEV__: boolean

let server;
if (__DEV__) {
  const port = Number(process.env.PORT || '3000')
  const host = process.env.HOST || '0.0.0.0'
  app.listen(port, host, () => {
    console.log('> in development server')
    console.log(`> listening on http://${ host }:${ port }`)
  })
} else {
  app.use(awsServerlessExpressMiddleware.eventContext)
  server = awsServerlessExpress.createServer(app)
}

export function render(event, context) {
  awsServerlessExpress.proxy(server, event, context)
}
