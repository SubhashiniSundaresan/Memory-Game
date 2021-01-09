window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const cards = document.querySelectorAll(".memory-card");
    console.log(cards);
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
    var firstCard = null;
    var secondCard = null;
    let hasFlippedCard = false;
  let lockBoard = false;
    cards.forEach((card) => card.addEventListener("click", flipCard));

    function flipCard() {
       if (lockBoard) return; //if the board has been flipped do nothing just return 
        if (this === firstCard) return; // if the card clicked is same as first card, do nothing 
        this.classList.add("flip"); // otherwise add the css class "flip" 
        if (!hasFlippedCard) {
            hasFlippedCard = true; //set hasflipped to true 
            firstCard = this; // assign the clicked card to firstcard 
            return;
        }
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        hasFlippedCard = false;
        lockBoard = false;
        firstCard = null;
        secondCard = null;
    }




})