import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {formSubmit}) {
        super(popupSelector)
        this._formSubmit = formSubmit;
        this._form = this._element.querySelector('.form');
    }

    _getInputValues() {
        const newInfo = {};
        this._inputValues = this._form.querySelectorAll('.form__input');
        this._inputValues.forEach((input) => {
            newInfo[input.name] = input.value;
        })
        return newInfo;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
                this._formSubmit(this._getInputValues())
        })
    }

    close() {
        super.close();
        this._form.reset();
    }
}