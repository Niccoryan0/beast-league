'use strict';
/* global Effect, eff_applyStatusEffect, eff_damageEffect, StatusEffectDatabase, eff_selfEffect, addDialogueBoxEntry, eff_modifyStatEffect */

// Ability class
/*
  >> Takes an array of effects
  >> Execute() calls each effect's method, passing in the user and target data
*/
function Ability(effects, name, spdMod = 0) {
  this.effects = effects;
  this.name = name;
  this.spdMod = spdMod;
}

Ability.prototype.execute = function (user) {
  var randomExecutionRoll;
  addDialogueBoxEntry('p', user.monsterData.name + ' used ' + this.name);
  for (var eff in this.effects) {
    randomExecutionRoll = Math.round(Math.floor(Math.random() * 100));
    if(this.effects[eff].isAvoidable) randomExecutionRoll += user.target.evasionRate;
    if (randomExecutionRoll < this.effects[eff].executionChance) this.effects[eff].effectMethod(user);
    else addDialogueBoxEntry('p' , user.monsterData.name + ' missed with ' + this.effects[eff].name + ' effect!');
  }
};

//All abilities in the game
//Note: DO YOU LIKE NESTING? I HOPE YOU LIKE NESTING!!!!

/*
=== HOW TO WRITE AN ABILITY ===
1. Think of a concept. What effects does the ability do?
2. Add a new property to AbilityDatabase with a new Ability
3. Fill in the following arguments:
  a. Array of effects, written in the order that they are applied
  d. Name as a string

Writing an effect:
Effects have the following parameters
1. Execution chance -> how likely is it to succeed? Number from 1-100
2. Custom values -> this an object literal with properties that are passed to the effect function
  a. eff_damageEffect values: 'damage' (number)
  b. eff_applyStatusEffect values: 'statusToApply' (StatusEffect from StatusEffectDatabase)
  c. eff_selfEffect values: 'selfEffect' (new Effect that applies to user, not target)
  d. eff_modifyStatEffect values: 'statMod' (object literal with 'statName' [name of trait modified, written as currentDefense, currentAttack, etc.] and 'statMod' [number, how much to change stat by] properties)
  e. eff_persistentEffect values:
3. Name as a string
*/
var AbilityDatabase = {};

// MWP
AbilityDatabase['Trample'] = new Ability([
  new Effect(100, { 'damage': 6 }, eff_damageEffect, 'Damage'),
  new Effect(100, { 'damage': 6 }, eff_damageEffect, 'Damage')
], 'Trample');

AbilityDatabase['Chomp'] = new Ability([
  new Effect(60, { 'damage': 16 }, eff_damageEffect, 'Damage')
], 'Chomp');

AbilityDatabase['Slash'] = new Ability([
  new Effect(100, {'damage' : 4}, eff_damageEffect, 'Damage'),
  new Effect(100, {'statusToApply' : StatusEffectDatabase['Bleeding']}, eff_applyStatusEffect, 'Bleed')
], 'Slash');

AbilityDatabase['Agility'] = new Ability([
  new Effect(100, {
    'selfEffect': new Effect(100, { 'statMod': { 'statName': 'currentSpeed', 'statModValue': 4 } }, eff_modifyStatEffect, 'Agility', false)
  }, eff_selfEffect),
], 'Agility');


// KRAPKEN
AbilityDatabase['Wrap'] = new Ability([
  new Effect(100, { 'damage': 10 }, eff_damageEffect, 'Damage')
], 'Wrap', 20);

AbilityDatabase['Lure'] = new Ability([
  new Effect(100, { 'statusToApply': StatusEffectDatabase['Vulnerable'] }, eff_applyStatusEffect, 'Vulnerable'),
  new Effect(20, { 'damage': 10 }, eff_damageEffect, 'Damage')
], 'Lure');

AbilityDatabase['Dive'] = new Ability([
  new Effect(100, {
    'selfEffect' : new Effect(100, {'statusToApply' : StatusEffectDatabase['Hidden']}, eff_applyStatusEffect)
  }, eff_selfEffect, 'Hidden', false),
  new Effect(100, {
    'selfEffect' : new Effect(100, {'statusToApply' : StatusEffectDatabase['Empowered']}, eff_applyStatusEffect)
  }, eff_selfEffect, 'Empowered', false)
], 'Dive');

AbilityDatabase['Tidal Wave'] = new Ability([
  new Effect(40, { 'damage': 18 }, eff_damageEffect, 'Damage')
], 'Tidal Wave', -40);


// GENRATH
AbilityDatabase['Body Slam'] = new Ability([
  new Effect(80, { 'damage': 12 }, eff_damageEffect, 'Damage'),
  new Effect(20, {'statusToApply' : StatusEffectDatabase['Flinch']}, eff_applyStatusEffect, 'Flinch')
], 'Body Slam');

