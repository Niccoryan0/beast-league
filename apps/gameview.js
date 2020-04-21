// This will be the render data for the game, sprites, etc.
'use strict';
// TODO: Maybe get userMonster from localStorage, talk to Bade about file order

<<<<<<< HEAD
var userImgPath = userMonster.imgSrc; // CHECK THIS LINE WITH BADE!!!


// TODO: Pull monster from local storage for user monster
=======
var userImgSrc = userMonster.imgSrc; // CHECK THIS LINE WITH BADE!!!

// TODO: Pull monster from local storage for user monster


function renderUserSpriteHomepage(){
  var target = document.getElementById('picTray');

  var userImgEl = document.createElement('img');
  userImgEl.src = userimgSrc;
  userImgEl.height = 80;
  target.appendChild(userImgEl);
>>>>>>> 4690e26bf0e45419497dc11e82b410f5d81c4561


function renderBattleSprites(enemy){
  // THIS IS TO RENDER THE USERS SPRITE FIRST
  var userTarget = document.getElementById('userBattlePosition');
<<<<<<< HEAD
  var userImgSrc = userMonster.imgSrc; // CHECK THIS LINE WITH BADE!!!
=======
>>>>>>> 4690e26bf0e45419497dc11e82b410f5d81c4561
  var userImgEl = document.createElement('img');
  userImgEl.src = userImgSrc;
  userImgEl.height = 80;
  userTarget.appendChild(userImgEl);

  // THIS RENDERS THE ENEMY SPRITE
  var enemyTarget = document.getElementById('enemyBattlePosition');
  var enemyMonsterImg = document.createElement('img');
<<<<<<< HEAD
  enemyMonsterImg.src = enemy.imgSrc; // CHECK THIS WITH BADE, WILL ENEMY MONSTER BE DEFINED?
=======
  enemyMonsterImg.src = enemyMonster.imgSrc; // CHECK THIS WITH BADE, WILL ENEMY MONSTER BE DEFINED?
>>>>>>> 4690e26bf0e45419497dc11e82b410f5d81c4561
  enemyMonsterImg.height = 80;
  enemyTarget.appendChild(enemyMonsterImg);
}

// Function that swaps static image with an animated image w/ function attached for new event listener checking for animation end, removes the event listener and checks the render queue for more jobs

// End of render queue needs to spawn in the abilities to the screen, it could check then whether combat needs to end and if so end before abilities are rendered.

function shakeImage(img){
  img.id = '';
  img.id = 'shakeyImg';
}
