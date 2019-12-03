const { readAll } = require('../model/readAllFiles')
module.exports = (server) => {
  server.get('/', async (req, res) => {
    const files = await readAll()
    res.json({hello: files})
  })
}
