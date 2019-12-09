const normalizeSmall = (scores) => {
  let normalized = []
  let minVal = Math.min(...scores)

  scores.forEach(score => {
    normalized.push(minVal / score)
  })
  return normalized
}

const normalizeBig = (scores) => {
  let normalized = []
  let maxVal = Math.max(...scores)
  // To avoid division by zero
  if (maxVal === 0) {
    maxVal = 0.00001
  }
  // When we have a max value, divide all scores by it
  scores.forEach(score => {
    normalized.push(score = score / maxVal)
  })
  return normalized
}

module.exports = {
  normalizeBig,
  normalizeSmall
}
