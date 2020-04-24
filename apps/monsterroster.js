'use strict';
/* global monsterDatabase */


// TODO: Add descriptions of abilties
var abilityDescArr = {
  'Trample' : 'ManWolfPig takes full advantage of it\'s piggy legs, trampling the enemy to deal two hits of physical damage. Execution Chance: 60%  Speed Modifier: 0  Effect: Deals 14 damage.',
  'Chomp' : 'ManWolfPig takes a bite out of crime with his powerful jaws and razor-sharp teeth. This ability\'s base damage is 14 points of physical damage, with an execution chance of 60 and a speed modifier of 0.',
  'Wrap' : 'Krapken wraps the opponent with it\'s tentacles, pulling them underwater and causing physical damage. This ability\'s base damage is 10 points of physical damage, with an execution chance of 60 and a speed modifier of 0.',
  'Lure' : 'Krapken uses it\'s Kappa charm to lure victims closer to his pool. Lowers enemy defence and has a small chance to trigger Wrap in the same turn.',
  'Body Slam' : 'Genrath charges the opponent, dealing physical damage and causing a chance to flinch on their next turn.',
  'Fortify' : 'Genrath enters a defensive stance, sharply raising his Defense until the end of the combat.',
  'Tail Whip' : 'Amphylisk uses it\'s basilisk tail as a whip, and unlike a usual tail whip, this one bites! Causes physical damage and can inflict poison effect.',
  'Stone Gaze' : 'The Cockatrice and Basilisk heads focus their gaze, turning the target to stone until the end of next turn if successful',
  'Charge' : 'Daedalus charges with its steel horns, dealing damage with a chance of stun. Chance to cause flinch on hit.',
  'Overdrive' : 'Daedalus kicks into overdrives at the cost of a portion of its health. Its next attack will deal high bonus damage.',
  'Confuse' : 'Wishbone causes the opponent to be confused, forcing them to hurt themselves at the end of each turn.',
  'Mirror Image' : 'Wishbone creates illusory images, causing attacks to have a high chance of missing until the end of its next turn.'
};


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
    abilityLiEl.className = 'abilityNameAndDesc';
    var abilityName = document.createElement('h3');
    abilityName.textContent = user.abilitySet[ab];
    abilityName.className = 'abilityName';
    abilityLiEl.appendChild(abilityName);
    var abilityDesc = document.createElement('p');
    abilityDesc.className = 'abilityDescription';
    abilityDesc.textContent = abilityDescArr[user.abilitySet[ab]];
    abilityLiEl.appendChild(abilityDesc);
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
