// Ability class
/*
  >> Takes an array of effects
  >> Execute() calls each effect's method, passing in the user and target data
*/
function Ability(effects){
  this.effects = effects;
}

Ability.prototype.execute = function(user, target) {
  var randomExecutionRoll;
  
  for(var eff in effects) {
    randomExecutionRoll = Math.round(Math.floor(Math.random * 100));
    if(randomExecutionRoll) eff.effectMethod(user, target);

    //renderqueue entries by ability, not effect?
    //ability sets text content of entries, effect sets imgEl and id
    //if effect doesn't execute, passes generic miss
  }
};

var AbilityDatabase = {};
AbilityDatabase['Trample'] = new Ability([
  new Effect(100, {'damage' : 5}, eff_damageEffect),
  new Effect(100, {'damage' : 5}, eff_damageEffect)
]);
AbilityDatabase['Body Slam'] = new Ability([
  new Effect(80, {'damage' : 12}, eff_damageEffect)
]);