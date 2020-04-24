'use strict';
/* global monsterDatabase */

function renderMonsterRoster(user, section) {
  var monsterSection = document.getElementById('monsterDataSection' + section);
  var userContainer = document.createElement('section');
  userContainer.className = 'monContainer';
  var userMonsterInfoAndImg = document.createElement('section');
  var userInfoPicTray = document.createElement('section');
  userInfoPicTray.id = 'userPicTray';
  userInfoPicTray.className = 'picTray';

  var userMonsterImage = document.createElement('img');
  userMonsterImage.src = user.imgSrc;
  userMonsterImage.height = 80;
  userInfoPicTray.appendChild(userMonsterImage);

  var userMonsterInfo = document.createElement('section');
  userMonsterInfo.className = 'monsterInfo';
  var userMonsterName = document.createElement('h2');
  userMonsterName.textContent = user.name;
  var userMonsterStats = document.createElement('ul');
  userMonsterStats.className = 'monsterStats';
  var userMonsterAttack = document.createElement('li');
  userMonsterAttack.className = 'attack';
  userMonsterAttack.textContent ='Attack: ' + user.attack;

  var userMonsterDefense = document.createElement('li');
  userMonsterDefense.className = 'defense';
  userMonsterDefense.textContent ='Defense: ' + user.defense;

  var userMonsterSpeed = document.createElement('li');
  userMonsterSpeed.className = 'speed';
  userMonsterSpeed.textContent ='Speed: ' + user.speed;

  userMonsterStats.appendChild(userMonsterAttack);
  userMonsterStats.appendChild(userMonsterDefense);
  userMonsterStats.appendChild(userMonsterSpeed);
  userMonsterInfo.appendChild(userMonsterName);
  userMonsterInfo.appendChild(userMonsterStats);
  userInfoPicTray.appendChild(userMonsterInfo);

  var userMonsterAbilities = document.createElement('ul');
  userMonsterAbilities.id = 'userMonsterAbilities';
  userMonsterAbilities.className = 'monsterAbilities';

  for (var ab in user.abilitySet) {
    var abilityLiEl = document.createElement('li');
    var abilityName = document.createElement('h3');
    abilityName.textContent = user.abilitySet[ab];
    abilityName.className = 'abilityName';
    abilityLiEl.appendChild(abilityName);
    userMonsterAbilities.appendChild(abilityLiEl);
  }

  userMonsterInfoAndImg.appendChild(userInfoPicTray);
  userMonsterInfoAndImg.appendChild(userMonsterAbilities);
  userContainer.appendChild(userMonsterInfoAndImg);
  monsterSection.appendChild(userContainer);
}


for(var mon in monsterDatabase){
  renderMonsterRoster(monsterDatabase[mon], 'Top');
}
