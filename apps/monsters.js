// THIS FILE NEEDS TO RUN FIRST
// This is for constructor functions for monsters, abilities, all stats and methods related to monsters

// TODO: Class for monsters, include stats
function MonsterData(attack, defense, speed, abilitySet, imgSrc){
  // Stat values are equal to 30 base
  this.attack = attack;
  this.speed = speed;
  this.defense = defense;
  this.abilitySet = abilitySet;
  this.imgSrc = imgSrc;
}

function MonsterBattler(monsterData, imgSrc, imgElement) {
  this.monsterData = monsterData;
  this.initiativeRoll;
  this.isActing;
  this.currentHealth = 80;
  this.maximumHealth = currentHealth;
  this.imgElement = imgElement;
  this.takeDamage = function (damage, enemyAttackValue) {
    damage = damage * (enemyAttackValue / this.defense);
  };
}