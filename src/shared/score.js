/**
 * Calculate the score from votes
 * @param  {Object} votes Vote object with user.uid:vote signature
 * @return {Integer}      Calculated score
 */
export default function (votes) {
  const keys = Object.keys(votes);
  if (keys.length === 0) return 0;
  
  return keys.reduce((keyA, keyB) => {
    const a = (keyA !== 0) ? parseInt(votes[keyA]) : keyA;
    return a + parseInt(votes[keyB]);
  }, 0);
};