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
};

function stylePasswordCriteriaRow(isValid, element) {
    isValid ? element.classList.add('valid') : element.classList.remove('valid');
}

const registerFormPasswordElement = document.getElementById('register-password');

registerFormPasswordElement.addEventListener('input', e => {
    const lengthCheckElement = document.querySelector('.password-criteria li:nth-child(1)');
    const upperCaseLetterCheckElement = document.querySelector(
        '.password-criteria li:nth-child(2)'
    );
    const lowerCaseLetterCheckElement = document.querySelector(
        '.password-criteria li:nth-child(3)'
    );
    const numberCheckElement = document.querySelector('.password-criteria li:nth-child(4)');
    const notSpacesCheckElement = document.querySelector('.password-criteria li:nth-child(5)');
    const specialCharCheckElement = document.querySelector('.password-criteria li:nth-child(6)');

    const inputValue = e.target.value;

    const passwordHasMinLength = passwordValidationsMapper.validateLength(inputValue);
    stylePasswordCriteriaRow(passwordHasMinLength, lengthCheckElement);

    const passwordContainsUpperCaseLetter =
        passwordValidationsMapper.validateUpperCaseLetter(inputValue);
    stylePasswordCriteriaRow(passwordContainsUpperCaseLetter, upperCaseLetterCheckElement);

    const passwordContainsLowerCaseLetter =
        passwordValidationsMapper.validateLowerCaseLetter(inputValue);
    stylePasswordCriteriaRow(passwordContainsLowerCaseLetter, lowerCaseLetterCheckElement);

    const passwordContainsNumber = passwordValidationsMapper.validateNumber(inputValue);
    stylePasswordCriteriaRow(passwordContainsNumber, numberCheckElement);
});
