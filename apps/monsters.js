// THIS FILE NEEDS TO RUN FIRST
// This is for constructor functions for monsters, abilities, all stats and methods related to monsters

// TODO: Class for monsters, include stats
function MonsterData(attack, defense, speed, abilitySet){
  // Stat values are equal to 30 base
  this.attack = attack;
  this.speed = speed;
  this.defense = defense;
  this.abilitySet = abilitySet;
}

function MonsterBattler(monsterData, imgSrc) {
  this.monsterData = monsterData;
  this.imgSrc = imgSrc;
  this.currentHealth = 80;
  this.maximumHealth = currentHealth;
  this.takeDamage = function (damage, enemyAttackValue) {
    damage = damage * (enemyAttackValue / this.defense);
  };
}