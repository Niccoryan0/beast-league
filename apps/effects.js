// Effect: This is an effect that an ability can apply.
/*
  >> executionChance is how likely the effect is to occur
  >> customValues is an object for any unique values needed by an effect
  >> effectMethod is the function that runs when the effect is used
*/
function Effect(executionChance, customValues, effectMethod) {
  this.executionChance = executionChance;
  this.customValues = customValues; 
  //CUSTOM VALUES guide: 'damage' = damage value, 'statBuff' = specific stat buff, 'statDebuff' = specific stat debuff
  this.effectMethod = effectMethod;
}

var eff_damageEffect = new function(user, target) {
  var damageRoll = Math.floor((Math.random() * this.customValues.damage) + (this.customValues.damage * 0.5));
  target.takeDamage(this.customValues.damage, user.attack);
  // Sends function to View for rendering effect
};