'use strict';
/* global Effect, eff_modifyStatEffect, eff_persistentEffect, eff_stunEffect, eff_removePersistentEffect, eff_damageEffect, eff_applyStatusEffect, eff_linkedEffect */


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
StatusEffectDatabase['Vulnerable'] = new StatusEffect('Vulnerable', 3,
  new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': -10 } }, eff_modifyStatEffect),
  new Effect(100, { 'statMod': { 'statName': 'currentDefense', 'statModValue': 10 } }, eff_modifyStatEffect)
);

// Increases speed by 10 for 3 rounds
StatusEffectDatabase['Hasted'] = new StatusEffect('Hasted', 3,
  new Effect(100, { 'statMod': { 'statName': 'currentSpeed', 'statModValue': 10 } }, eff_modifyStatEffect),
  new Effect(100, { 'statMod': { 'statName': 'currentSpeed', 'statModValue': -10 } }, eff_modifyStatEffect)
);

// Improves attack by 10 for 3 rounds
StatusEffectDatabase['Empowered'] = new StatusEffect('Empowered', 2,
  new Effect(100, { 'statMod': { 'statName': 'currentAttack', 'statModValue': 10 } }, eff_modifyStatEffect),
  new Effect(100, { 'statMod': { 'statName': 'currentAttack', 'statModValue': -10 } }, eff_modifyStatEffect)
);

// Dodges all effects for 2 rounds
StatusEffectDatabase['Hidden'] = new StatusEffect('Hidden', 2,
  new Effect(100, { 'statMod': { 'statName': 'evasionRate', 'statModValue': 100 } }, eff_modifyStatEffect),
  new Effect(100, { 'statMod': { 'statName': 'evasionRate', 'statModValue': -100 } }, eff_modifyStatEffect)
);

StatusEffectDatabase['Flinch'] = new StatusEffect('Flinch', 1,
  new Effect(100, { 'stun': true }, eff_stunEffect),
  new Effect(100, { 'stun': false }, eff_stunEffect)
);

StatusEffectDatabase['Confused'] = new StatusEffect('Confused', 3,
  new Effect(100, {
    'persistentEffect': {
      'name': 'Confused', 'effect': new Effect(50, {
        'effectFunc1': eff_applyStatusEffect, 'effectFunc2': eff_damageEffect,
        'customValues': { 'damage': 12, 'statusToApply': StatusEffectDatabase['Flinch'] },
      }, eff_linkedEffect)
    }
  }, eff_persistentEffect),
  new Effect(100, {
    'persistentEffectName': 'Confused'
  }, eff_removePersistentEffect)
);

StatusEffectDatabase['Paralyzed'] = new StatusEffect('Paralyzed', 3,
  new Effect(100, { 'stun': true }, eff_stunEffect),
  new Effect(100, { 'stun': false }, eff_stunEffect)
);

StatusEffectDatabase['Terrify'] = new StatusEffect('Terrify', 2,
  new Effect(100, {
    'effectFunc1': eff_stunEffect, 'effectFunc2': eff_modifyStatEffect,
    'customValues': {
      'statMod': { 'statName': 'currentDefense', 'statModValue': -5 },
      'stun': true
    },
  }, eff_linkedEffect),
  new Effect(100, {
    'effectFunc1': eff_stunEffect, 'effectFunc2': eff_modifyStatEffect,
    'customValues': {
      'statMod': { 'statName': 'currentDefense', 'statModValue': 5 },
      'stun': false
    },
  }, eff_linkedEffect)
);


// 2-turn stun and defense debuff

StatusEffectDatabase['Mirror Image'] = new StatusEffect('Mirror Image', 2,
  new Effect(100, { 'statMod': { 'statName': 'evasionRate', 'statModValue': 30 } }, eff_modifyStatEffect),
  new Effect(100, { 'statMod': { 'statName': 'evasionRate', 'statModValue': -30 } }, eff_modifyStatEffect)
);

// 3-turn stun
StatusEffectDatabase['Paralyzed'] = new StatusEffect('Paralyzed', 3,

  new Effect(100, { 'stun': true }, eff_stunEffect),
  // This is the removeEffect -> triggers ON THE MONSTER AFFECTED BY STATUS EFFECT
  new Effect(100, { 'stun': false }, eff_stunEffect)
);

// 2-turn +150% damage multiplier

StatusEffectDatabase['Overdrive'] = new StatusEffect('Overdrive', 2,
  new Effect(100, { 'statMod': { 'statName': 'globalDamageMultiplier', 'statModValue': 1.5 } }, eff_modifyStatEffect),
  new Effect(100, { 'statMod': { 'statName': 'globalDamageMultiplier', 'statModValue': -1.5 } }, eff_modifyStatEffect)
);

// 3-turn damage over time, ignores half defense
StatusEffectDatabase['Poisoned'] = new StatusEffect('Poisoned', 3,
  new Effect(100, {
    'persistentEffect': { 'name': 'Poisoned', 'effect': new Effect(100, { 'damage': 4, 'attackMultBonus': 1 }, eff_damageEffect) }
  }, eff_persistentEffect),
  new Effect(100, {
    'persistentEffectName': 'Poisoned'
  }, eff_removePersistentEffect)
);

// 3-turn damage over time
StatusEffectDatabase['Bleeding'] = new StatusEffect('Bleeding', 3,
  new Effect(100, {
    'persistentEffect': { 'name': 'Bleeding', 'effect': new Effect(100, { 'damage': 8 }, eff_damageEffect) }
  }, eff_persistentEffect),
  new Effect(100, {
    'persistentEffectName': 'Bleeding'
  }, eff_removePersistentEffect)

);
