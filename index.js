window.onload = function() {
    //var counter = document.getElementById('counter');
    var table = document.getElementById('table');

    //создадим счетчик
    const counter = document.createElement('div');
    counter.setAttribute('id', 'counter');
    counter.textContent = '9';

    //создать карточки
    var cards = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7];

    //перемешать массив
    cards.sort(() => Math.random() - 0.5);

    //добавим счетчик в массив
    cards.splice(7, 0, 0)

    var cardElements = cards.map(function(pic, index) {
        if (pic) {
            const card = document.createElement('img');
            card.setAttribute('src', `img/${pic}.webp`);
            card.setAttribute('pic', pic);
            card.setAttribute('index', index);
            card.classList.add('card');
            return card;
        } else {
            return counter;
        }
    });

    cardElements.forEach(function(card) {
        table.appendChild(card);
    });

    function getPic(card) {
        return card.getAttribute ? card.getAttribute('pic') : null;
    }

    function closeCard(card) {
        if (card.setAttribute) {
            card.setAttribute('src', 'img/back.webp');
        }
    }

    function openCard(card) {
        if (card.setAttribute) {
            var pic = getPic(card);
            card.setAttribute('src', `img/${pic}.webp`);
        }
    }

    function isOpen(card) {
        return (card.getAttribute('src') !== 'img/back.webp');
    }

    var firstCard = null;
    var disableClick = false;
    var openedCard = 0;
    // клик на карту
    function onCardClick() {
        if (disableClick || isOpen(this)) {
            return;
        }
        openCard(this);
        if (!firstCard) {
            firstCard = this;
        } else {
            if (getPic(this) !== getPic(firstCard)) {
                disableClick = true;
                setTimeout(function() {
                    closeCard(this);
                    closeCard(firstCard);
                    firstCard = null;
                    disableClick = false;
                }.bind(this), 1000);
            } else {
                firstCard = null;
                openedCard = openedCard + 1;
                //проверить победу
                if (openedCard >= 7) {
                    disableClick = true;
                    console.log('win');
                    const winImg = document.createElement('img');
                    winImg.setAttribute('src', 'img/win.webp');
                    winImg.classList.add('card');
                    counter.appendChild(winImg);
                }
            }
        }
        
    }

    //запустить счетчик
    var counterInterval = setInterval(function() {
        var counterValue = parseInt(counter.textContent, 10);
        counterValue = counterValue - 1;
        counter.textContent = counterValue;
        if (counterValue < 1) {
            clearInterval(counterInterval);
            counter.textContent = '';
            table.childNodes.forEach(function(child) {
                closeCard(child);
                if (child.addEventListener && getPic(child)) {
                    child.addEventListener('click', onCardClick);
                }
            });
        }
    }, 1000);
}