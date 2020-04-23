// Ability class
/*
  >> Takes an array of effects
  >> Execute() calls each effect's method, passing in the user and target data
*/
function Ability(effects, name, desc = 'x'){
  this.effects = effects;
  this.name = name;
  this.desc = desc;
}

Ability.prototype.execute = function(user) {
  var randomExecutionRoll;
  console.log(this.name + ' is used');
  for(var eff in this.effects) {
    randomExecutionRoll = Math.round(Math.floor(Math.random() * 100));
    if((randomExecutionRoll + user.target.evasionRate) < this.effects[eff].executionChance) this.effects[eff].effectMethod(user);
    else console.log('FAILED TO EXECUTE');
  }
};

//All abilities in the game
//Note: DO YOU LIKE NESTING? I HOPE YOU LIKE NESTING!!!!

/*
GUIDE TO MAKING A NEW ABILITY:
1. Think of a concept (what does it do?)
2. 

*/
var AbilityDatabase = {};

AbilityDatabase['Trample'] = new Ability([
  new Effect(100, {'damage' : 5}, eff_damageEffect),
  new Effect(100, {'damage' : 5}, eff_damageEffect)
], 'Trample');

AbilityDatabase['Body Slam'] = new Ability([
  new Effect(80, {'damage' : 12}, eff_damageEffect)
], 'Body Slam');

AbilityDatabase['Wrap'] = new Ability([
  new Effect(100, {'damage' : 10}, eff_damageEffect)
],'Wrap');

AbilityDatabase['Lure'] = new Ability([
  new Effect(100, {'statusToApply' : StatusEffectDatabase['Lure']}, eff_applyStatusEffect),
  new Effect(20, {'damage' : 10}, eff_damageEffect)
], 'Lure');

AbilityDatabase['Chomp'] = new Ability([
  new Effect(60, {'damage' : 14}, eff_damageEffect)
], 'Chomp');
// TODO:
AbilityDatabase['Fortify'] = new Ability([
  new Effect(100, {'statusToApply' : StatusEffectDatabase['Fortify']}, eff_applyStatusEffect)
], 'Fortify')

AbilityDatabase['Tail Whip'] = new Ability([
  new Effect(100, {'damage' : 10}, eff_damageEffect)
], 'Tail Whip')
// TODO:
AbilityDatabase['Stone Gaze'] = new Ability([
  new Effect(100, {'statusToApply' : StatusEffectDatabase['Stone Gaze']}, eff_applyStatusEffect)
], 'Stone Gaze')

AbilityDatabase['Charge'] = new Ability([
  new Effect(100, {'damage' : 10}, eff_damageEffect),
  new Effect(20, {'statusToApply' : StatusEffectDatabase['Stun']}, eff_applyStatusEffect)
], 'Charge')
// TODO:
AbilityDatabase['Overdrive'] = new Ability([
  new Effect(100, {'damage' :})
], 'OverDrive')

AbilityDatabase['Confuse'] = new Ability([
  new Effect(100, {'statusToApply' : StatusEffectDatabase['Confuse']}, eff_applyStatusEffect),
  new Effect(100, {'damage' : 10}, eff_damageEffect)
], 'Confuse')

AbilityDatabase['Mirror Image'] = new Ability([
  new Effect(100, {'statusToApply' : StatusEffectDatabase['Mirror Image']}, eff_applyStatusEffect)
], 'Mirror Image')

// ======================= NICCO WROTE THESE ===========

// AbilityDatabase['Body Slam'] = new Ability([
//   new Effect(100, {'statusToApply' : StatusEffectDatabase['Flinch']}, eff_applyStatusEffect),
//   new Effect(20, {'damage' : 8}, eff_damageEffect)
// ], 'Body Slam');

// AbilityDatabase['Fortify'] = new Ability([
//   new Effect(100, {'statusToApply' : StatusEffectDatabase['Fortify']}, eff_applyStatusEffect),
