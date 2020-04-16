var randomNumber = Math.floor(Math.random() * 100) + 1;

// index.html안의 클래스에 넣어줌
var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

// 사용자의 입력 받아옴
var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

var guessCount = 1;
var resetButton;

guessField.focus();

// 입력한 숫자 확인하는 함수
function checkGuess() {
    var userGuess = Number(guessField.value);
    // 게임이 처음인지 아닌지 판단
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it';
        guesses.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!Game Over!!!';
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        guesses.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!'
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

// 게임 다시 시작할 것인지 묻는 함수
function setGameOver() {
    guessField.disabled = true; // 비활성화
    guessSubmit.disabled = true; // 비활성화

    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

// 게임 초기화하는 함수
function resetGame() {
    guessCount = 1;

    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false; // 활성화
    guessSubmit.disabled = false; // 활성화
    guessField.value = '';
    guessField.focus();

    guesses.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}