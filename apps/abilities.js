// Ability class
/*
  >> Takes an array of effects
  >> Execute calls each effect's method, passing in the user and target data
*/
function Ability(effects){
  //Keying guide: 'damage' = damage value, 'statBuff' = specific stat buff, 'statDebuff' = specific stat debuff
  this.effects = effects;
}

Ability.prototype.execute = function(user, target) {
  var randomExecutionRoll;
  
  for(var eff in effects) {
    randomExecutionRoll = Math.round(Math.floor(Math.random * 100));
    if(randomExecutionRoll) eff.effectMethod(user, target);
    //else calls function to view saying that effect failed
  }
};

var AbilityDatabase = [];
AbilityDatabase['Trample'] = new Ability([
  new Effect(100, {'damage' : 5}, EffectMethodsDatabase['damageEffect']),
  new Effect(100, {'damage' : 5}, EffectMethodsDatabase['damageEffect'])
]);
AbilityDatabase['Body Slam'] = new Ability([
  new Effect(80, {'damage' : 12}, EffectMethodsDatabase['damageEffect'])
]);