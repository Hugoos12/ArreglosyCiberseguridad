const inputs = document.querySelectorAll(".form__input");

function addFocus() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function removeFocus() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
        parent.classList.remove("focus");
    }
}

const inputs = document.querySelectorAll(".form__input");

function addFocus() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function removeFocus() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
        parent.classList.remove("focus");
    }
}

function sendVerificationEmail(email) {
    
    const verificationCode = Math.random().toString(36).substr(2, 5).toUpperCase();
    console.log(`Código de verificación enviado a ${email}: ${verificationCode}`);
    return verificationCode;
}

function showVerificationPopup() {
    const email = document.getElementById('register-email').value;
    const verificationCode = sendVerificationEmail(email);

    
    alert(`Se envió un código de verificación de 5 caracteres a: ${email}`);

    
    const enteredCode = prompt('Ingrese el código de verificación de 5 caracteres:');

    if (enteredCode === null || enteredCode.trim() === '') {
        alert('Por favor, complete el campo del código.');
        return;
    }

    // Validación del código ingresado
    if (enteredCode === verificationCode) {
        
        alert('Código correcto. ¡Registro exitoso!');
        // Puedes agregar animaciones más elaboradas o utilizar bibliotecas como SweetAlert
    } else {
        
        alert('Código incorrecto. Por favor, vuelva a registrarse.');
        // Puedes agregar animaciones más elaboradas o utilizar bibliotecas como SweetAlert
    }
}

function openPopup(email) {
    document.getElementById('popupEmail').innerText = email;
    document.getElementById('verificationPopup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('verificationPopup').style.display = 'none';
}

function showVerificationPopup() {
    const email = document.getElementById('register-email').value;
    sendVerificationEmail(email);
    openPopup(email);
}

function verifyCode() {
    const enteredCode = document.getElementById('verificationCode').value;
    const verificationCode = getVerificationCode(); 
    closePopup();

    if (enteredCode === verificationCode) {
        alert('Código correcto. ¡Registro exitoso!');
        // Puedes agregar animaciones más elaboradas o utilizar bibliotecas como SweetAlert
    } else {
        alert('Código incorrecto. Por favor, vuelva a registrarse.');
        // Puedes agregar animaciones más elaboradas o utilizar bibliotecas como SweetAlert
    }
}


function getVerificationCode() {
    return Math.random().toString(36).substr(2, 5).toUpperCase();
}
