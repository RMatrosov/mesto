export default class FormValidator {
    constructor(props, validateElement) {
        this._inputSelector = props.inputSelector;
        this._submitButtonSelector = props.submitButtonSelector;
        this._inactiveButtonClass = props.inactiveButtonClass;
        this._inputErrorClass = props.inputErrorClass;
        this._errorClass = props.errorClass;
        this._validateElement = validateElement;
        this._inputList = Array.from(this._validateElement.querySelectorAll(this._inputSelector));
        this._buttonElement = this._validateElement.querySelector(this._submitButtonSelector);
    }

    enableValidation() {
        this._validateElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    _setEventListeners() {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.isValid(inputElement);
                this.toggleButtonState();
            });
        });
    };

    toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this.addBtnDisables(this._buttonElement);
        } else {
            this._removeBtnDisabled(this._buttonElement);
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    addBtnDisables = () => {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.setAttribute('disabled', true);

    }

    _removeBtnDisabled = () => {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
    }

    isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _showInputError = (inputElement) => {
        const errorElement = this._validateElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._validateElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    resetValidation() {
        this.toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }

}







