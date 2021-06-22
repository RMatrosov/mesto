
export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._toggleLike(evt);
        });
        this._element.querySelector('.element__button-delete').addEventListener('click', (evt) => {
            this._removeCard(evt);
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._toBigImg()
        });
    }

    _toggleLike(evt) {
        evt.target.classList.toggle('element__like_active');
    };

    _removeCard(evt){
        evt.target.closest('.element').remove();
    };

    _toBigImg(){
        popupTypeImageTitle.textContent = this._name;
        bigImage.alt = this._name;
        bigImage.src = this._link;
        openPopup(imagePopup)
    }

}


/*
const renderElements = () => {
    let card = new Card(initialCard, '.element_template')

    const cardElement = card.generateCard();
    console.log(cardElement)
    elementsList.append(cardElement);

};
renderElements()*/
