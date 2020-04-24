/* eslint-disable no-unused-vars */
'use strict';
/* global renderQueue, RenderQueueEntry,  */


// THIS FILE NEEDS TO RUN FIRST
// This is for constructor functions for monsters, abilities, all stats and methods related to monsters

// Class for monsters, include stats

function MonsterData(name, description, imgSrc, attack, defense, speed, abilitySet) {
  this.name = name;
  this.description = description;
  this.imgSrc = imgSrc;

  // Stat values are equal to 30 base
  this.attack = attack;
  this.speed = speed;
  this.defense = defense;

  // This is an array of strings representing what abilities the monster has
  this.abilitySet = abilitySet;
}

// This is the class for monsters in battle
// >> Used for the main combat loop and applying effects
function MonsterBattler(monsterData) {
  this.monsterData = monsterData;
  this.imgElement; // HTML element storing sprite
  this.target; // Current target for abilities
  this.initiativeRoll; // Current initiative roll
  this.isDefeated = false;
  this.isStunned = false;

  this.currentHealth;
  this.maximumHealth = 100;
  this.currentAttack;
  this.currentDefense;
  this.currentSpeed;
  this.evasionRate = 0;
  this.globalDamageMultiplier = 1;
  this.globalAttackMultiplier = 1;

  this.nextAction; // Action to be used on the current turn of combat
  this.abilitySet = []; // Array of abilities that can be used
  this.currentStatusEffects = {}; // Hashtable of current status effects applied
  this.persistentEffects = {}; // Hashtable of persistent effects applied; includes stuns and DoT's
}

// This function deals damage to the monster that calls it
// >> If health is reduced below 0 or to 0, the monster is defeated and doesn't act this turn
// >> This function is called by effects that call eff_damageEffect()
MonsterBattler.prototype.takeDamage = function (damage, attackValue) {
  damage = Math.round(damage * (attackValue / this.currentDefense));
  this.currentHealth -= damage;
  if (this.currentHealth <= 0) {
    this.currentHealth = 0;
    this.isDefeated = true;
  }
  addDialogueBoxEntry('p', this.monsterData.name + ' took ' + damage + ' damage.');
  renderQueue.push(new RenderQueueEntry(this.imgElement, 'animShake'));
};

// This function heals the monster
MonsterBattler.prototype.getHealed = function (healValue) {
  this.currentHealth += healValue;
  if (this.currentHealth > 100) {
    this.currentHealth = 100;
  }
  addDialogueBoxEntry('p', this.monsterData.name + ' heals for ' + healValue + ' points.');
};

// addDialogueBoxEntry('p', user.target.monsterData.name + ' ' + statModified['statName'] + ' now equals ' + user.target[statModified['statName']]);

// This function ticks the duration of all status effects taken
// >> Sets status effect at each condition to return value of tickCondition()
// >> If tickCondition() returns null, it is skipped
MonsterBattler.prototype.tickConditions = function () {
  var statusEffectKeys = Object.keys(this.currentStatusEffects);
  var currentKey;

  for (var i in statusEffectKeys) {
    currentKey = statusEffectKeys[i];
    if (this.currentStatusEffects[currentKey] !== null) {
      this.currentStatusEffects[currentKey] = this.currentStatusEffects[currentKey].tickCondition(this);
    }
  }
};

// This function adds a new status effect to the monster and applies its effect
// >> Called when a new status effect is inflicted; always inflicted to SELF
// >> This function is called by effects that call eff_applyStatusEffect()
MonsterBattler.prototype.addNewStatusEffect = function (newStatusEffect) {
  for (var i in this.currentStatusEffects) {
    // eslint-disable-next-line no-prototype-builtins
    if (this.currentStatusEffects.hasOwnProperty(newStatusEffect.name)) {
      if (this.currentStatusEffects[newStatusEffect.name] !== null) {
        if (this.currentStatusEffects[newStatusEffect.name].currDuration > newStatusEffect.currDuration) {
          this.currentStatusEffects[newStatusEffect.name].currDuration = newStatusEffect.currDuration;
          return;
        }
      }
    }
  }

  addDialogueBoxEntry('p', this.monsterData.name + ' is affected by ' + newStatusEffect.name);
  var enemyMonster = this.target;
  this.target = this;
  newStatusEffect.applyEffect.effectMethod(this);
  this.target = enemyMonster;
  this.currentStatusEffects[newStatusEffect.name] = newStatusEffect;
};


