const Ship = (len) => {
  let sunk = false;
  let hits = 0;
 
  const getNumberOfHints = () => hits;
  const giveAHit = () => {
    hits += 1;
    return hits;
  };

  const isSunk = () => {
    if (len === hits) {
      sunk = true;
      return sunk;
    }
    return sunk;
  };
 
  return { len, giveAHit, getNumberOfHints, isSunk };
};

export default Ship;
