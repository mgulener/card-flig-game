export default class Card {
  constructor() {
    this.count = 0;
    this.selected = '';
    this.$cards = document.querySelector('.js-cards');
    this.cards = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H'
    ];
  }

  init = () => {
    this.newGame();
    this.$cardItem = document.querySelectorAll('.js-card-item');
    this.$cardItem.forEach((item) => item.addEventListener('click', this.onCardSelect));
  }

  newGame = () => {
    let randomCards1 = [];
    let randomCards2 = [];
    let cards1 = [
      ...this.cards
    ];
    let cards2 = [
      ...this.cards
    ];

    for (let i = cards1.length; i > 0; --i) {
      randomCards1.push(cards1.splice(Math.random() * i | 0, 1)[0]);
    }

    for (let x = cards2.length; x > 0; --x) {
      randomCards2.push(cards2.splice(Math.random() * x | 0, 1)[0]);
    }

    const allRandomCards = randomCards1.concat(randomCards2);
    let cardTemp = '';

    allRandomCards.map(card => cardTemp +=
      `<div class="js-card-item card-item">
        <div class="card-item-inner">
          <div class="card-item-front">X</div>
          <div class="card-item-back">${card}</div>
        </div>
      </div>`
    );
    this.$cards.innerHTML = cardTemp;
  }

  onCardSelect = (e) => {
    const _this = e.currentTarget;

    if (!_this.classList.contains('success') || !_this.classList.contains('selected') || !this.count > 2) {
      this.count++;

      if (this.count <= 2) {
        _this.classList.add('selected');
      }

      if (this.count == 1) {
        this.selected = _this.innerText;
      } else if (this.count == 2) {
        if (_this.innerText == this.selected) {
          this.equalCards();
        } else {
          this.resetSelectedCards();
        }
      } else {
        this.resetCards();
      }
    } else {
      return;
    }
  }

  resetCards = () => {
    this.selected = '';
    this.count = 0;
    this.$cardItem.forEach((item) => item.classList.remove('selected'));
  }

  resetSelectedCards = () => {
    const _this = this;

    setTimeout(() => {
      _this.resetCards();
    }, 1000);
  }

  equalCards = () => {
    this.$cardItem.forEach((item) => {
      if (item.classList.contains('selected')) {
        item.classList.remove('selected');
        item.classList.add('success');
      }
    });

    this.$selectedCardItems = document.querySelectorAll('.js-card-item.success');

    setTimeout(() => {
      if (this.$cardItem.length == this.$selectedCardItems.length) {
        alert('Wiinnn!');
      }
    }, 1000);

    this.resetCards();
  }
}
