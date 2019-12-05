const { readAll, getWordId } = require('../model/readAllFiles')
const {query} = require('../controller/query')
module.exports = (server) => {
  server.post('/', async (req, res) => {
    const searched = req.body.query
    console.log(searched)
    const searchedArray = searched.split(' ')
    console.log(searchedArray)
    query(searchedArray)
    res.json({hello: 'world'})
  })
  server.get('/', async (req, res) => {
    const files = await readAll()
    res.json({hello: files})
  })
}
