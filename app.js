document.addEventListener("DOMContentLoaded", function(event) {

  const startGameBtn = document.querySelector(".btn__reset");
  const qwerty = document.getElementById("qwerty");

  let missed = 0;

  const phrases = [
     "Two roads diverged in a yellow wood",
     "And sorry I could not travel both",
     "And be one traveler long I stood",
     "And looked down one as far as I could",
     "To where it bent in the undergrowth"
   ];

  const getRandomPhraseAsArray = (arr) => {
    return arr[Math.round(Math.random() * (arr.length - 1))].split('');
  };

  const addPhraseToDisplay = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const li = document.createElement('li');
      li.textContent = arr[i].toUpperCase();
      document.querySelector('ul').appendChild(li);

      if (arr[i] != ' ') {
        li.classList.add('letter');
      } else {
        li.classList.add('space');
      }
    }
  };

  const checkLetter = (button) => {
    const letters = document.querySelectorAll(".letter");
    let match = null;

    for (let i = 0; i < letters.length; i++) {
      if (button.textContent.toUpperCase() == letters[i].textContent) {
        match = button.textContent;
        letters[i].classList.add("show");
      }
      }
    return match;
  };

  const checkWin = () => {
    const overlay = document.getElementById("overlay");
    const shownLetters = document.querySelectorAll(".show");
    const letters = document.querySelectorAll(".letter");

    if (shownLetters.length == letters.length) {
      overlay.classList.replace("start", "win");
      overlay.children[0].textContent = "You Won!";
      overlay.children[1].textContent = "Play Again";
      overlay.style.display = "";
    } else if (missed === 5) {
      overlay.classList.replace("start", "lose");
      overlay.children[0].textContent = "You Lost!";
      overlay.children[1].textContent = "Try Again";
      overlay.style.display = "";
    }
  };

  function restart() {
    location.reload();
  }

  // EVENT LISTENER

  startGameBtn.addEventListener("click", () => {
      if (startGameBtn.textContent === 'Start Game') {
        const overlay = document.getElementById("overlay");
        overlay.style.display = "none";
      } else {
        restart();
      }
  });

  qwerty.addEventListener("click", (e) => {
  const buttonClicked = e.target;

  if (e.target.tagName === "BUTTON") {
    buttonClicked.className = "chosen";
    buttonClicked.disabled = true;

    const letterFound = checkLetter(buttonClicked);

    if (letterFound === null) {
      missed += 1;
    }

    if (missed >= 1 && missed <= 5) {
      const hearts = document.getElementsByTagName("img");
      hearts[missed - 1].src = "images/lostHeart.png";
    }
  }
  checkWin();
});

  // Function calling

  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);

});
