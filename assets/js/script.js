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
