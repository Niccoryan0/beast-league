// Effect: This is an effect that an ability can apply.
/*
  >> executionChance is how likely the effect is to occur
  >> customValues is an object for any unique values needed by an effect
  >> effectMethod is the function that runs when the effect is used
*/
function Effect(executionChance, customValues, effectMethod) {
  this.executionChance = executionChance;
  this.customValues = customValues;
  this.effectMethod = effectMethod;
}

var EffectMethodsDatabase = [];

EffectMethodsDatabase['damageEffect'] = new function(user, target) {
  var damageRoll = Math.floor((Math.random() * this.customValues.damage) + (this.customValues.damage * 0.5));
  target.takeDamage(this.customValues.damage, user.attack);
  // Call rendering function for attacking
};