## Vision

This product was designed to emulate the early Pokemon games that sold amazingly well across the world.  There has been a hole in gamer's hearts since Nintendo has taken the Pokemon franchise in a new direction. We aim to recapture the experience of the initial wonderment felt playing the early Pokemon titles. People should care about this game because it will be fun and also educational, teaching kids about mythological monsters, or perhaps some real ones??


## Scope (In/Out)

IN - What will your product do

  - The game will give each player a randomly chosen monster, if they keep this monster alive it can stay with them forever. 

  - The game will allow players to battle their monster(s) against a set of opponents, also randomly selected from the whole cast of monsters.

  - The user will be able to give input to the monsters during a battle, allowing them control over their own monster during the fight, and will be able to use moves that do damage to the opponent.

  - The about page will allow players the opportunity to learn more about the making of the game itself as well as it's 3 creators.


OUT - What will your product not do.

  - Our game will only be supported on computer browser's, it will not be a mobile app or take too many strides to make the browser version playable on mobile.

  - This game will be single player and completely off line, with no on line support.

## Minimum Viable Product
What will your MVP functionality be?

  - 3 monsters, 2 abilities, 3 stats (atk, def, spd)

  - Home page that says games name, and has a link to start the game or go to about us, looks nice

  - About us that shows the monsters, talks about project creation and process and a bit about each of us, personal bio blurb thing

  - Game screen in center, current round and monsters on top, stats on the sides i.e. current score and turn number, show HP above monsters as a number

  - 3 rounds of fighting per "game", random monsters, choice to repeat with running score across all matches if you survive

  - Press 1 or 2 for different abilities

  - Option on home to start new game or pull from local storage

  - Little shake animation on attacks


## Stretch
What stretch goals are you going to aim for?

  - 6 monsters, each with four abilities

  - Stat increases after fight (leveling mechanic)

  - Boss fight, maybe a score minimum to reach it? Big boss like Hydra, Behemoth, Tarasque

  - Traits for monsters, certain ones with higher base stats.

  - Status effects i.e. buffs and debuffs, special moves with cool abilities

  - Mana system or limited use system for abilities i.e. cooldowns on abilties or limited number of uses

  - Navigate through abilties, select with enter

  - Page for breedings (Big stretch)

  - Sounds for each monsters


## Functional Requirements
List the functionality of your product. This will consist of tasks such as the following:

  1. A user can get a randomly selected monster from the whole set of monsters, and see the information about their monster on the home page.

  2. A user can battle this monster against enemies on the game screen.

  3. A user can learn more about the game and it's creators on the about page.



## Data Flow
  Describe the flow of data in your application. Write out what happens from the time the user begins using the app to the time the user is done with the app. Think about the “Happy Path” of the application. Describe through visuals and text what requests are made, and what data is processed, in addition to any other details about how the user moves through the site.

  1. On start up the user will be presented with the home page. This page will have the option to generate a new random monster, navigate to the game page with a start button, or navigate to the About Page with the icon in the header. The sprites for all the monsters will be shown on this page on the sides, as well as on the about page.

  2. If the user presses the button to generate a monster, that information will be committed to local storage, and the monster will be rendered on the home page.

  3. If the user presses the button to start the game, they will be taken to a new page where the game is played. On this page their monster will be rendered on the left side of the screen, with a random enemy monster rendered on the right side of the screen.

  4. During the battle, the user will select abilties to use, what ability is used and any effect it might have is calculated and applied to the target of the ability. 

  5. If the user defeats all enemies in the match, they have the option to start again and fight a new group of monsters.

  6. The user will also have to option to travel back to the home page from the game page.

  7. If the user navigates to the about page, they will be presented with the information about our game and about us.
