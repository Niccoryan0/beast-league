function StatusEffect(name, maxDuration = 1, applyEffect, removeEffect = null) {
  this.name = name;
  this.maxDuration = maxDuration;
  this.currDuration = 0;
  this.applyEffect = applyEffect;
  this.removeEffect = removeEffect;
}

StatusEffect.prototype.tickCondition = function (target) {
  this.currDuration++;
  console.log(this.name + ' has ' + (this.maxDuration - this.currDuration) + ' turns remaining.');
  if (this.currDuration >= this.maxDuration && this.removeEffect !== null) {
    this.removeEffect.effectMethod(target);
    return null;
  }
  else return this;
};

// EVASION RATES ARE SET FOR EACH MONSTER AND CAN BE MODIFIED WITHIN METHODS


// Limited turn duration for each effect
// Duration 0 means permanent,
// We need a way to tick down this number each turn though, as well as max duration and "current tick timer", which counts up to reach max duration

var StatusEffectDatabase = {};

StatusEffectDatabase['Lure'] = new StatusEffect('Lure', 3,
  new Effect(100, {
    'selfEffect': new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': -10 } }, eff_modifyStatEffect)
  }, eff_selfEffect),
  new Effect(100, {
    'selfEffect': new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': 10 } }, eff_modifyStatEffect)
  }, eff_selfEffect)
);

// StatusEffectDatabase['Fortify'] = new StatusEffect('Fortify', 100,
// new Effect(100, {
//  'selfEffect': new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': 10 } }, eff_modifyStatEffect)
// }, eff_selfEffect),
// );

// ============= NICCO WROTE THESE SO PLEASE DOUBLE CHECK THEM ===============