// This function applies all persistent effects currently on the monster
// >> Called at the start of each turn
MonsterBattler.prototype.applyPersistentEffects = function () {
  for (var i in this.persistentEffects) {
    // eslint-disable-next-line no-prototype-builtins
    if (this.persistentEffects.hasOwnProperty(i)) {
      if (this.persistentEffects[i] !== null) {
        var randomExecutionRoll = Math.round(Math.floor(Math.random() * 100));
        if (randomExecutionRoll < this.persistentEffects[i].effect.executionChance) {
          addDialogueBoxEntry('p', this.persistentEffects[i].name + ' afflicts ' + this.monsterData.name);
          var enemyMonster = this.target;
          this.target = this;
          this.persistentEffects[i].effect.effectMethod(this);
          this.target = enemyMonster;
        }
        else console.log(this.monsterData.name + 'STATUS NOT APPLIED, EXECUTION ROLL :', randomExecutionRoll);
      }
    }
  }
};

// This function returns a random monster from the monsterDatabase object
function getRandomMonster() {
  var monKeyArray = Object.keys(monsterDatabase);
  var randNum = Math.floor(Math.random() * (monKeyArray.length));
  var randKey = monKeyArray[randNum];
  return monsterDatabase[randKey];
}


//Monster Database
var krapkenDesc = 'A cross between a Japanese Kappa and a Kraken. This monstrous beast has the upper half of a human like turtle creature, the Kappa, with the Eldritch abomination that is it\'s Kraken lower half. Krapken enjoys hanging out in the water, with only his top half exposed, in order to lure in unsuspecting victims to pull them under with him tentacles.';
var mwpDesc = 'A horrifying creature, some say it\'s half wolf, half man, others say half wolf half pig. But in truth, it is some mix of all. With the razor sharp teeth and claws of a wolf, the hooves of a pig, and all the intelligence of a man, this is no creature to take lightly.';
var genrathDesc = 'A turtle may not be too terrifying a foe, certainly, but Genrath is no ordinary turtle. Towering above his enemies, Genrath the Great\'s one giant eye sees all, his giant shell offers subperb protection, and let\'s just say he really knows how to throw his weight around.';
var amphyliskDesc = 'Some truly unholy amalgamation of the worst things this earth could conceive. Two beasts, attached at the hip, one a half-dragon half-bird known as the Cockatrice, the other, forming it\'s tail, a Basilisk, the great snakes of legend. Most dangerous of all, both beasts are known for the ability to turn a creature to stone simple with it\'s gaze';
var daedalusDesc = 'The old man finally did, no one ever thought he would escape death, but by God he did it. Fusing himself into the body of one of his automatons, the great inventor Daedalus stalks the earth, his mind twisted from years trapped in the metal cage of his own design, seeking someone worthy to finally correct his mistake and put him out of his misery.';
var wishboneDesc = 'No one claims to know what this creature is, some say it\'s a demon, who plays with and tortures the minds of all those he comes across, others call him a simple trickster character, but it always agreed upon that his origins are, and perhaps forever will be shrouded in mystery.';


var monsterDatabase = {
  mKrapken: new MonsterData('Krapken', krapkenDesc, 'assets/sprites/Krapken_160px_transparent.png', 30, 25, 35, ['Wrap', 'Lure', 'Dive', 'Tidal Wave']),

  mManWolfPig: new MonsterData('ManWolfPig', mwpDesc, 'assets/sprites/MWP_160px_transparent.png', 30, 30, 30, ['Chomp', 'Trample', 'Slash', 'Agility']),

  mGenrath: new MonsterData('Genrath', genrathDesc, 'assets/sprites/genrath_160px.png', 30, 35, 25, ['Body Slam', 'Fortify', 'Shell Spin', 'Eye Beam']),

  mAmphylisk: new MonsterData('Amphylisk', amphyliskDesc, 'assets/sprites/amphylisk_160px.png', 35, 25, 30, ['Tail Whip', 'Stone Gaze', 'Gust', 'Nibble']),

  mDaedalus: new MonsterData('Daedalus', daedalusDesc, 'assets/sprites/daedalus_160px.png', 30, 30, 30, ['Charge', 'Overdrive', 'Sunder', 'Repair']),


  mWishbone: new MonsterData('Wishbone', wishboneDesc, 'assets/sprites/wishbone.png', 25, 30, 35, ['Confuse', 'Mirror Image', 'Terrify', 'Flail'])
};
