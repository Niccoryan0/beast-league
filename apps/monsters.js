// THIS FILE NEEDS TO RUN FIRST
// This is for constructor functions for monsters, abilities, all stats and methods related to monsters

// TODO: Class for monsters, include stats
function MonsterData(name, description, imgSrc, attack, defense, speed, abilitySet){
  this.name = name;
  this.description = description;
  this.imgSrc = imgSrc;

  // Stat values are equal to 30 base
  this.attack = attack;
  this.speed = speed;
  this.defense = defense;
  this.abilitySet = abilitySet;
}

function MonsterBattler(monsterData) {
  this.monsterData = monsterData;
  this.initiativeRoll;
  this.currentHealth;
  this.maximumHealth = 80;
  this.currentAttack;
  this.currentDefense;
  this.currentSpeed;
  this.imgElement;
  this.nextAction;
  this.abilitySet = [];
  this.target;
  this.evasionRate = 0;
  this.globalDamageMultiplier = 1;
  this.globalAttackMultiplier = 1;
  this.currentStatusEffects = [];
};

MonsterBattler.prototype.takeDamage = function (damage, enemyAttackValue) {
  damage = Math.round(damage * (enemyAttackValue / this.monsterData.defense));
  this.currentHealth -= damage;
  if(this.currentHealth < 0 ){
    this.currentHealth = 0;
  }
  // user.name + ' deals ' + damage

  renderQueue.push(new RenderQueueEntry(this.imgElement, 'animShake'));
};

MonsterBattler.prototype.tickConditions = function(target) {
  if(this.currentStatusEffects.length > 0) {
    for(var i in this.currentStatusEffects) {
      this.currentStatusEffects[i] = this.currentStatusEffects[i].tickCondition(target);
      if(!this.currentStatusEffects[i]) this.currentStatusEffects.pop(i);
    }

  }

  console.log(this.currentStatusEffects);
};

MonsterBattler.prototype.addNewStatusEffect = function(newStatusEffect) {
  for(var i in this.currentStatusEffects) {
    if(this.currentStatusEffects[i].name === newStatusEffect.name) {
      if(this.currentStatusEffects[i].currDuration > newStatusEffect.currDuration) {
        this.currentStatusEffects[i].currDuration = newStatusEffect.currDuration;
      }

      return;
    }
  }

  newStatusEffect.applyEffect.effectMethod(this);
  this.currentStatusEffects.push(newStatusEffect);
};



function getRandomMonster(){
  var monKeyArray = Object.keys(monsterDatabase);
  var randNum = Math.floor(Math.random() * (monKeyArray.length));
  var randKey = monKeyArray[randNum];
  return monsterDatabase[randKey];
}

var krapkenDesc = 'A cross between a Japanese Kappa and a Kraken. This monstrous beast has the upper half of a human like turtle creature, the Kappa, with the Eldritch abomination that is it\'s Kraken lower half. Krapken enjoys hanging out in the water, with only his top half exposed, in order to lure in unsuspecting victims to pull them under with him tentacles.';
var mwpDesc = 'A horrifying creature, some say it\'s half wolf, half man, others say half wolf half pig. But in truth, it is some mix of all. With the razor sharp teeth and claws of a wolf, the hooves of a pig, and all the intelligence of a man, this is no creature to take lightly.';
var genrathDesc = 'A turtle may not be too terrifying a foe, certainly, but Genrath is no ordinary turtle. Towering above his enemies, Genrath the Great\'s one giant eye sees all, his giant shell offers subperb protection, and let\'s just say he really knows how to throw his weight around.';
var basitriceDesc = 'Some truly unholy amalgamation of the worst things this earth could conceive. Two beasts, attached at the hip, one a half-dragon half-bird known as the Cockatrice, the other, forming it\'s tail, a Basilisk, the great snakes of legend. Most dangerous of all, both beasts are known for the ability to turn a creature to stone simple with it\'s gaze';
var daedalusDesc = 'The old man finally did, no one ever thought he would escape death, but by God he did it. Fusing himself into the body of one of his automatons, the great inventor Daedalus stalks the earth, his mind twisted from years trapped in the metal cage of his own design, seeking someone worthy to finally correct his mistake and put him out of his misery.';
var wishboneDesc = 'No one claims to know what this creature is, some say it\'s a demon, who plays with and tortures the minds of all those he comes across, others call him a simple trickster character, but it always agreed upon that his origins are, and perhaps forever will be shrouded in mystery.';


var monsterDatabase = {
  mKrapken: new MonsterData('Krapken', krapkenDesc, 'assets/sprites/Krapken_160px_transparent.png', 30, 20, 40, ['Wrap', 'Lure']),
  mManWolfPig: new MonsterData('ManWolfPig', mwpDesc, 'assets/sprites/MWP_160px_transparent.png', 30, 30, 30, ['Chomp', 'Trample'])
  // mGenrath: new MonsterData('Genrath' genrathDesc, 'assets/sprites/genrath.png', 30, 40, 20, ['Body Slam', 'Fortify'])
  // mBasitrice: new MonsterData('Basitrice', basitriceDesc, 'assets/sprites/basitrice.png', 40, 20, 30, ['Tail Whip', 'Stone Gaze'])
  // mDaedalus: new MonsterData('Daedalus', daedalusDesc, 'assets/sprites/daedalus.png', 30, 30, 30, ['Charge', 'Overdrive'])
  // mWishbone: new MonsterData('Wishbone', wishboneDesc, 'assets/sprites/wishbone.png', 20, 30, 40, ['Confuse', 'Mirror Image'])
};
