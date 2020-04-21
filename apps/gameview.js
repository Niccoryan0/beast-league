// This will be the render data for the game, sprites, etc.
'use strict';
// TODO: Maybe get userMonster from localStorage, talk to Bade about file order

var userImgPath = userMonster.imgPath; // CHECK THIS LINE WITH BADE!!!
var userImgEl = document.createElement('img');
userImgEl.src = userImgPath;
userImgEl.height = 80;

// TODO: Pull monster from local storage for user monster


function renderUserSpriteHomepage(){
  var target = document.getElementById('picTray');

  var userImgPath = userMonster.imgPath; // CHECK THIS LINE WITH BADE!!!
  var userImgEl = document.createElement('img');
  userImgEl.src = userImgPath;
  userImgEl.height = 80;
  target.appendChild(userImgEl);

  var userMonsterName = document.getElementById('userMonsterName');
  userMonsterName.textContent = 'Monster Name';
  var userMonsterStats = document.getElementById('userMonsterStats');
  userMonsterStats.textContent = 'MonsterStats';
}

function renderBattleSprites(){
  // THIS IS TO RENDER THE USERS SPRITE FIRST
  var userTarget = document.getElementById('userBattlePosition');
  var userImgPath = userMonster.imgPath; // CHECK THIS LINE WITH BADE!!!
  var userImgEl = document.createElement('img');
  userImgEl.src = userImgPath;
  userImgEl.height = 80;
  userTarget.appendChild(userImgEl);

  // THIS RENDERS THE ENEMY SPRITE
  var enemyTarget = document.getElementById('enemyBattlePosition');
  var enemyMonsterImg = document.createElement('img');
  enemyMonsterImg.src = enemyMonster.imgPath; // CHECK THIS WITH BADE, WILL ENEMY MONSTER BE DEFINED?
  enemyMonsterImg.height = 80;
  enemyTarget.appendChild(enemyMonsterImg);
}

// Function that swaps static image with an animated image w/ function attached for new event listener checking for animation end, removes the event listener and checks the render queue for more jobs

// End of render queue needs to spawn in the abilities to the screen, it could check then whether combat needs to end and if so end before abilities are rendered.

function shakeImage(img){
  img.id = '';
  img.id = 'shakeyImg';
}
