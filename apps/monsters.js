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

function MonsterBattler(monsterData, imgElement) {
  this.monsterData = monsterData;
  this.initiativeRoll;
  this.currentHealth = 80;
  this.maximumHealth = currentHealth;
  this.imgElement = imgElement;
  this.takeDamage = function (damage, enemyAttackValue) {
    damage = damage * (enemyAttackValue / this.defense);
  };
}