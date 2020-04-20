// This is for constructor functions for monsters, abilities, all stats and methods related to monsters


// TODO: Class for monsters, include stats
function Monster(atk, spd, def, type){
  this.atk = atk;
  this.spd = spd;
  this.def = def;
  this.type = type; // ex: Heavy, light, bruiser, etc..
}


// TODO: Class for abilities, tageting and affects of attack
// Structure:
// MONSTER CLASS


function Ability(dmgAmnt, dmgType, spcEff = 0, target = 0){
  this.dmgAmnt = dmgAmnt;
  this.dmgType = dmgType;
  this.spcEff = spcEff; // We could choose numbers to represent different effects, i.e. a 0 here represents no special effect, 1 repreesnts atk buff, 2 for def, 3 for spd, and then using the target property it can be a self buff or an enemy debuff
  this.target = target; // Default 0 becuase I'm thinking for MVP it would be 0 to target an enemy, 1 to target yourself, so Genrath's Fortify will have a target of 1, just a thought for now, and if we later add in multiple monster fights, targetting can be 0 for self, and then 1 to target first enemy, 2nd for next enemy, so on
}

// THIS IS ALL JUST ME(NICCO) PLAYING WITH IDEAS, CAN BE IGNORED MOSTLY
Ability.prototype.selfBuff = function() {
  if (this.spcEff === 1){
    this.target.atk += 10; // When we pull this.target here, it will actually be representative of a certain monsters, using the targetting system described above
  }

}