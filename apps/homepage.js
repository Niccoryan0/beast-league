'use strict';
/* global monsterDatabase */
// Initialize data for monsters, save/load data for monsters, handle events outside of game function
// THIS WILL BE THE SECOND FILE THAT GETS RUN ONLY ON THE HOMEPAGE

var userMonster;
if (localStorage.getItem('userMonster')){
  userMonster = JSON.parse(localStorage.getItem('userMonster'));
} else {
  userMonster = monsterDatabase['mKrapken'];
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

var spriteTrayL = document.getElementById('spriteTrayL');
var spriteTrayR = document.getElementById('spriteTrayR');


// New array with monster names, check in that array for id, and then match up that name in the monsterDatabase
function chooseMonster(event) {
  localStorage.clear();

  var monKeyArray = Object.keys(monsterDatabase);
  for (var mon in monKeyArray){
    if ('m' + event.target.id === monKeyArray[mon]){
      userMonster = monsterDatabase[monKeyArray[mon]];
    }
  }
  var userMonsterStringy = JSON.stringify(userMonster);
  localStorage.setItem('userMonster', userMonsterStringy);

  location.reload();
}
spriteTrayL.addEventListener('click', chooseMonster);
spriteTrayR.addEventListener('click', chooseMonster);

renderUserSpriteHomepage();
