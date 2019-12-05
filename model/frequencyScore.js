const frequency = (p, qws) => {
  let score = 0
  qws.forEach(qw => {
    p.words.forEach(word => {
      if (word === qw) {
        score++
      }
    })
  })

  return score
}

module.exports = {
  frequency
}
