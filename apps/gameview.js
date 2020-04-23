// This will be the render data for the game, sprites, etc.
'use strict';

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

// Entry for renderQueue system
// >> Passes in image element to be animated and a string for the HTML class to be added to it
// >> HTML class has CSS code written for it to play an animation
function RenderQueueEntry (imgEl, animateString, dialogueEntry){
  this.imgEl = imgEl;
  this.animateString = animateString;
  this.dialogueEntry = dialogueEntry;
}

// Clears animation data from image element
// >> Calls renderTurn() to render the next entry in the renderQueue
function clearAnimation (event){
  event.target.className = '';
  void event.target.offsetWidth;
  event.target.removeEventListener('animationend', clearAnimation);
  event.target.removeEventListener('animationcancel', clearAnimation);
  renderTurn();
}

// Renders the animations for a turn
function renderTurn(){
  if(renderQueue.length){
    // Pops entries from the renderQueue to address them and render them one at a time
    var nextEntry = renderQueue.pop(0);
    nextEntry.imgEl.addEventListener('animationend', clearAnimation);
    nextEntry.imgEl.addEventListener('animationcancel', clearAnimation);
    // Actually animate the item with the img and string passed in
    animateEffect(nextEntry.imgEl, nextEntry.animateString);
  } else if(userMonster.isDefeated || enemyMonster.isDefeated){
    // Check for game over and if so set monster to local storage and send user back to homepage
    endGameScreen();
  } else{
    // If there's nothing to render, and no one is dead yet, pop the ability tray back up on the screen
    enableAbilityTray();
  }
}

// Starts an animation on an image elemet
function animateEffect(imgEl, animateString){
  imgEl.className = animateString;
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

function playSongOnStart() {
  initializeCombat();
  var isPlaying = true;
  togglePlay();
}


var gameScreen = document.getElementById('gameScreen');
var gameStartButton = document.createElement('button');
gameStartButton.id = 'gameStartButton';
gameStartButton.textContent = 'Start the Game!';
gameScreen.appendChild(gameStartButton);
gameStartButton.addEventListener('click', playSongOnStart);


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
    window.location.replace('index.html');
  });
  buttonDiv.appendChild(homeButton);
  buttonOuterSection.appendChild(buttonDiv);
}

var audioSection = document.getElementById('audio');
var audioLoop = document.getElementById('audioLoop');
var isPlaying = false;
audioLoop.volume = 0.5;

function togglePlay() {
  if (isPlaying) {
    audioLoop.pause();
  } else {
    audioLoop.play();
  }
}
audioLoop.onplaying = function() {
  isPlaying = true;
  audioSection.id = 'audio';
};
audioLoop.onpause = function() {
  isPlaying = false;
  audioSection.id = 'audioIsNotPlaying';
};

// Function for rendering the health bars w/ nunbers in the middle, called in initializeCombat() and given values in userAttack() in Combat.js;
function renderHealthBars() {
  var userHealthOuter = document.createElement('div');
  userHealthOuter.className = 'healthBarOuter';
  var userHealthNumber = document.createElement('p');
  userHealthNumber.id = 'userHealthNumber';
  userHealthNumber.className = 'healthNumber';
  userHealthOuter.appendChild(userHealthNumber);
  var userHealthInner = document.createElement('div');
  userHealthInner.id = 'userHealth';
  userHealthInner.className = 'healthBarInner';
  userHealthOuter.appendChild(userHealthInner);
  var userBattlePositon = document.createElement('div');
  userBattlePositon.id = 'userBattlePosition';
  userBattleContainer.appendChild(userHealthOuter);
  userBattleContainer.appendChild(userBattlePositon);

  var enemyHealthOuter = document.createElement('div');
  enemyHealthOuter.className = 'healthBarOuter';
  var enemyHealthNumber = document.createElement('p');
  enemyHealthNumber.id = 'enemyHealthNumber';
  enemyHealthNumber.className = 'healthNumber';
  enemyHealthOuter.appendChild(enemyHealthNumber);
  var enemyHealthInner = document.createElement('div');
  enemyHealthInner.id = 'enemyHealth';
  enemyHealthInner.className = 'healthBarInner';
  enemyHealthOuter.appendChild(enemyHealthInner);
  var enemyBattlePositon = document.createElement('div');
  enemyBattlePositon.id = 'enemyBattlePosition';
  enemyBattleContainer.appendChild(enemyHealthOuter);
  enemyBattleContainer.appendChild(enemyBattlePositon);
}

