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
  this.imgElement;
  this.nextAction;
  this.abilitySet = [];
  this.takeDamage = function (damage, enemyAttackValue) {
    damage = Math.round(damage * (enemyAttackValue / this.monsterData.defense));
    this.currentHealth -= damage;
    if(this.currentHealth < 0 ){
      this.currentHealth = 0;
    }
    console.log('delt ' + damage);
    console.log('current health is: ' + this.currentHealth);
    renderQueue.push(new RenderQueueEntry(this.imgElement, 'animShake'));
  };
}

function getRandomMonster(){
  var monKeyArray = Object.keys(monsterDatabase);
  var randNum = Math.floor(Math.random() * (monKeyArray.length));
  var randKey = monKeyArray[randNum];
  return monsterDatabase[randKey];
}

var monsterDatabase = {
  mKrapken: new MonsterData('Krapken', 'x', 'assets/sprites/Krapken_160px_transparent.png', 30, 20, 40, ['Wrap', 'Lure']),
  mManWolfPig: new MonsterData('ManWolfPig', 'x', 'assets/sprites/MWP_160px_transparent.png', 30, 30, 30, ['Chomp', 'Trample'])
}

