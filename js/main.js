//  ^ ========= VARIABLES ========== ^

let inputName = document.querySelector('#name');
let inputEMail = document.querySelector('#eMail');
let inputPassword = document.querySelector('#password');
let lblMessage = document.querySelector('#lblMessage');
let btnLogin = document.querySelector('#login');
let btnSignup = document.querySelector('#signup');


if (btnLogin != null) {
    btnLogin.addEventListener("click", login);

    inputPassword.addEventListener('keydown',
        function (event) {
            
            if (event.key === 'Enter')
                {
                    login()
                }
        }
        
    )
    

}

if (btnSignup != null) {

    btnSignup.addEventListener('click', addUser);

    inputPassword.addEventListener('keydown',
        function (event) {
            
            if (event.key === 'Enter')
                {
                    addUser()
                }
        }
        
    )
    
}



let usersList = [];

function singupValidation() {
    if (inputName.value == '' || inputEMail.value == '' || inputPassword.value == '') {
        lblMessage.innerHTML = 'All inputs are required';

        if (inputName.value == '')
             {
                inputName.classList.add('is-invalid')
             }

             if (inputEMail.value == '')
                {
                   inputEMail.classList.add('is-invalid')
                }

                if (inputPassword.value == '')
                    {
                        inputPassword.classList.add('is-invalid')
                    }
        return false;
    }
    if (inputName.value.length < 3) {
        lblMessage.innerText = 'Your name must be at least 3 character';
        return false;


    }

    if (isValidEmail(inputEMail.value) == false) {
        lblMessage.innerText = 'Your eMail is not valid';
        return false;

    }

    if (inputPassword.value.length < 6) {
        lblMessage.innerText = 'Your password must not be less than 6 character';
        return false;

    }

    inputName.classList.remove('is-invalid');
    inputEMail.classList.remove('is-invalid');
    inputPassword.classList.remove('is-invalid');

    inputName.classList.add('is-valid');
    inputEMail.classList.add('is-valid');
    inputPassword.classList.add('is-valid');

    


    return true;
}

function addUser() {
    if (singupValidation() == true) {
        let user =
        {
            name: inputName.value,
            email: inputEMail.value,
            password: inputPassword.value
        };

        fillUsersListFromLocalStorage()

        let userInArray = usersList.find(x => x.name == user.name && x.eMail == user.eMail)
        if (userInArray != null) {
            lblMessage.innerText = `${user.name} and his email: ${user.email} already exist `;
            lblMessage.style.cssText = 'color:fuchsia !important';
            return false;
        }

        usersList.push(user);

        addToLocalStorage();

        lblMessage.innerText = 'Your data was registered.';
        lblMessage.style.cssText = 'color: green !important'
        lblMessage.style.fontWeight = 900;
        window.location.href = "../index.html";
    }
    

}

function addToLocalStorage() {
    (localStorage.key == 'usersListKey')

    localStorage.setItem('usersListKey', JSON.stringify(usersList))


}

function isValidEmail(eMail) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const reg1 = new RegExp(emailPattern)
    return reg1.test(eMail);
}


function signinValidation() {
   
    if (isValidEmail(inputEMail.value) == false) {
        lblMessage.innerText = 'Your eMail is not valid';
        lblMessage.style.cssText = 'color:orange !important';

        if (inputEMail.value == '')
            {
               inputEMail.classList.add('is-invalid')
            }

            if (inputPassword.value == '')
                {
                    inputPassword.classList.add('is-invalid')
                }

        return false;

    }

    if (inputPassword.value.length < 6) {
        lblMessage.innerText = 'Your password must not be less than 6 character';
        lblMessage.style.cssText = 'color:red !important';
        inputPassword.classList.add('is-invalid');
        return false;

    }

    inputEMail.classList.remove('is-invalid');
    inputPassword.classList.remove('is-invalid');

    inputEMail.classList.add('is-valid');
    inputPassword.classList.add('is-valid');

    return true;
}

function login ()
{
    if (signinValidation() == true) {
        
        if (fillUsersListFromLocalStorage() == true ) {
            console.log(usersList);
            let userCheck = usersList.find(x => x.email == inputEMail.value && x.password == inputPassword.value );
            if (userCheck == null) {
                lblMessage.innerText = 'Your eMail or password is wrong';
                lblMessage.style.cssText = 'color:red !important; font-size:18px';
            }
            else
            {
                lblMessage.innerText = `Welcome ${userCheck.name} 🎉😀`;
                lblMessage.style.fontSize = '50px';
            }
        }
        
    }
}

function fillUsersListFromLocalStorage() {
    if (localStorage.getItem('usersListKey') == null) {
        lblMessage.innerText = 'local storage is not found';
        lblMessage.style.cssText = 'color: red !important,font-size: 20px; font-weight:800';
        return false;
    }
    else {
        usersList = JSON.parse(localStorage.getItem('usersListKey'));
        lblMessage.innerText = 'local storage is found';
        lblMessage.style.cssText = 'color: green !important; font-size: 20px; font-weight:800';
        return true;
    }
}


function clearLabelMessage() {
    lblMessage.innerHTML = '';
}
