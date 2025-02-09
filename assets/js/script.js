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

const registerFormPasswordElement = document.getElementById('register-password');

registerFormPasswordElement.addEventListener('input', e => {
    const lengthCheckElement = document.querySelector('.password-criteria li:nth-child(1)');
    const upperAndLowerCaseLetterCheckElement = document.querySelector(
        '.password-criteria li:nth-child(2)'
    );
    const numberCheckElement = document.querySelector('.password-criteria li:nth-child(3)');
    const notSpacesCheckElement = document.querySelector('.password-criteria li:nth-child(4)');
    const specialCharCheckElement = document.querySelector('.password-criteria li:nth-child(5)');

    console.log(e.target.value);

    const inputValue = e.target.value;

    if (inputValue.length >= 6) {
        lengthCheckElement.classList.add("valid"); // Toggle valid class
    } else {
        lengthCheckElement.classList.remove("valid");
    }
});
