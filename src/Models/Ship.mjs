const Ship = (len) => {
  let sunk = false;
  let hits = 0;
 
  const getNumberOfHits = () => hits;
 
  const isSunk = () => {
    if (hits >= len) {
      sunk = true;
      return sunk;
    }
    return sunk;
  };

  const hit = () => {
    // Only can hit if the ship not is sunk
    if(!sunk){
      hits += 1;
      return isSunk();
    }
    return isSunk();
  };
 
  return { len, hit, getNumberOfHits, isSunk };
};

export default Ship;
