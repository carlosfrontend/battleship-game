const Ship = (health) => {
  let damage = 0;
  let currentHealth = health;

  const hasSunk = () => damage === health;

  const hit = () => {
    
    let msg = '';

    if (!hasSunk()) {
      damage += 1;
      currentHealth -= 1;
      return hasSunk();
    }

    msg += 'The ship you are trying to hit has already sank.';

    return msg;
  };

  return {
    get health() {
      return currentHealth;
    },
    get damage() {
      return damage;
    },
    hasSunk,
    hit,
  };
};

export default Ship;
