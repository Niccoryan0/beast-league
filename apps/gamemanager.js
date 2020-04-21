'use strict';
/* GLOBAL: getRandomMonster */
// Initialize data for monsters, save/load data for monsters, handle events outside of game function
// THIS WILL BE THE SECOND FILE THAT GETS RUN ONLY ON THE HOMEPAGE
var krapkenDesc = 'A cross between a Japanese Kappa and a Kraken. This monstrous beast has the upper half of a human like turtle creature, the Kappa, with the Eldritch abomination that is it\'s Kraken lower half. Krapken enjoys hanging out in the water, with only his top half exposed, in order to lure in unsuspecting victims to pull them under with him tentacles.';

var userMonster;
if (localStorage.getItem('userMonster')){
  userMonster = localStorage.getItem(JSON.parse('userMonster'));
} else {
  // userMonster = getRandomMonster();
  userMonster = {name : 'Krapken', attack : 30, defense: 30, speed: 30, description: krapkenDesc, imgSrc : 'assets/sprites/Krapken_160px_transparent.png'};
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
