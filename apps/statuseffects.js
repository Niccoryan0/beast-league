function StatusEffect(name, maxDuration = 1, applyEffect, removeEffect) {
  this.name = name;
  this.maxDuration = maxDuration;
  this.currDuration = 0;
  this.applyEffect = applyEffect;
  this.removeEffect = removeEffect;
}


StatusEffect.prototype.tickCondition = function (target) {
  this.currDuration++;
  console.log(this.name + ' has ' + (this.maxDuration - this.currDuration) + ' turns remaining.');
  if (this.currDuration >= this.maxDuration) {
    this.removeEffect.effectMethod(target);
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
>> ALL EFFECTS in a status effect must be 'self effects', written as follows:
new Effect(100, { 'selfEffect' : <constructor for effect to apply/remove> }, eff_selfeffect)

>> Example for a self effect that increases the user's defense
new Effect(100, { 'selfEffect' : 
  new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': 10 } }, eff_modifyStatEffect) }, 
eff_selfeffect)

>> When you modify a stat, you need to add an effect for removing the change to that stat, IE:
new Effect(100, { 'selfEffect' : 
  new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': -10 } }, eff_modifyStatEffect) }, 
eff_selfeffect)

>> The exception to wrapping an effect inside a self effect is with persistent effects, because THEY'RE ALL SELF EFFECTS
new Effect(100, {  }, eff_persistentEffect)

*/

var StatusEffectDatabase = {};

StatusEffectDatabase['Lure'] = new StatusEffect('Lure', 3,
  // This is the applyEffect -> triggers ON THE MONSTER AFFECTED BY STATUS EFFECT
  new Effect(100, {
    'selfEffect': new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': -10 } }, eff_modifyStatEffect)
  }, eff_selfEffect),
  // This is the removeEffect -> triggers ON THE MONSTER AFFECTED BY STATUS EFFECT
  new Effect(100, {
    'selfEffect': new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': 10 } }, eff_modifyStatEffect)
  }, eff_selfEffect)
);

StatusEffectDatabase['Stun'] = new StatusEffect('Stun', 1,
  new Effect(100, {
    'selfEffect': new Effect(100, { 'stun': true }, eff_stunEffect)
  }, eff_selfEffect),
  new Effect(100, {
    'selfEffect': new Effect(100, { 'stun': false }, eff_stunEffect)
  }, eff_selfEffect),
);

// ============= NICCO WROTE THESE SO PLEASE DOUBLE CHECK THEM ===============

// StatusEffectDatabase['Fortify'] = new StatusEffect('Fortify', 0,
//   new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': 20 } }, eff_modifyStatEffect),
// );
