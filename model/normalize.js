// const normalizeSmall = (scores, smallIsBetter) => {
//   if (smallIsBetter)
//   //Smaller values shall be inverted to higher values
//   //and scaled between 0 and 1
//   //Find min value in the array
//   double min_val = Min(scores)
//   //Divide the min value by the score
//   //(and avoid division by zero)
//   for (i = 0 to scores.length())
//   scores[i] = min_val / Max(scores[i], 0.00001)
// }
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
    normalizeBig
  }
