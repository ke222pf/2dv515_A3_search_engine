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
    score.totalScore = score.wFscore + (score.dLscore * 0.8)
    score.dLscore = score.dLscore * 0.8
  })

  let sorted = scores.sort((a, b) => parseFloat(a.totalScore) - parseFloat(b.totalScore))
  let top5 = sorted.slice(sorted.length - 5, sorted.length).reverse()

  return top5
}

module.exports = {
  query
}
