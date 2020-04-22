// This will be the render data for the game, sprites, etc.
'use strict';
// TODO: Maybe get userMonster from localStorage, talk to Bade about file order

var renderQueue = [];
var abilityTray = document.getElementById('abilityTray');




function renderBattleSprites(userImgSrc, enemyMonsterImgSrc){
  // THIS IS TO RENDER THE USERS SPRITE FIRST
  var userTarget = document.getElementById('userBattlePosition');
  var userImgEl = document.createElement('img');
  userImgEl.src = userImgSrc;
  userImgEl.height = 80;
  console.log(userMonster);
  userTarget.appendChild(userImgEl);
  console.log(userImgEl);
  userMonster.imgElement = userImgEl;

  // THIS RENDERS THE ENEMY SPRITE
  var enemyTarget = document.getElementById('enemyBattlePosition');
  var enemyMonsterImg = document.createElement('img');
  enemyMonsterImg.src = enemyMonsterImgSrc;
  enemyMonsterImg.height = 80;
  enemyTarget.appendChild(enemyMonsterImg);
  enemyMonster.imgElement = enemyMonsterImg;
}

function RenderQueueEntry (imgEl, animateString){
  this.imgEl = imgEl;
  this.animateString = animateString;
}


function clearAnimation (event){
  event.target.className = '';
  void event.target.offsetWidth;
  event.target.removeEventListener('animationend', clearAnimation);
  event.target.removeEventListener('animationcancel', clearAnimation);
  renderTurn();
}

function renderTurn(){
  console.log(renderQueue);
  if(renderQueue.length){
    var nextEntry = renderQueue.pop(0);
    nextEntry.imgEl.addEventListener('animationend', clearAnimation);
    nextEntry.imgEl.addEventListener('animationcancel', clearAnimation);
    animateEffect(nextEntry.imgEl, nextEntry.animateString);
  }else if(userMonster.currentHealth <= 0 || enemyMonster.currentHealth <= 0){
    var userData = JSON.stringify(userMonster.monsterData)
    localStorage.setItem('userMonster', userData);
    window.location.replace('../index.html');
  }else{
    enableAbilityTray();
  }
}


function disableAbilityTray (){
  document.removeEventListener('keydown', userAttack);
  abilityTray.innerHTML = '';
}

function enableAbilityTray (){
  document.addEventListener('keydown', userAttack);
  var userMonsterAbilities = userMonster.monsterData.abilitySet; 
  for (var ab in userMonsterAbilities){
    var abilityEl = document.createElement('li');
    abilityEl.textContent = userMonsterAbilities[ab];
    abilityTray.appendChild(abilityEl);
  }
}

function animateEffect(imgEl, animateString){
  imgEl.className = animateString;
}

initializeCombat();