'use strict';

const form = document.querySelector('.validation__form'),
    reqItems = document.querySelectorAll('._req'),
    allInputs = document.querySelectorAll('.validation__input-input'),
    emailTest = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/,
    onlyTextTest = /^[a-zA-Z0-9@]+$/,
    onlyNums = /^[0-9]+$/;



form.addEventListener('submit', (e) => {
    e.preventDefault();
    some();
});


const some = () => {
    allInputs.forEach(input => {
        input.classList.add('_error');
        if( input.classList.contains('_req')) {
            reqItems.forEach(reqInput => {
                
                if (reqInput.getAttribute("name") == "email") {
                    if (!inputTest(emailTest, reqInput)) {
                        formAddError(reqInput);
                        error++;
                    }
                } else if (reqInput.getAttribute("name") == "phone"  )  {
                    if (!inputTest(onlyNums, reqInput) && reqInput.value.length < 8) {
                        formAddError(reqInput);
                        error++;
                    }
                } else if (reqInput.getAttribute("name") == "name") {
                    if (!inputTest(onlyTextTest, reqInput)) {
                        formAddError(reqInput);
                        error++;
                    }
                } 
            });
        }
    });
};

