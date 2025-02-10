document.addEventListener(
    'invalid',
    (function () {
        return function (e) {
            e.preventDefault();

            const inputElements = document.querySelectorAll('input:user-invalid');

            const firstInputElement = inputElements[0];

            firstInputElement.focus();
        };
    })(),
    true
);

const passwordMinLength = 6;

const passwordValidationsMapper = {
    validateLength: input => input.length >= passwordMinLength,
    validateUpperCaseLetter: input => input.match(/[A-Z]{1,}/g),
    validateLowerCaseLetter: input => input.match(/[a-z]{1,}/g),
    validateNumber: input => input.match(/[0-9]{1,}/g),
    validateNoWhiteSpaces: input => input.match(/^\S*$/),
    validateSpecialChar: input => input.match(/[!#$%]{1,}/g),
};

function stylePasswordCriteriaRow(isValid, checkElement, scaleElement) {
    if (isValid) {
        checkElement.classList.add('valid');
        scaleElement.classList.add('valid');
    } else {
        checkElement.classList.remove('valid');
        scaleElement.classList.remove('valid');
    }
}

const registerFormPasswordElement = document.getElementById('register-password');
const loginFormPasswordElement = document.getElementById('login-password');

registerFormPasswordElement.addEventListener('input', e => {
    const lengthCheckElement = document.querySelector('.password-criteria li:nth-child(1)');
    const lengthScaleElement = document.querySelector('.password-validation-scale li:nth-child(1)');

    const upperCaseLetterCheckElement = document.querySelector(
        '.password-criteria li:nth-child(2)'
    );
    const upperCaseLetterScaleElement = document.querySelector(
        '.password-validation-scale li:nth-child(2)'
    );

    const lowerCaseLetterCheckElement = document.querySelector(
        '.password-criteria li:nth-child(3)'
    );
    const lowerCaseLetterScaleElement = document.querySelector(
        '.password-validation-scale li:nth-child(3)'
    );

    const numberCheckElement = document.querySelector('.password-criteria li:nth-child(4)');
    const numberScaleElement = document.querySelector('.password-validation-scale li:nth-child(4)');

    const noSpacesCheckElement = document.querySelector('.password-criteria li:nth-child(5)');
    const noSpacesScaleElement = document.querySelector(
        '.password-validation-scale li:nth-child(5)'
    );

    const specialCharCheckElement = document.querySelector('.password-criteria li:nth-child(6)');
    const specialCharScaleElement = document.querySelector(
        '.password-validation-scale li:nth-child(6)'
    );

    const inputValue = e.target.value;

    const passwordHasMinLength = passwordValidationsMapper.validateLength(inputValue);
    stylePasswordCriteriaRow(passwordHasMinLength, lengthCheckElement, lengthScaleElement);

    const passwordContainsUpperCaseLetter =
        passwordValidationsMapper.validateUpperCaseLetter(inputValue);
    stylePasswordCriteriaRow(
        passwordContainsUpperCaseLetter,
        upperCaseLetterCheckElement,
        upperCaseLetterScaleElement
    );

    const passwordContainsLowerCaseLetter =
        passwordValidationsMapper.validateLowerCaseLetter(inputValue);
    stylePasswordCriteriaRow(
        passwordContainsLowerCaseLetter,
        lowerCaseLetterCheckElement,
        lowerCaseLetterScaleElement
    );

    const passwordContainsNumber = passwordValidationsMapper.validateNumber(inputValue);
    stylePasswordCriteriaRow(passwordContainsNumber, numberCheckElement, numberScaleElement);

    const passwordContainsNoWhiteSpaces =
        passwordValidationsMapper.validateNoWhiteSpaces(inputValue);
    stylePasswordCriteriaRow(
        passwordContainsNoWhiteSpaces,
        noSpacesCheckElement,
        noSpacesScaleElement
    );

    const passwordContainsSpecialChar = passwordValidationsMapper.validateSpecialChar(inputValue);
    stylePasswordCriteriaRow(
        passwordContainsSpecialChar,
        specialCharCheckElement,
        specialCharScaleElement
    );
});

const loginShowPasswordElement = document.getElementById('login-show-password');
const loginHidePasswordElement = document.getElementById('login-hide-password');
const registerShowPasswordElement = document.getElementById('register-show-password');
const registerHidePasswordElement = document.getElementById('register-hide-password');

loginShowPasswordElement.addEventListener('click', e => {
    showPassword(loginShowPasswordElement, loginHidePasswordElement, loginFormPasswordElement);
});

loginHidePasswordElement.addEventListener('click', e => {
    hidePassword(loginShowPasswordElement, loginHidePasswordElement, loginFormPasswordElement);
});

registerShowPasswordElement.addEventListener('click', e => {
    showPassword(
        registerShowPasswordElement,
        registerHidePasswordElement,
        registerFormPasswordElement
    );
});

registerHidePasswordElement.addEventListener('click', e => {
    hidePassword(
        registerShowPasswordElement,
        registerHidePasswordElement,
        registerFormPasswordElement
    );
});

function showPassword(firstElement, secondElement, form) {
    firstElement.style.display = 'none';
    secondElement.style.display = 'block';

    form.type = 'text';
}

function hidePassword(firstElement, secondElement, form) {
    firstElement.style.display = 'block';
    secondElement.style.display = 'none';

    form.type = 'password';
}

const expiryMonthSelectElement = document.getElementById('expiry-month');
const expiryYearSelectElement = document.getElementById('expiry-year');

const monthYearLimit = 12;

const date = new Date();

const currentMonth = date.getMonth() + 1;
const currentYear = date.getFullYear();
expiryMonthSelectElement.addEventListener('focus', e => {
    createExpiryDateDropdownContent(expiryMonthSelectElement, 1);
});

expiryYearSelectElement.addEventListener('focus', e => {
    createExpiryDateDropdownContent(expiryYearSelectElement, currentYear);
});

function createExpiryDateDropdownContent(selectElement, valueToIncrement) {
    const monthYearLimit = 12;

    selectElement.innerText = '';
    const emptyOption = document.createElement('option');
    emptyOption.setAttribute('hidden', true);
    selectElement.appendChild(emptyOption);

    for (let i = 0; i < monthYearLimit; i++) {
        const optionElement = document.createElement('option');

        optionElement.value = valueToIncrement + i;
        optionElement.textContent = valueToIncrement + i;
        selectElement.appendChild(optionElement);
    }
}

const cardDetailsFormSubmitElement = document.querySelector(
    '#card-details-form input[type="submit"]'
);
const expiredCardErrorMessageElement = document.querySelector('.expired-card-error-message');

cardDetailsFormSubmitElement.addEventListener('click', e => {
    const expiryMonth = expiryMonthSelectElement.value;
    const expiryYear = expiryYearSelectElement.value;

    const hasCardExpired = validateExpiryDate(expiryMonth, expiryYear);

    if (hasCardExpired) {
        expiryMonthSelectElement.classList.add('invalid');
        expiryYearSelectElement.classList.add('invalid');

        expiredCardErrorMessageElement.style.display = 'block';
    } else {
        expiryMonthSelectElement.classList.remove('invalid');
        expiryYearSelectElement.classList.remove('invalid');
        expiredCardErrorMessageElement.style.display = 'none';
    }
});

function validateExpiryDate(expiryMonth, expiryYear) {
    if (expiryYear < currentYear) {
        return true;
    } else if (expiryYear > currentYear) {
        return false;
    } else if (expiryMonth > currentMonth) {
        return false;
    } else {
        return true;
    }
}

const cardNumberInputElement = document.getElementById('card-number');

// cardDetailsFormSubmitElement.addEventListener('click', e => {

// })

const visaCardStartDigit = 4;
const visaCardNumberLength = 16;
const visaCardCVVLength = 3;

cardNumberInputElement.addEventListener('input', e => {
    const cardNumberValue = cardNumberInputElement.value;

    const firstDigit = Number(cardNumberValue[0]);

    if (firstDigit === visaCardStartDigit) {
        cardNumberInputElement.pattern = '^4[0-9]{15}$';
        cardNumberInputElement.maxLength = visaCardNumberLength;
    }

    let value = cardNumberValue.replace(/\D/g, '');
    let formattedValue = '';

    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }

    cardNumberInputElement.value = formattedValue;
});
