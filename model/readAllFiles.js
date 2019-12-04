const fs = require('fs')
const pPath = './model/wikipedia/Words/Programming'
const gPath = './model/wikipedia/Words/Games'

let id = 0;
let wo = {}

const getWordId = (word) => {
  if(wo[word]) return wo[word]
  else {
    wo[word] = id++
    return id
  }
}

const read = (path) =>
  fs.readdirSync(path)
    .map(file => ({
      url: `wikipedia.org/wiki/${file}`,
      words: fs.readFileSync(path + `/${file}`, 'utf-8')
        .replace(/[()]/g, '')
        .split(' ')
        .map(getWordId)
    }))

const readAll = () => read(pPath).concat(read(gPath))

module.exports = {
  readAll,
  getWordId
}
