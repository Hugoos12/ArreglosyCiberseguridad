const FORM_LOCK_KEY = 'formLocked';
let errorCount = 0;

function isFormLocked() {
    const locked = localStorage.getItem(FORM_LOCK_KEY);
    if (locked) {
        const unlockTime = parseInt(locked, 10);
        const currentTime = new Date().getTime();
        return currentTime < unlockTime;
    }
    return false;
}

function lockForm() {
    const currentTime = new Date().getTime();
    const lockDuration = 24 * 60 * 60 * 1000; 
    const unlockTime = currentTime + lockDuration;
    localStorage.setItem(FORM_LOCK_KEY, unlockTime.toString());
    showTimer();
    showLockAnimation();
}

function unlockForm() {
    localStorage.removeItem(FORM_LOCK_KEY);
}

function showLockedError() {
    const unlockTime = parseInt(localStorage.getItem(FORM_LOCK_KEY), 10);
    const remainingTime = Math.ceil((unlockTime - new Date().getTime()) / 1000);
    const hours = Math.floor(remainingTime / 3600);
    const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
    const remainingSeconds = remainingTime % 60;

    Swal.fire({
        icon: 'error',
        title: 'Formulario Bloqueado',
        html: `Debes esperar ${hours} horas, ${remainingMinutes} minutos y ${remainingSeconds} segundos antes de enviar el formulario nuevamente.`,
        confirmButtonColor: '#00457c',
    });
}

function showTimer() {
    const timerContainer = document.getElementById('timerContainer');
    const timerText = document.getElementById('timerText');
    const unlockTime = parseInt(localStorage.getItem(FORM_LOCK_KEY), 10);

    setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTime = Math.ceil((unlockTime - currentTime) / 1000);
        const hours = Math.floor(remainingTime / 3600);
        const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
        const remainingSeconds = remainingTime % 60;

        timerText.innerHTML = `Debes esperar ${hours} horas, ${remainingMinutes} minutos y ${remainingSeconds} segundos antes de enviar el formulario nuevamente.`;
    }, 3000); 

    timerContainer.style.display = 'block';
}

function showLockAnimation() {
    Swal.fire({
        icon: 'error',
        title: 'Formulario Bloqueado',
        text: 'Has alcanzado el límite de intentos. Debes esperar antes de enviar el formulario nuevamente.',
        confirmButtonColor: '#00457c',
        customClass: {
            container: 'lock-container',
            title: 'lock-title',
            icon: 'lock-icon',
        },
    });
}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minutos y ${remainingSeconds} segundos`;
}

document.getElementById('submitButton').addEventListener('click', function () {
    var fullname = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (!fullname || !email || !message) {
        showError('Todos los campos del formulario son obligatorios.');
        return;
    }

    if (!isValidEmail(email)) {
        showError('Por favor, introduce un correo electrónico válido.');
        return;
    }

    if (isFormLocked()) {
        showLockedError();
        return;
    }

    var emailData = {
        to_email: 'hugosanchezzaya11@gmail.com',
        from_name: fullname,
        from_email: email,
        message: message
    };
    
    emailjs.send('service_zg2iwig', 'template_c7h1k58', emailData)
        .then(function (response) {
            console.log('Correo enviado:', response);
            showConfirmation(email, 'hugosanchezzaya11@gmail.com');
            lockForm();
        })
        .catch(function (error) {
            console.log('Error al enviar el correo:', error);
            showError('Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo más tarde.');
            errorCount++;

            if (errorCount >= 2) {
                lockForm();
                showLockAnimation();
            }
        });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#00457c',
    });
}

function showConfirmation(email, recipientEmail) {
    Swal.fire({
        icon: 'success',
        title: '¡Correo Válido!',
        html: `Hemos recibido tu correo. <br> Se enviará a: ${recipientEmail}`,
        showCancelButton: false,
        confirmButtonText: 'OK',
        confirmButtonColor: '#00457c',
    }).then((result) => {
        if (result.isConfirmed) {

        }
    });
}

function redirectToPago(url) {
    window.location.href = url;
}
