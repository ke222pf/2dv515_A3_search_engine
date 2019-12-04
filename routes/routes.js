const { readAll, getWordId } = require('../model/readAllFiles')
module.exports = (server) => {
  server.get('/:word', async (req, res) => {
    const searched = req.params.word
    const files = await readAll()
    const wordId = getWordId(searched)
    res.json({hello: wordId})
  })
  server.get('/', async (req, res) => {
    const files = await readAll()
    res.json({hello: files})
  })
}
