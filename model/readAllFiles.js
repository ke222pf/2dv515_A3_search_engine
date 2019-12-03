const fs = require('fs')
const pPath = './model/wikipedia/Words/Programming'
const gPath = './model/wikipedia/Words/Games'

const getWordId = (word) => {

}

const read = (path) =>
  fs.readdirSync(path)
    .map(file => ({
      url: `wiki/${file}`,
      words: fs.readFileSync(path + `/${file}`, 'utf-8')
        .replace(/[()]/g, '')
        .split(' ')
        .map(getWordId)
    }))

const readAll = () => read(pPath).concat(read(gPath))

module.exports = {
  readAll
}
