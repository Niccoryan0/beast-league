'use strict';
/* global Effect, eff_modifyStatEffect, eff_selfEffect, eff_persistentEffect, eff_stunEffect, eff_removePersistentEffect, eff_damageEffect, eff_applyStatusEffect */


// Constructor function for status effects to be applied
function StatusEffect(name, maxDuration = 1, applyEffect, removeEffect = null) {
  this.name = name;
  this.maxDuration = maxDuration;
  this.currDuration = 0;
  this.applyEffect = applyEffect;
  this.removeEffect = removeEffect;
}

StatusEffect.prototype.tickCondition = function (user) {
  this.currDuration++;
  console.log(this.name + ' has ' + (this.maxDuration - this.currDuration) + ' turns remaining.');
  if (this.currDuration >= this.maxDuration && this.removeEffect !== null) {
    var enemyMonster = user.target;
    user.target = user;
    this.removeEffect.effectMethod(user);
    user.target = enemyMonster;
    console.log(this.name + ' has been removed.');
    return null;
  }
  else return this;
};

/*
=== HOW TO WRITE A STATUS EFFECT ===
1. Think of a concept. What effect is applied?
2. Add a new property to StatusEffectDatabase with a new StatusEffect
3. Fill in the following arguments:
  a. Name as a string
  b. Duration as an integer
  c. Effect that triggers when status effect is applied
  d. Effect that triggers when status effect is removed

Writing an apply/remove effect:
>> ALL EFFECTS in a status effect are self effects!!!

>> Example Apply Effect: when you modify a stat, simply write a modify stat effect
new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': 10 } }, eff_modifyStatEffect)

>> Example Remove Effect: make sure to decrease that stat value after modifying it
new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': -10 } }, eff_modifyStatEffect)
*/

var StatusEffectDatabase = {};

// Reduces defense by 10 for 3 rounds
StatusEffectDatabase['Lure'] = new StatusEffect('Lure', 3,
  // This is the applyEffect -> triggers ON THE MONSTER AFFECTED BY STATUS EFFECT
  new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': -10 } }, eff_modifyStatEffect),
  // This is the removeEffect -> triggers ON THE MONSTER AFFECTED BY STATUS EFFECT
  new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': 10 } }, eff_modifyStatEffect)
);

// **
StatusEffectDatabase['Flinch'] = new StatusEffect('Flinch', 1,
  new Effect(100, { 'stun': true }, eff_stunEffect),
  // This is the removeEffect -> triggers ON THE MONSTER AFFECTED BY STATUS EFFECT
  new Effect(100, { 'stun': false }, eff_stunEffect)
);

// **
StatusEffectDatabase['Confuse'] = new StatusEffect('Confuse', 3,
  new Effect(100, {
    'persistentEffect': { 'name': 'Confuse', 'effect': new Effect(30, {'statusToApply' : StatusEffectDatabase['Flinch']}, eff_applyStatusEffect) }
  }, eff_persistentEffect),
  new Effect(100, {
    'persistentEffectName': 'Confuse'
  }, eff_removePersistentEffect)
);

// **
StatusEffectDatabase['Mirror Image'] = new StatusEffect('Mirror Image', 2,
  new Effect(100, { 'statMod': { 'statName': 'evasionRate', 'statModValue': 30 } }, eff_modifyStatEffect),
  new Effect(100, { 'statMod': { 'statName': 'evasionRate', 'statModValue': -30 } }, eff_modifyStatEffect)
);

// **
StatusEffectDatabase['Paralyze'] = new StatusEffect('Paralyze', 2,
  new Effect(100, { 'stun': true }, eff_stunEffect),
  // This is the removeEffect -> triggers ON THE MONSTER AFFECTED BY STATUS EFFECT
  new Effect(100, { 'stun': false }, eff_stunEffect)
);


// **
StatusEffectDatabase['Overdrive'] = new StatusEffect('Overdrive', 2,
  new Effect(100, { 'statMod': { 'statName': 'globalDamageMultiplier', 'statModValue': 0.5 } }, eff_modifyStatEffect),
  new Effect(100, { 'statMod': { 'statName': 'globalDamageMultiplier', 'statModValue': -0.5 } }, eff_modifyStatEffect)
);

// Change the name of the ability
StatusEffectDatabase['Venom'] = new StatusEffect('Venom', 3,
  new Effect(100, {
    'persistentEffect': { 'name': 'Venom', 'effect': new Effect(100, { 'damage': 2 }, eff_damageEffect) }
  }, eff_persistentEffect),
  new Effect(100, {
    'persistentEffectName': 'Venom'
  }, eff_removePersistentEffect)
);

// ** means needs play testing
// ============= NICCO WROTE THESE SO PLEASE DOUBLE CHECK THEM ===============

