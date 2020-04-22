// This is just an event listener that will call executeTurn passing in a value corresponding to the key pressed by the player

function userAttack(event){
  if (event.keyCode === 97 || event.keyCode === 49) {
    game.executeTurn(0);
  }else if (event.keyCode === 98 || event.keyCode === 50) {
    game.executeTurn(1);
  }
}

document.addEventListener('keyDown', userAttack);

// Status effects functions, start with buffs and debuffs, but grow out to include other kinds like DoTs, freezing, stun.

