
module.exports = (server) => {
  server.get('/', async (req, res) => {
    res.json({hello: 'world'})
  })
}
