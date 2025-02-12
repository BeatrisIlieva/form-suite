let lastScrollY = 0;

window.addEventListener('scroll', e => {
    const currentScrollY = window.scrollY;
    const headerElement = document.querySelector('header.layout-item.site-header');

    if (currentScrollY > 160 && currentScrollY > lastScrollY) {
        headerElement.classList.remove('visible');
        headerElement.classList.add('hidden');
    } else if (currentScrollY < lastScrollY) {
        headerElement.classList.remove('hidden');
        headerElement.classList.add('visible');
    }

    lastScrollY = currentScrollY;
});

const submitElements = document.querySelectorAll('input[type="submit"]');

submitElements.forEach(element => {
    element.addEventListener('click', e => {
        const formElement = element.closest('form');

        const invalidInputs = formElement.querySelectorAll(':invalid');

        const formIsInvalid = invalidInputs.length > 0;

        let hasCardExpired;

        if (formElement.id === 'card-details-form') {
            const expiryMonth = expiryMonthSelectElement.value;
            const expiryYear = expiryYearSelectElement.value;

            hasCardExpired = validateExpiryDate(expiryMonth, expiryYear);

            toggleExpiredCardStyles(hasCardExpired);
        }

        if (formIsInvalid || hasCardExpired) {
            invalidInputs.forEach(input => {
                const inputIsEmpty = input.value.trim() === '';

                if (inputIsEmpty) {
                    input.classList.add('invalid-empty');
                } else {
                    input.classList.add('invalid-pattern');
                }
            });
            return;
        }

        e.preventDefault();

        const validInputs = formElement.querySelectorAll('input');

        validInputs.forEach(input => {
            input.classList.remove('invalid-empty');
            input.classList.remove('invalid-pattern');
        });

        const confirmationElement = element.nextElementSibling;

        confirmationElement.style.display = 'block';

        formElement.reset();
    });
});

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

expiryMonthSelectElement.addEventListener('click', e => {
    createExpiryDateDropdownContent(expiryMonthSelectElement, 1);
});

expiryMonthSelectElement.addEventListener('change', e => {
    const expiryMonth = expiryMonthSelectElement.value;
    const expiryYear = expiryYearSelectElement.value;

    if (expiryMonth && expiryYear) {
        const hasCardExpired = validateExpiryDate(expiryMonth, expiryYear);
        toggleExpiredCardStyles(hasCardExpired);
    }
});

expiryYearSelectElement.addEventListener('focus', e => {
    createExpiryDateDropdownContent(expiryYearSelectElement, currentYear);
});

expiryYearSelectElement.addEventListener('click', e => {
    createExpiryDateDropdownContent(expiryYearSelectElement, currentYear);
});

expiryYearSelectElement.addEventListener('change', e => {
    const expiryMonth = expiryMonthSelectElement.value;
    const expiryYear = expiryYearSelectElement.value;

    if (expiryMonth && expiryYear) {
        const hasCardExpired = validateExpiryDate(expiryMonth, expiryYear);
        toggleExpiredCardStyles(hasCardExpired);
    }
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

const expiredCardErrorMessageElement = document.querySelector('.expired-card-error-message');

function toggleExpiredCardStyles(hasCardExpired) {
    if (hasCardExpired) {
        expiryMonthSelectElement.classList.add('invalid');
        expiryYearSelectElement.classList.add('invalid');

        expiredCardErrorMessageElement.style.display = 'block';
    } else {
        expiryMonthSelectElement.classList.remove('invalid');
        expiryYearSelectElement.classList.remove('invalid');

        expiredCardErrorMessageElement.style.display = 'none';

        // expiryMonthSelectElement.classList.add('valid');
        // expiryYearSelectElement.classList.add('valid');
    }
}

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

const visaCardIconElement = document.getElementById('visa-card-icon');
const masterCardIconElement = document.getElementById('master-card-icon');

function displayVisaCardIconElement() {
    visaCardIconElement.style.display = 'inline-block';
    masterCardIconElement.style.display = 'none';
}

function displayMasterCardIconElement() {
    visaCardIconElement.style.display = 'none';
    masterCardIconElement.style.display = 'inline-block';
}

function hideCardIconElements() {
    visaCardIconElement.style.display = 'none';
    masterCardIconElement.style.display = 'none';
}

const paymentCardsMapper = {
    4: {
        pattern: '^4[0-9]{3} [0-9]{4} [0-9]{4} [0-9]{4}$',
        displayCardFunction: displayVisaCardIconElement,
    },
    51: {
        pattern: '^51[0-9]{2} [0-9]{4} [0-9]{4} [0-9]{4}$',
        displayCardFunction: displayMasterCardIconElement,
    },
    55: {
        pattern: '^55[0-9]{2} [0-9]{4} [0-9]{4} [0-9]{4}$',
        displayCardFunction: displayMasterCardIconElement,
    },
    222: {
        pattern: '^222[0-9]{1} [0-9]{4} [0-9]{4} [0-9]{4}$',
        displayCardFunction: displayMasterCardIconElement,
    },
    227: {
        pattern: '^227[0-9]{1} [0-9]{4} [0-9]{4} [0-9]{4}$',
        displayCardFunction: displayMasterCardIconElement,
    },
    27: {
        pattern: '^27[0-9]{2} [0-9]{4} [0-9]{4} [0-9]{4}$',
        displayCardFunction: displayMasterCardIconElement,
    },
};

cardNumberInputElement.addEventListener('input', e => {
    let previousLength;
    const cardNumberValue = cardNumberInputElement.value;
    previousLength = cardNumberValue.length;

    const firstDigit = Number(cardNumberValue[0]);
    const firstTwoDigits = Number(cardNumberValue.substring(0, 2));
    const firstThreeDigits = Number(cardNumberValue.substring(0, 3));

    let pattern;
    if (paymentCardsMapper.hasOwnProperty(firstDigit)) {
        pattern = paymentCardsMapper[firstDigit].pattern;
        paymentCardsMapper[firstDigit].displayCardFunction();
    } else if (paymentCardsMapper.hasOwnProperty(firstTwoDigits)) {
        pattern = paymentCardsMapper[firstTwoDigits].pattern;
        paymentCardsMapper[firstTwoDigits].displayCardFunction();
    } else if (paymentCardsMapper.hasOwnProperty(firstThreeDigits)) {
        pattern = paymentCardsMapper[firstThreeDigits].pattern;
        paymentCardsMapper[firstThreeDigits].displayCardFunction();
    } else {
        hideCardIconElements();
    }

    cardNumberInputElement.pattern = pattern;

    const cursorPosition = cardNumberInputElement.selectionStart;

    let value = cardNumberValue.replace(/\D/g, '');
    let formattedValue = '';

    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }

    cardNumberInputElement.value = formattedValue;

    let newCursorPosition;

    if (previousLength > formattedValue.length) {
        newCursorPosition = cursorPosition - 1;
    } else if (previousLength < formattedValue.length) {
        newCursorPosition = formattedValue.length;
    } else if (previousLength === formattedValue.length) {
        newCursorPosition = cursorPosition;
    } else {
        console.log(previousLength, formattedValue.length);
        newCursorPosition = cursorPosition + 1;
    }

    cardNumberInputElement.setSelectionRange(newCursorPosition, newCursorPosition);
});