AbilityDatabase['Fortify'] = new Ability([
  new Effect(100, {
    'selfEffect': new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': 2 } }, eff_modifyStatEffect)
  }, eff_selfEffect, 'Fortify', false),
], 'Fortify');

AbilityDatabase['Shell Spin'] = new Ability([
  new Effect(100, { 'damage': 4 }, eff_damageEffect, 'Damage'),
  new Effect(100, { 'damage': 4 }, eff_damageEffect, 'Damage'),
  new Effect(20, {
    'selfEffect': new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': 2 } }, eff_modifyStatEffect)
  }, eff_selfEffect, 'Fortify', false)
], 'Shell Spin');

AbilityDatabase['Eye Beam'] = new Ability([
  new Effect(100, { 'damage': 6, 'attackMultBonus' : 1 }, eff_damageEffect, 'Damage')
], 'Eye Beam', 40);

// AMPHYLISK
AbilityDatabase['Tail Whip'] = new Ability([
  new Effect(100, {'damage' : 6}, eff_damageEffect, 'Damage'),
  new Effect(80, {'statusToApply' : StatusEffectDatabase['Poisoned']}, eff_applyStatusEffect, 'Poison')
], 'Tail Whip');

AbilityDatabase['Stone Gaze'] = new Ability([
  new Effect(40, {'statusToApply' : StatusEffectDatabase['Paralyzed']}, eff_applyStatusEffect, 'Paralyze')
], 'Stone Gaze');

AbilityDatabase['Gust'] = new Ability([
  new Effect(100, {
    'selfEffect' : new Effect(100, {'statusToApply' : StatusEffectDatabase['Hasted']}, eff_applyStatusEffect)
  }, eff_selfEffect, 'Haste', false)
], 'Gust');

AbilityDatabase['Nibble'] = new Ability([
  new Effect(100, { 'damage': 3 }, eff_damageEffect, 'Damage'),
  new Effect(100, { 'damage': 3 }, eff_damageEffect, 'Damage'),
  new Effect(100, { 'damage': 3 }, eff_damageEffect, 'Damage')
], 'Nibble', 30);

// DAEDALUS
AbilityDatabase['Charge'] = new Ability([
  new Effect(100, {'damage' : 10}, eff_damageEffect, 'Damage'),
  new Effect(20, {'statusToApply' : StatusEffectDatabase['Flinch']}, eff_applyStatusEffect, 'Flinch')
], 'Charge');

AbilityDatabase['Overdrive'] = new Ability([
  new Effect(100, {
    'selfEffect' : new Effect(100, {'damage' : 4}, eff_damageEffect)
  }, eff_selfEffect, 'Self Damage', false),
  new Effect(100, {
    'selfEffect' : new Effect(100, {'statusToApply' : StatusEffectDatabase['Overdrive']}, eff_applyStatusEffect)
  }, eff_selfEffect, 'Overdrive', false)
], 'Overdrive');

AbilityDatabase['Repair'] = new Ability([
  new Effect(30, {'healValue' : 12 }, eff_healEffect, 'Heal')
], 'Repair');

AbilityDatabase['Sunder'] = new Ability([
  new Effect(100, {'damage' : 5}, eff_damageEffect, 'Damage'),
  new Effect(100, {'statusToApply' : StatusEffectDatabase['Vulnerable']}, eff_applyStatusEffect, 'Vulnerability')
], 'Sunder');


// WISHBONE
AbilityDatabase['Confuse'] = new Ability([
  new Effect(100, {'statusToApply' : StatusEffectDatabase['Confused']}, eff_applyStatusEffect, 'Confuse')
], 'Confuse');

AbilityDatabase['Mirror Image'] = new Ability([
  new Effect(100, {
    'selfEffect' : new Effect(100, {'statusToApply' : StatusEffectDatabase['Mirror Image']}, eff_applyStatusEffect)
  }, eff_selfEffect, 'Mirror Image', false)
], 'Mirror Image', 40);

AbilityDatabase['Terrify'] = new Ability([
  new Effect(60, {'statusToApply' : StatusEffectDatabase['Terrify']}, eff_applyStatusEffect, 'Terrify')
], 'Terrify');

AbilityDatabase['Flail'] = new Ability([
  new Effect(100, { 'damage': 4 }, eff_damageEffect, 'Damage'),
  new Effect(100, { 'damage': 4 }, eff_damageEffect, 'Damage'),
  new Effect(10, { 'damage': 20 }, eff_damageEffect, 'Mega Flail')
], 'Flail', 20);

