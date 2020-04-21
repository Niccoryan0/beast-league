// This will actually take inputs from the user, will get info from gameplay.js and pass it through necessary logic
// var userMonster = JSON.parse(localStorage.getItem('userMonster'));

function userAttack(event){
  if (event.keyCode === 97 || event.keyCode === 49) {
    game.executeTurn(0);
  }else if (event.keyCode === 98 || event.keyCode === 50) {
    game.executeTurn(1);
  }
}

document.addEventListener('keyDown', userAttack);


// Status effects functions, start with buffs and debuffs, but grow out to include other kinds like DoTs, freezing, stun.
