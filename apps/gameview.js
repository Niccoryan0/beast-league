// This will be the render data for the game, sprites, etc.
'use strict';
// TODO: Maybe get userMonster from localStorage, talk to Bade about file order

var renderQueue = [];
var abilityTrayDiv = document.getElementById('abilityTrayDiv');



// Renders the two sprites for battle to the page
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

// Bade please explain this in better detail than I
// This is essentially a queue that paces out and calls the correct animations at the correct times, images and the "animation string" are parameters indicating which image is moving and how they will be moving, currently only one string availble, "shake"
function RenderQueueEntry (imgEl, animateString, dialogueEntry){
  this.imgEl = imgEl;
  this.animateString = animateString;
  this.dialogueEntry = dialogueEntry;
}

// This is used to remove event listeners that trigger the animations
function clearAnimation (event){
  event.target.className = '';
  void event.target.offsetWidth;
  event.target.removeEventListener('animationend', clearAnimation);
  event.target.removeEventListener('animationcancel', clearAnimation);
  renderTurn();
}

// Renders the animations for a turn
function renderTurn(){
  console.log(renderQueue);
  if(renderQueue.length){
    // Pops entries from the renderQueue to address them and render them one at a time
    var nextEntry = renderQueue.pop(0);
    nextEntry.imgEl.addEventListener('animationend', clearAnimation);
    nextEntry.imgEl.addEventListener('animationcancel', clearAnimation);
    // Actually animate the item with the img and string passed in
    animateEffect(nextEntry.imgEl, nextEntry.animateString);
    // Check for game over and if so set monster to local storage and send user back to homepage
  }else if(userMonster.currentHealth <= 0 || enemyMonster.currentHealth <= 0){
    endGameScreen();

  }else{
    // If there's nothing to render, and no one is dead yet, pop the ability tray back up on the screen
    enableAbilityTray();
  }
}



function disableAbilityTray (){
  document.removeEventListener('keydown', userAttack);
  abilityTrayDiv.innerHTML = '';
}

function enableAbilityTray (){
  var abilityTray = document.createElement('ul');
  abilityTrayDiv.appendChild(abilityTray);
  document.addEventListener('keydown', userAttack);
  var userMonsterAbilities = userMonster.monsterData.abilitySet; 
  for (var ab in userMonsterAbilities){
    var abilityEl = document.createElement('li');
    var abPlusOne = parseInt(ab)+1;
    abilityEl.textContent = abPlusOne + ' : ' + userMonsterAbilities[ab];
    abilityTray.appendChild(abilityEl);
  }
}

function animateEffect(imgEl, animateString){

  imgEl.className = animateString;
}



initializeCombat();

function endGameScreen(){
  var buttonOuterSection = document.getElementById('abilitiesAndDialogue');
  var userPosition = document.getElementById('userBattleContainer');
  var enemyPosition = document.getElementById('enemyBattleContainer');
  var abilityTray = document.getElementById('abilityTrayDiv');
  var dialogueTray = document.getElementById('dialogueTrayDiv');
  var buttonDiv = document.createElement('div');
  buttonDiv.id = 'endGameButtons';
  var homeButton = document.createElement('button');
  homeButton.id = 'homeButton';
  homeButton.textContent = 'Return to Homepage';
  userPosition.innerHTML = '';
  enemyPosition.innerHTML = '';
  abilityTray.innerHTML = '';
  dialogueTray.innerHTML = '';
  dialogueTray.style = 'width: 0';
  if (userMonster.currentHealth > 0 ){
    var userData = JSON.stringify(userMonster.monsterData);
    localStorage.setItem('userMonster', userData);
    var restartGameButton = document.createElement('button');
    restartGameButton.id = 'restartGameButton';
    restartGameButton.textContent = 'Start Another Round';
    buttonDiv.appendChild(restartGameButton);
    restartGameButton.addEventListener('click', function(){
      location.reload();
    });
  }
  homeButton.addEventListener('click', function(){
    window.location.replace('../index.html');
  });
  buttonDiv.appendChild(homeButton);
  buttonOuterSection.appendChild(buttonDiv);
}

var audioLoop = document.getElementById("audioLoop");
var isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    audioLoop.pause();
  } else {
    audioLoop.play();
  }
}
audioLoop.onplaying = function() {
  isPlaying = true;
};
audioLoop.onpause = function() {
  isPlaying = false;
};
