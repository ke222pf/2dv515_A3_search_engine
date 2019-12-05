const { readAll } = require('../model/readAllFiles')
const {query} = require('../controller/query')
module.exports = (server) => {
  server.post('/', async (req, res) => {
    console.log(req.body.query)
    const searched = req.body.query
    const searchedArray = searched.split(' ')
    console.log(searchedArray)
    const result = query(searchedArray)
    res.json({hello: result})
  })
  server.get('/', async (req, res) => {
    const files = await readAll()
    res.json({hello: files})
  })
}
