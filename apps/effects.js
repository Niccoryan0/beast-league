// Effect: This is an effect that an ability can apply.
/*
  >> executionChance is how likely the effect is to occur
  >> customValues is an object for any unique values needed by an effect
  >> effectMethod is the function that runs when the effect is used
*/

// eslint-disable-next-line no-unused-vars
function Effect(executionChance, customValues, effectMethod) {
  this.executionChance = executionChance;
  this.customValues = customValues;
  //CUSTOM VALUES guide: 'damage' = damage value, 'statBuff' = specific stat buff, 'statDebuff' = specific stat debuff
  this.effectMethod = effectMethod;
}

// eslint-disable-next-line no-unused-vars
function eff_damageEffect(user) {
  console.log('damage dealt');
  var damageMult = user.globalDamageMultiplier;
  var attackMult = user.globalAttackMultiplier;

  if('damageMultiplier' in this.customValues) damageMult += (this.customValues['damageMultiplier'] - 1);
  if('attackMultiplier' in this.customValues) damageMult += (this.customValues['attackMultiplier'] - 1);

  var damageRoll = Math.floor((Math.random() * this.customValues['damage']) + (this.customValues['damage'] * 0.5));
  console.log(damageRoll);
  user.target.takeDamage(damageRoll * damageMult, user.currentAttack * attackMult);
  // Sends function to View for rendering effect
}

function eff_selfEffect(user) {
  var enemyMonster = user.target;
  user.target = user;
  this.customValues['selfEffect'].effectMethod(user);
  user.target = enemyMonster;
}

function eff_modifyStatEffect(user){
  var statModified = this.customValues['statMod'];
  user.target[statModified['statName']] = user.target[statModified['statName']] + statModified['statModValue'];
  if(user.target[statModified['statName']] < 0) user.target[statModified['statName']] = 0;
  console.log(user.target.monsterData.name + ' ' + statModified['statName'] + ' now equals ' + user.target[statModified['statName']]);
}

function eff_applyStatusEffect(user) {
  var statusTemplate = this.customValues['statusToApply'];
  var newStatusEffect = new StatusEffect(statusTemplate.name, statusTemplate.maxDuration, statusTemplate.applyEffect, statusTemplate.removeEffect);
  user.target.addNewStatusEffect(newStatusEffect);
}
