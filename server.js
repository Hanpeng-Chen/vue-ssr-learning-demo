const server = require('express')()
const Vue = require('vue')
const fs = require('fs')
const createApp = require('./src/app')

const Renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./src/index.template.html', 'utf-8')
})

server.get('*', (req, res) => {

  const params = { url: req.url }
  const app = createApp(params)

  const context = {
    title: 'SSR Demo',
    metas: `
      <meta name="keyword" content="vue,ssr">
      <meta name="description" content="vue srr demo">
    `
  }

  Renderer.renderToString(app, context, (err, html) => {
    if (err) {
      console.error(err)
      res.status(500).end('server error')
    }
    res.end(html)
  })
})

server.listen(8080)