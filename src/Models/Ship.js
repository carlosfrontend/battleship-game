const Ship = (len) => {
  let sunk = false;
  let hits = 0;
 
  const getNumberOfHits = () => hits;
  const hit = () => {
    hits += 1;
  };

  const isSunk = () => {
    if (len === hits) {
      sunk = true;
      return sunk;
    }
    return sunk;
  };
 
  return { len, hit, getNumberOfHits, isSunk };
};

export default Ship;
