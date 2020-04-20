// This will be the render data for the game, sprites, etc.
'use strict'

// TODO: Pull monster from local storage for user monster 

function userMonster(){
    var userMonsterName = document.getElementById('userMonsterName');
    userMonsterName.textContent = 'Monster Name';
    var userMonsterStats = document.getElementById('userMonsterStats');
    userMonsterStats.textContent = 'MonsterStats';
}

function renderUserSprite(monster){
    var imgPath = monsterArray[monster].imgpath
    var target = document.getElementById('picTray');
    var newImgEl = document.createElement('img');
    newImgEl.src = 'assets/sprites/MWP_160px_transparent.png';
    newImgEl.height = 80;
    target.appendChild(newImgEl);
}


function shakeImage(img){
    img.id = '';
    img.id = 'shakeyImg'; 
}

function (){
    
}

renderUserSprite();
userMonster();