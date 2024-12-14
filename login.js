const nameInput = document.getElementById('nameInput')
const nameInputError = document.getElementById('nameInputError')
const nameRegex = /^[A-Z]+$/i;


const emailInput = document.getElementById('emailInput')
const emailInputError = document.getElementById('emailInputError')
const emailRegex = /^\S+@\S+\.\S+$/;

const passwordInput = document.getElementById('passwordInput')
const passwordInputError = document.getElementById('passwordInputError')
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

function validateName(name){
    nameInputError.style.display = 'none';
    if(!nameRegex.test(name)){
        nameInputError.style.display = 'block';
        return false;
    }
    else
    return true;
}
function validateEmail(email){
    emailInputError.style.display = 'none';
    if(!emailRegex.test(email)){
        emailInputError.style.display = 'block';
        return false;
    }
    else
    return true;
}
function validatePassword(password){
    passwordInputError.style.display = 'none';
    if(!passwordRegex.test(password)){
        passwordInputError.style.display = 'block';
        return false;
    }
    else
    return true;
}


const signBtn = document.getElementById('signBtn');
signBtn.addEventListener('click', ()=>{
    validateName(nameInput.value);
    validateEmail(emailInput.value);
    validatePassword(passwordInput.value);
    if(validateName(nameInput.value) && validateEmail(emailInput.value) && validatePassword(passwordInput.value)){
        localStorage.setItem('name', nameInput.value);
        window.location.href = 'index.html';
    }
    else{
        return 0;
    }
})

const checkbox = document.getElementById('password-checkbox');
checkbox.addEventListener('click', ()=>{
    if(checkbox.checked){
        passwordInput.type = 'text';
    }
    else{
        passwordInput.type = 'password';
    }
})