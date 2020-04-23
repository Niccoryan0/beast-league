// Ability class
/*
  >> Takes an array of effects
  >> Execute() calls each effect's method, passing in the user and target data
*/
function Ability(effects, name, desc = 'x') {
  this.effects = effects;
  this.name = name;
  this.desc = desc;
}

Ability.prototype.execute = function (user) {
  var randomExecutionRoll;
  console.log(this.name + ' is used');
  for (var eff in this.effects) {
    randomExecutionRoll = Math.round(Math.floor(Math.random() * 100));
    if ((randomExecutionRoll + user.target.evasionRate) < this.effects[eff].executionChance) this.effects[eff].effectMethod(user);
    else console.log('FAILED TO EXECUTE');
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

AbilityDatabase['Trample'] = new Ability([
  new Effect(100, { 'damage': 5 }, eff_damageEffect),
  new Effect(100, { 'damage': 5 }, eff_damageEffect)
], 'Trample');

AbilityDatabase['Body Slam'] = new Ability([
  new Effect(80, { 'damage': 12 }, eff_damageEffect)
], 'Body Slam');

AbilityDatabase['Wrap'] = new Ability([
  new Effect(100, { 'damage': 10 }, eff_damageEffect)
], 'Wrap');

AbilityDatabase['Lure'] = new Ability([
  new Effect(100, { 'statusToApply': StatusEffectDatabase['Lure'] }, eff_applyStatusEffect),
  new Effect(20, { 'damage': 10 }, eff_damageEffect)
], 'Lure');

AbilityDatabase['Chomp'] = new Ability([
  new Effect(60, { 'damage': 14 }, eff_damageEffect)
], 'Chomp');

// ======================= NICCO WROTE THESE ===========

// AbilityDatabase['Body Slam'] = new Ability([
//   new Effect(100, {'statusToApply' : StatusEffectDatabase['Flinch']}, eff_applyStatusEffect),
//   new Effect(20, {'damage' : 8}, eff_damageEffect)
// ], 'Body Slam');

// AbilityDatabase['Fortify'] = new Ability([
//   new Effect(100, {'statusToApply' : StatusEffectDatabase['Fortify']}, eff_applyStatusEffect),
