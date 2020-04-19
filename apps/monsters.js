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


function Ability(dmgAmnt, dmgType, spcEff = '', target = 0){
  this.dmgAmnt = dmgAmnt;
  this.dmgType = dmgType;
  this.spcEff = spcEff;
  this.target = target; // Default 0 becuase I'm thinking for MVP it would be 0 to target an enemy, 1 to target yourself, so Genrath's Fortify will have a target of 1, just a thought for now, and if we later add in multiple monster fights, targetting can be 0 for self, and then 1 to target first enemy, 2nd for next enemy, so on
}