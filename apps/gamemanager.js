'use strict';
/* GLOBAL: getRandomMonster */
// Initialize data for monsters, save/load data for monsters, handle events outside of game function
// THIS WILL BE THE SECOND FILE THAT GETS RUN ONLY ON THE HOMEPAGE

var userMonster;
if (localStorage.getItem('userMonster')){
  userMonster = JSON.parse(localStorage.getItem('userMonster'));
} else {
  userMonster = getRandomMonster();
  localStorage.setItem('userMonster', JSON.stringify(userMonster));
}

// Array



// Gets a random monster from the Monster array

// function getRandomMonster(){
//   var randNum = Math.floor(Math.random() * (monsterDatabase.length + 1));
//   return monsterDatabase[randNum];
// }

function renderUserSpriteHomepage(){
  var target = document.getElementById('picTray');

  var userImgSrc = userMonster.imgSrc;
  var userImgEl = document.createElement('img');
  userImgEl.src = userImgSrc;
  userImgEl.height = 80;
  target.appendChild(userImgEl);

  var userMonsterName = document.getElementById('userMonsterName');
  userMonsterName.textContent = userMonster.name;
  var userMonsterAtk = document.getElementById('userMonsterAtk');
  userMonsterAtk.textContent = 'Attack: ' + userMonster.attack;
  var userMonsterDef = document.getElementById('userMonsterDef');
  userMonsterDef.textContent = 'Defense: ' + userMonster.defense;
  var userMonsterSpd = document.getElementById('userMonsterSpd');
  userMonsterSpd.textContent = 'Speed: ' + userMonster.speed;
  var userMonsterDesc = document.getElementById('userMonsterDescription');
  userMonsterDesc.textContent = userMonster.description;


}
renderUserSpriteHomepage();

var resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function(){
  localStorage.clear();

  userMonster = getRandomMonster();
  var userMonsterStringy = JSON.stringify(userMonster);
  localStorage.setItem('userMonster', userMonsterStringy);

  location.reload();

});

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', function(){
  window.location.replace('../game.html');
});
