const {readAll, getWordId} = require('../model/readAllFiles')
const {frequency} = require('../model/frequencyScore')
const {normalizeBig, normalizeSmall} = require('../model/normalize')
const {documentLocation} = require('../model/documentLocation')

const query = (query) => {
  let scores = []
  const pageObject = readAll()
  const qws = query.map(qw => {
    return getWordId(qw)
  })

  pageObject.forEach(p => {
    scores.push({url: p.url, totalScore: 0, wFscore: frequency(p, qws), dLscore: documentLocation(p, qws)})
  })

  let wFscoresNormalized = normalizeBig(scores.map(xs => xs.wFscore))
  for (let i = 0; i < wFscoresNormalized.length; i++) {
    scores[i].wFscore = wFscoresNormalized[i]
  }
  let dLscoresNormalized = normalizeSmall(scores.map(xs => xs.dLscore))
  for (let i = 0; i < dLscoresNormalized.length; i++) {
    scores[i].dLscore = dLscoresNormalized[i]
  }
  scores.forEach(score => {
    score.totalScore = score.wFscore + 0.8 * score.dLscore
  })

  let sorted = scores.sort((a, b) => parseFloat(a.totalScore) - parseFloat(b.totalScore))
  let top5 = sorted.slice(sorted.length - 5, sorted.length)

  return top5

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
