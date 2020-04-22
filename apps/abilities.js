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

Ability.prototype.execute = function(user, target) {
  var randomExecutionRoll;
  console.log(this.name + ' is used');
  for(var eff in this.effects) {
    randomExecutionRoll = Math.round(Math.floor(Math.random() * 100));
    if(randomExecutionRoll < this.effects[eff].executionChance) this.effects[eff].effectMethod(user, target);
    else console.log("FAILED TO EXECUTE");
  }
};

var AbilityDatabase = {};
AbilityDatabase['Trample'] = new Ability([
  new Effect(100, {'damage' : 5}, eff_damageEffect),
  new Effect(100, {'damage' : 5}, eff_damageEffect)
],
'Trample');
AbilityDatabase['Body Slam'] = new Ability([
  new Effect(80, {'damage' : 12}, eff_damageEffect)
],
'Body Slam');
AbilityDatabase['Wrap'] = new Ability([
  new Effect(80, {'damage' : 12}, eff_damageEffect)
],
'Wrap');
AbilityDatabase['Lure'] = new Ability([
  new Effect(80, {'damage' : 12}, eff_damageEffect)
], 
'Lure');
AbilityDatabase['Chomp'] = new Ability([
  new Effect(80, {'damage' : 12}, eff_damageEffect)
], 
'Chomp');