function updateHealthBars (){
  var userHealthBar = document.getElementById('userHealth');
  userHealthBar.style = 'width:' + (userMonster.currentHealth / userMonster.maximumHealth) * 100 + '%';
  var userHealthNumber = document.getElementById('userHealthNumber');
  userHealthNumber.textContent = userMonster.currentHealth + ' / ' + userMonster.maximumHealth;
  var enemyHealthBar = document.getElementById('enemyHealth');
  enemyHealthBar.style = 'width:' + (enemyMonster.currentHealth / enemyMonster.maximumHealth) * 100 + '%';
  var enemyHealthNumber = document.getElementById('enemyHealthNumber');
  enemyHealthNumber.textContent = enemyMonster.currentHealth + ' / ' + enemyMonster.maximumHealth;
}

// Boxes below game screen w/ monsters, stats, and abilities
function renderMonsterStats() {
  var userContainer = document.getElementById('userMonsterInfo');
  var userMonsterInfoAndImg = document.createElement('section');
  var userInfoPicTray = document.createElement('section');
  userInfoPicTray.id = 'userPicTray';
  userInfoPicTray.className = 'picTray';

  var userMonsterImage = document.createElement('img');
  userMonsterImage.src = userMonster.monsterData.imgSrc;
  userMonsterImage.height = 80;
  userInfoPicTray.appendChild(userMonsterImage);

  var userMonsterInfo = document.createElement('section');
  userMonsterInfo.className = 'monsterInfo';
  var userMonsterName = document.createElement('h2');
  userMonsterName.textContent = userMonster.monsterData.name;
  var userMonsterStats = document.createElement('ul');
  userMonsterStats.className = 'monsterStats';
  var userMonsterAttack = document.createElement('li');
  userMonsterAttack.id = 'userCurrentAttack';
  userMonsterAttack.textContent ='Attack: ' + userMonster.monsterData.attack;

  var userMonsterDefense = document.createElement('li');
  userMonsterDefense.id = 'userCurrentDefense';
  userMonsterDefense.textContent ='Defense: ' + userMonster.monsterData.defense;

  var userMonsterSpeed = document.createElement('li');
  userMonsterSpeed.id = 'userCurrentSpeed';
  userMonsterSpeed.textContent ='Speed: ' + userMonster.monsterData.speed;

  userMonsterStats.appendChild(userMonsterAttack);
  userMonsterStats.appendChild(userMonsterDefense);
  userMonsterStats.appendChild(userMonsterSpeed);
  userMonsterInfo.appendChild(userMonsterName);
  userMonsterInfo.appendChild(userMonsterStats);
  userInfoPicTray.appendChild(userMonsterInfo);

  var userMonsterAbilities = document.createElement('ul');
  userMonsterAbilities.id = 'userMonsterAbilities';
  userMonsterAbilities.className = 'monsterAbilities';

  for (var ab in userMonster.abilitySet) {
    var abilityLiEl = document.createElement('li');
    var abilityName = document.createElement('h3');
    abilityName.textContent = userMonster.abilitySet[ab].name;
    abilityLiEl.appendChild(abilityName);
    userMonsterAbilities.appendChild(abilityLiEl);
  }


  userMonsterInfoAndImg.appendChild(userInfoPicTray);
  userMonsterInfoAndImg.appendChild(userMonsterAbilities);
  userContainer.appendChild(userMonsterInfoAndImg);



  var enemyContainer = document.getElementById('enemyMonsterInfo');
  var enemyMonsterInfoAndImg = document.createElement('section');
  var enemyInfoPicTray = document.createElement('section');
  enemyInfoPicTray.id = 'enemyPicTray';
  enemyInfoPicTray.className = 'picTray';

  var enemyMonsterImage = document.createElement('img');
  enemyMonsterImage.src = enemyMonster.monsterData.imgSrc;
  enemyMonsterImage.height = 80;
  enemyInfoPicTray.appendChild(enemyMonsterImage);

  var enemyMonsterInfo = document.createElement('section');
  enemyMonsterInfo.className = 'monsterInfo';
  var enemyMonsterName = document.createElement('h2');
  enemyMonsterName.textContent = enemyMonster.monsterData.name;
  var enemyMonsterStats = document.createElement('ul');
  enemyMonsterStats.className = 'monsterStats';

  var enemyMonsterAttack = document.createElement('li');
  enemyMonsterAttack.id = 'enemyCurrentAttack';
  enemyMonsterAttack.textContent = 'Attack: ' + enemyMonster.monsterData.attack;

  var enemyMonsterDefense = document.createElement('li');
  enemyMonsterDefense.id = 'enemyCurrentDefense';
  enemyMonsterDefense.textContent = 'Defense: ' +  enemyMonster.monsterData.defense;

  var enemyMonsterSpeed = document.createElement('li');
  enemyMonsterSpeed.id = 'enemyCurrentSpeed';
  enemyMonsterSpeed.textContent = 'Speed: ' + enemyMonster.monsterData.speed;

  enemyMonsterStats.appendChild(enemyMonsterAttack);
  enemyMonsterStats.appendChild(enemyMonsterDefense);
  enemyMonsterStats.appendChild(enemyMonsterSpeed);
  enemyMonsterInfo.appendChild(enemyMonsterName);
  enemyMonsterInfo.appendChild(enemyMonsterStats);
  enemyInfoPicTray.appendChild(enemyMonsterInfo);
  var enemyMonsterAbilities = document.createElement('ul');
  enemyMonsterAbilities.id = 'enemyMonsterAbilities';
  enemyMonsterAbilities.className = 'monsterAbilities';

  for (var i in enemyMonster.abilitySet) {
    abilityLiEl = document.createElement('li');
    abilityName = document.createElement('h3');
    abilityName.textContent = enemyMonster.abilitySet[i].name;
    abilityLiEl.appendChild(abilityName);
    enemyMonsterAbilities.appendChild(abilityLiEl);
  }

  enemyMonsterInfoAndImg.appendChild(enemyInfoPicTray);
  enemyMonsterInfoAndImg.appendChild(enemyMonsterAbilities);
  enemyContainer.appendChild(enemyMonsterInfoAndImg);
}

function updateMonsterStats() {
  var userAttackUpdate = document.getElementById('userCurrentAttack');
  userAttackUpdate.textContent = 'Attack: ' + userMonster.currentAttack;
  var userDefenseUpdate = document.getElementById('userCurrentDefense');
  userDefenseUpdate.textContent = 'Defense: ' + userMonster.currentDefense;
  var userSpeedUpdate = document.getElementById('userCurrentSpeed');
  userSpeedUpdate.textContent = 'Speed: ' + userMonster.currentSpeed;

  var enemyAttackUpdate = document.getElementById('enemyCurrentAttack');
  enemyAttackUpdate.textContent = 'Attack: ' + enemyMonster.currentAttack;
  var enemyDefenseUpdate = document.getElementById('enemyCurrentDefense');
  enemyDefenseUpdate.textContent = 'Defense: ' + enemyMonster.currentDefense;
  var enemySpeedUpdate = document.getElementById('enemyCurrentSpeed');
  enemySpeedUpdate.textContent = 'Speed: ' + enemyMonster.currentSpeed;
}