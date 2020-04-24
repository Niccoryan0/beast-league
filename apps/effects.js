'use strict';
/* eslint-disable no-unused-vars */
/* global StatusEffect */

// Effect: This is an effect that an ability can apply.
/*
  >> executionChance is how likely the effect is to occur
  >> customValues is an object for any unique values needed by an effect
  >> effectMethod is the function that runs when the effect is used
*/

function Effect(executionChance, customValues, effectMethod) {
  this.executionChance = executionChance; // Chance of effect executing
  this.customValues = customValues; // Custom values passed as an object literal
  this.effectMethod = effectMethod; // Method called by effect when applied
}

// DAMAGE EFFECT: Calculates damage roll from 50% to 150% of base value and inflicts it to target.
function eff_damageEffect(user) {
  console.log('damage dealt');
  var damageMult = user.globalDamageMultiplier;
  var attackMult = user.globalAttackMultiplier;

  if('damageMultiplier' in this.customValues) damageMult += (this.customValues['damageMultiplier'] - 1);
  if('attackMultiplier' in this.customValues) attackMult += (this.customValues['attackMultiplier'] - 1);

  var damageRoll = Math.floor((Math.random() * this.customValues['damage']) + (this.customValues['damage'] * 0.5));
  console.log(damageRoll  * damageMult);
  user.target.takeDamage(damageRoll * damageMult, user.currentAttack * attackMult);
  // Sends function to View for rendering effect
}

// SELF EFFECT: Applies effect defined as 'selfEffect' to the user.
function eff_selfEffect(user) {
  var enemyMonster = user.target;
  user.target = user;
  this.customValues['selfEffect'].effectMethod(user);
  user.target = enemyMonster;
}

// MODIFY STAT EFFECT: Modifies a specific stat by a specific value.
function eff_modifyStatEffect(user){
  var statModified = this.customValues['statMod'];
  user.target[statModified['statName']] = user.target[statModified['statName']] + statModified['statModValue'];
  if(user.target[statModified['statName']] < 0) user.target[statModified['statName']] = 0;
  console.log(user.target.monsterData.name + ' ' + statModified['statName'] + ' now equals ' + user.target[statModified['statName']]);
}

// STUN EFFECT: Sets whether a target is stunned or not, preventing them from acting.
function eff_stunEffect(user){
  user.target.isStunned = this.customValues['stun'];
}

// APPLY STATUS EFFECT: Applies a status effect defined by 'statusToApply' to target
function eff_applyStatusEffect(user) {
  var statusTemplate = this.customValues['statusToApply'];
  var newStatusEffect = new StatusEffect(statusTemplate.name, statusTemplate.maxDuration, statusTemplate.applyEffect, statusTemplate.removeEffect);
  user.target.addNewStatusEffect(newStatusEffect);
}

// PERSISTENT EFFECT: Applies a persistent effect
function eff_persistentEffect(user) {
  user.persistentEffects[this.customValues['persistentEffect'].name] = this.customValues['persistentEffect'];
}

// REMOVE PERSISTENT EFFECT: Removes persistent effect with specific name
function eff_removePersistentEffect(user) {
  user.persistentEffects[this.customValues['persistentEffectName']] = null;
  if(this.customValues.hasOwnProperty('persistentEffectRemoveEffect')) {
    var enemyMonster = user.target;
    user.target = user;
    this.customValues['persistentEffectRemoveEffect'].effectMethod(user);
    user.target = enemyMonster;
  }
}

// LINKED EFFECT: Single effect with two effect methods
// >> Must include all custom values needed for both functions and can't link the same functions
function eff_linkedEffect(user) {
  this.customValues['effectFunc1'](user);
  this.customValues['effectFunc2'](user);
}
