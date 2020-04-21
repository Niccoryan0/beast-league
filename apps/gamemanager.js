'use strict';
// Initialize data for monsters, save/load data for monsters, handle events outside of game function
// THIS WILL BE THE SECOND FILE THAT GETS RUN ONLY ON THE HOMEPAGE

// Array
var userMonster;


// Gets a random monster from the Monster array
function getRandomMonster(){
  var randNum = Math.floor(Math.random() * (monsterDatabase.length + 1));
  return monsterDatabase[randNum];
}

var resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function(){
  if (!localStorage.getItem('userMonster')){
    localStorage.clear();
    location.reload();
  }
  userMonster = getRandomMonster();
  var userMonsterStringy = JSON.stringify(userMonster);
  localStorage.setItem('userMonster', userMonsterStringy);
});

var startButton = document.getElementById('startButton');
startButton.addEventListener('click', function(){
  window.location.replace('../game.html');
});
