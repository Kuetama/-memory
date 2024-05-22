// Карточки
class Card {

  _open = false
  _success = false

  constructor(container, number, action) {
    this.card = document.createElement('div')
    this.card.classList.add('card')
    this.card.textContent = number
    this.number = number
    this.card.addEventListener('click', () => {
      if (this.open == false && this.success == false) {
        this.open = true
        action(this)

      }

    })

    container.append(this.card)

  }

  set open(value) {
    this._open = value
    if (value) {
      this.card.classList.add('open')
    } else {
      this.card.classList.remove('open')
    }
  }
  get open() {
    return this._open
  }


  set success(value) {
    this._open = value
    if (value) {
      this.card.classList.add('success')
    } else {
      this.card.classList.remove('success')
    }
  }
  get success() {
    return this._open
  }




}


// логика
function newGame(container, cardsCount) {

  container.innerHTML = ''

  let interval;
  let seconds = 60;

  // Таймер 3  
  const secondsBlock = document.querySelector('.js-seconds'),
    btnStart = document.querySelector('.js-btn-start');

  btnStart.addEventListener('click', () => {
    interval = setInterval(startTimer, 1000);
  });

  // let interval;
  // let seconds = 60;

  const startTimer = () => {
    if (seconds > 0) {
      seconds--;
      seconds = seconds;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      secondsBlock.innerHTML = seconds;
    } else {
      clearInterval(interval);

      alert("Время зкончилось!");
      alert('Сыграем еще?');
      window.location.reload();
      container.innerHTML = ''
    }
  };



  let cardsNumberArray = [],
    cardsArray = [],
    firstCard = null,
    secondCard = null

  for (let i = 1; i <= cardsCount / 2; i++) {
    cardsNumberArray.push(i)
    cardsNumberArray.push(i)
  }

  cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5);

  for (const cardNumber of cardsNumberArray) {
    cardsArray.push(new Card(container, cardNumber, flip))
  }

  function flip(card) {

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number != secondCard.number) {
        firstCard.open = false
        secondCard.open = false
        firstCard = null
        secondCard = null
      }
    }

    if (firstCard == null) {
      firstCard = card
    } else {
      if (secondCard == null) {
        secondCard = card
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.success = true
        secondCard.success = true
        firstCard = null
        secondCard = null
      }
    }

    if (document.querySelectorAll('.card.success').length == cardsNumberArray.length) {
      alert('Игра окончена!');
      clearInterval(interval);
      window.location.reload();

      container.innerHTML = ''
      cardsNumberArray = [],
        cardsArray = [],
        firstCard = null,
        secondCard = null


      newGame(container, cardsCount)
      container.innerHTML = ''
    }
  }
}


let gameSection = document.getElementById('level-select');
let button = document.getElementById('level');

button.addEventListener('click', cardsCount);


function cardsCount() {
  let cardsCount = Number(prompt('Введите количество карт'))

  alert('Начинаем игру!', newGame(document.getElementById('game'), cardsCount))

  if (cardsCount == '' || cardsCount % 2 !== 0 || cardsCount > 16 ) {
    newGame(document.getElementById('game'), 4)
  }
  else {
    container.innerHTML = ''
    newGame(document.getElementById('game'), cardsCount.value)
  }


}


