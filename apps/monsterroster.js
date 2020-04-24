'use strict';
/* global monsterDatabase */


// TODO: Add descriptions of abilties
var abilityDescArr = {
  'Trample' : ['ManWolfPig takes full advantage of it\'s piggy legs, trampling the enemy beneath him. This attack hits twice, one for each hoof.', ['Each Hit Execution Chance: 100%', 'Speed Modifier: 0', 'Effect: Deals 5 damage per hit.']],

  'Chomp' : ['ManWolfPig takes a bite out of crime with his powerful jaws and razor-sharp teeth. This ability\'s base damage is 14 points of damage, with an execution chance of 60 and a speed modifier of 0.',['Execution Chance: 60%', 'Speed Modifier: 0', 'Effect: Deals 14 damage.']],


  'Wrap' : ['Krapken wraps the opponent with it\'s tentacles, pulling them underwater and causing damage.', ['Execution Chance: 100%', 'Speed Modifier: 20', 'Effect: Deals 10 damage.']],

  'Lure' : ['Krapken uses it\'s Kappa charm to lure victims closer to his pool. Lowers enemy defence and has a small chance to trigger Wrap in the same turn.',['Execution Chance: 100% defense debuff, 20% trigger Wrap', 'Speed Modifier: 0', 'Effect: Debuffs the enemy defense and has a 20% chance to trigger Wrap at the same time.']],


  'Body Slam' : ['Genrath charges the opponent, dealing damage and causing a chance to flinch on their next turn.',['Execution Chance: 80% deal damage, 20% flinch', 'Speed Modifier: 0', 'Effect: Deals 12 damage and has a chance to cause target to flinch.']],

  'Fortify' : ['Genrath enters a defensive stance, sharply raising his Defense until the end of the combat.',['Execution Chance: 100%', 'Speed Modifier: 0', 'Effect: Buffs Genrath\'s defense by 2, can be stacked infinite times.']],


  'Tail Whip' : ['Amphylisk uses it\'s basilisk tail as a whip, and unlike a usual tail whip, this one bites! Causes damage and can inflict poison effect.',['Execution Chance: 100% damage, 65% poison', 'Speed Modifier: 0', 'Effect: Deals 6 damage and has a chance to poison the target.']],

  'Stone Gaze' : ['The Cockatrice and Basilisk heads focus their gaze, turning the target to stone until the end of next turn if successful',['Execution Chance: 60%', 'Speed Modifier: 0', 'Effect: Paralyzes enemy for 2 turns.']],


  'Charge' : ['Daedalus charges with its steel horns, dealing damage with a chance of stun. Chance to cause flinch on hit.',['Execution Chance: 100% damage, 20% flinch', 'Speed Modifier: 0', 'Effect: Deals 10 damage and has a 20% chance to cause target to flinch.']],

  'Overdrive' : ['Daedalus kicks into overdrives at the cost of a portion of its health. Its next attack will deal high bonus damage.',['Execution Chance: 100%', 'Speed Modifier: 0', 'Effect: Deals 4 damage to Daedalus but gives him 250% of his base attack.']],


  'Confuse' : ['Wishbone causes the opponent to be confused, forcing them to hurt themselves at the end of each turn.',['Execution Chance: 100%', 'Speed Modifier: 0', 'Effect: Causes the target to have a 50% chance to damage themselves when attacking.']],

  'Mirror Image' : ['Wishbone creates illusory images, causing attacks to have a high chance of missing until the end of its next turn.',['Execution Chance: 100%', 'Speed Modifier: 0', 'Effect: Increases Wishbone\'s evasion rate by 30 points.']]
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
    var descAndEffects = document.createElement('section');
    descAndEffects.className = 'descAndEffects';
    var abilityEffectList = document.createElement('ul');
    abilityEffectList.className = 'abilityEffectList';
    var abilityLiEl = document.createElement('li');
    abilityLiEl.className = 'abilityNameAndDesc';
    var abilityName = document.createElement('h3');
    abilityName.textContent = user.abilitySet[ab];
    abilityName.className = 'abilityName';
    abilityLiEl.appendChild(abilityName);
    var abilityDesc = document.createElement('p');
    abilityDesc.className = 'abilityDescription';
    abilityDesc.textContent = abilityDescArr[user.abilitySet[ab]][0];

    for (var j in abilityDescArr[user.abilitySet[ab]][1]){
      var abilityEffects = document.createElement('li');
      abilityEffects.textContent = abilityDescArr[user.abilitySet[ab]][1][j];
      abilityEffectList.appendChild(abilityEffects);
    }

    abilityLiEl.appendChild(abilityDesc);
    abilityLiEl.appendChild(abilityEffectList);
    descAndEffects.appendChild(abilityLiEl);
    userMonsterAbilities.appendChild(descAndEffects);

  }

  userMonsterInfoAndImg.appendChild(userInfoPicTray);
  userMonsterInfoAndImg.appendChild(userMonsterAbilities);
  userContainer.appendChild(userMonsterInfoAndImg);
  monsterSection.appendChild(userContainer);
}


for(var mon in monsterDatabase){
  renderMonsterRoster(monsterDatabase[mon], 'Top');
}
