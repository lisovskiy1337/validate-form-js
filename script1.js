"use strict";


document.addEventListener('DOMContentLoaded', () => {


    const form = document.querySelector('.validation__form'),
        reqItems = document.querySelectorAll('._req'),
        allInputs = document.querySelectorAll('.validation__input-input'),
        emailTest = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/,
        onlyTextTest = /^[a-zA-Z0-9@]+$/,
        onlyNums = /^[0-9]+$/;


    // tests regex function
    const inputTest = (example, input) => example.test(input.value);

    // adds _error class and if input is required append div _error-alert
    const formAddError = (input) => {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');

        if (input.classList.contains('_req')) {
            const createBlock = document.createElement('div');
            createBlock.classList.add('_error-alert');
            input.parentElement.insertAdjacentElement("beforeend", createBlock);
            createBlock.innerText = `Invalid ${input.getAttribute("name")}!`;
        }

    };

    // removes _error class 
    const formRemoveError = (input) => {
        if (input && input.parentElement.classList.contains('_error')) {
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
        }

    };

    const checkInput = () => {
        allInputs.forEach((reqInput, i) => {
            reqInput.addEventListener('input', (e) => {
                formRemoveError(reqInput);
                if (reqInput.nextElementSibling && reqInput.nextElementSibling.classList.contains('_error-alert')) {
                    reqInput.nextElementSibling.remove();
                }

            });
        });
    };
    checkInput();

    // "sends data"  if 0 errors
    const sendValidatedForm = (e) => {
        e.preventDefault();

        let error = validateForm(form);
        if (error === 0) {
            console.log('fine');
            document.querySelectorAll('._error-alert').forEach((errorAlert) => {
                errorAlert.remove();
            });
            allInputs.forEach(input => {
                formRemoveError(input);
            });
            form.reset();

        }
    };

    // form eventListener with function above
    form.addEventListener('submit', sendValidatedForm);

    // checks input and removes error classes if type something there



    const validol = (nameInput, testName) => {
        let error = 0;
        reqItems.forEach(reqInput => {
            if (reqInput.getAttribute("name") === nameInput) {
                if (!inputTest(testName, reqInput)) {
                    formAddError(reqInput);
                    ++error;

                }
            }
        });
        console.log(error);
        return error;
    };


    const obj = {
        email: validol('email', emailTest),
        phone: validol('phone', onlyNums),
        name: validol('name', onlyTextTest)
    };


    // 'validates' inputs with regex, counts errors, adds error classes
    const validateForm = (form) => {

        // allInputs.forEach(input => {
        //     input.value.trim().toLowerCase();
        //     formRemoveError(input);
        //     if (!input.classList.contains('_req')) {
        //         formAddError(input);
        //     }
        //     if (input.value.length) {
        //         formRemoveError(input);
        //     }
        // });

       

        let error = validol(obj);

        console.log(`error ${error}`);







        // reqItems.forEach(reqInput => {

        //     if (reqInput.getAttribute("name") == "email") {
        //         if (!inputTest(emailTest, reqInput)) {
        //             formAddError(reqInput);
        //             error++;
        //         }
        //     } else if (reqInput.getAttribute("name") == "phone") {
        //         if (reqInput.value.length != 10 || !inputTest(onlyNums, reqInput)) {
        //             formAddError(reqInput);
        //             error++;
        //         }
        //     } else if (reqInput.getAttribute("name") == "name") {
        //         if (!inputTest(onlyTextTest, reqInput)) {
        //             formAddError(reqInput);
        //             error++;
        //         }
        //     }
        // });




        return error;

    };




});