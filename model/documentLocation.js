
const documentLocation = (p, qws) => {
  let score = 0
  qws.forEach(qw => {
    let wordIndex = p.words.indexOf(qw)
    if (wordIndex !== -1) {
      score += wordIndex + 1
    } else {
      score += 100000
    }
  })
  return score
}

module.exports = {
  documentLocation
}
