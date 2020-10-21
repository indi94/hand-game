var animeaux  = [
	"coq",
  "vache",
  "chevre",
  "mouton",
  "poule",
  "brebie",
  "canard",
  "ane",
  "chien",
  "chat",
]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = animeaux [Math.floor(Math.random() * animeaux.length)];
}
////fontion alphabe
function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}
///fonction 2
function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}
////fonction image
function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
}
//// gagner
function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'BRAVO!!!';
    document.getElementById('keyboard').style.backgroundColor ="#1c313a";
    document.getElementById('keyboard').style.color = "#73e8ff";
    document.getElementById('keyboard').style.width = "25%"
    document.getElementById('keyboard').style.borderRadius= "28%"
    document.getElementById('keyboard').style.padding = "5%"
    document.getElementById('keyboard').style.marginLeft = "37%"
    document.getElementById('keyboard').style.marginBottom = "5%"
    document.getElementById('keyboard').style.marginTop = "3%"
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'perdu!!!';
    document.getElementById('keyboard').style.color="#1c313a";
    document.getElementById('keyboard').style.fontFamily="calibre";
    document.getElementById('keyboard').style.fontSize="20px";
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();