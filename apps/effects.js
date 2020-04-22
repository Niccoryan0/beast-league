// Effect: This is an effect that an ability can apply.
/*
  >> executionChance is how likely the effect is to occur
  >> customValues is an object for any unique values needed by an effect
  >> effectMethod is the function that runs when the effect is used
*/

// eslint-disable-next-line no-unused-vars
function Effect(executionChance, customValues, effectMethod) {
  this.executionChance = executionChance;
  this.customValues = customValues; 
  //CUSTOM VALUES guide: 'damage' = damage value, 'statBuff' = specific stat buff, 'statDebuff' = specific stat debuff
  this.effectMethod = effectMethod;
}

// eslint-disable-next-line no-unused-vars
function eff_damageEffect(user, target) {
  console.log('damage dealt');

  var damageRoll = Math.floor((Math.random() * this.customValues['damage']) + (this.customValues['damage'] * 0.5));
  console.log(damageRoll);
  target.takeDamage(damageRoll, user.monsterData.attack);
  // Sends function to View for rendering effect
};