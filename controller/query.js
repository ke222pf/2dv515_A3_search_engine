const {readAll, getWordId} = require('../model/readAllFiles')
const {frequency} = require('../model/frequencyScore')
const {normalizeBig} = require('../model/normalize')

const query = (query) => {
  let scores = []
  const pageObject = readAll()
  const qws = query.map(qw => {
    return getWordId(qw)
  })

  pageObject.forEach(p => {
    scores.push({url: p.url, score: frequency(p, qws)})
  })
  // let scoresArr = Object.values(scores.score)

  let scoresNormalized = normalizeBig(scores.map(xs => xs.score))
  for (let i = 0; i < scoresNormalized.length; i++) {
    scores[i].score = scoresNormalized[i]
  }

  let sorted = scores.sort((a, b) => parseFloat(a.score) - parseFloat(b.score))
  let top5 = sorted.slice(sorted.length - 5, sorted.length)
  console.log(top5)

// //Normalize scores
// normalize(scores.content, false)
// normalize(scores.location, true)
// //Generate result list
// for (i = 0 to pagedb.noPages())
// Page p = pagedb.get(i)
// //Only include results where the word appears at least once
// for (scores.content[i] > 0)
// //Calculate sum of weighted scores
// double score = 1.0 * scores.content[i] + 0.5 *
// scores.location[i]
// result.add(Score(p, score))
// //Sort result list with highest score first
// sort(result)
// Return result
}
module.exports = {
  query
}
