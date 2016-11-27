// Setup initial game stats
var score = 0;
var lives = 2;
var pellets = 4;


// Define your ghosts here

var inky = {
menu_option: '1',
name:'Inky',
color:'Red',
character: 'Shadow',
edible: false
};

var blinky = {
menu_option: '1',
name:'Blinky',
color:'Cyan',
character: 'Speedy',
edible: false
};

var pinky = {
menu_option: '1',
name:'Pinky',
color:'pink',
character: 'bashful',
edible: false
};

var clyde = {
menu_option: '1',
name:'Clyde',
color:'Orange',
character: 'Pokey',
edible: false
};

Ghosts=[inky, blinky, pinky, clyde];

// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    if(pellets === 0){
        displayMenu2();
    }else{
        displayMenu();
    }
    displayPrompt();
  }, 10);
}

// function drawScreen2() {
//   clearScreen();
//   setTimeout(function() {
//     displayStats();
//     displayMenu2();
//     displayPrompt();
//   }, 10);
// }

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '      Pellets  ' + pellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat dot');
  for( var index = 0; index < Ghosts.length; index++){
      index2 = index + 1
      if (Ghosts[index].edible === true) {
         state = 'edible'
     } else {
         state = 'inedible'
     }
  console.log('('+index2+') Eat', Ghosts[index].name, state)
}
  console.log('(p) Eat Power Pellet');
  console.log('(q) Quit');
}

function displayMenu2() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat dot');
  for( var index = 0; index < Ghosts.length; index++){
      index2 = index + 1
      if (Ghosts[index].edible === true) {
         state = 'edible'
     } else {
         state = 'inedible'
     }
  console.log('('+index2+') Eat', Ghosts[index].name, state)
}
console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

// FUNCTION eatGhosts
// function ghostEdible(ghost) {
//     if ghost.edible ==== false;
//     lives -- 1;
// };

// Menu Options

function eatPowerPellet() {
    eatPowerPellet.called = true;
    pellets --;
    checkPellets();
    score += 50;
    for (var i = 0; i < 4 ; i ++) {
        if (Ghosts[i].edible === false){
            Ghosts[i].edible = true;
        }else if (Ghosts[i].edible === true){
            Ghosts[i].edible = true;
        }else{
            console.log('What are you doing?')
        }
    }
}

function checkPellets(){
    if (pellets === 0){
        console.log('\n No More pellets!');
    }
}

function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

// if (lives === 0); {
//     process.exit;

function eatCheckGhost(ghost){
    if (eatPowerPellet.called === true){
        score += 200;
        ghost.edible = false;
        console.log('\n You just killed' + ghost.name, ghost.color);
    } else if (ghost.edible === false) {
        if (lives === 0){
            process.exit();
            console.log('\n No more lives left');
            } else {
                lives--;
                console.log('\nYou just killed',ghost.color, ghost.name);
            }
    }else {
        console.log('\nEat!');
        score += 20;
        console.log('\nYou just killed',ghost.color, ghost.name);
    }
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case '1':
    eatCheckGhost(inky);
      break;
    case '2':
    eatCheckGhost(blinky);
      break;
    case '3':
    eatCheckGhost(pinky);
      break;
    case '4':
    eatCheckGhost(clyde);
      break;
    case 'p':
    eatPowerPellet();
        break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 500); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});
  // if (pellets === 0){
  //     drawScreen2();
  // }

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
