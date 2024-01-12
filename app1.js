document.addEventListener('DOMContentLoaded', function () {
  const emailForm = document.getElementById('email-form');
  const paypalButton = document.querySelector('.paypal-button');
  const bizumButton = document.querySelector('.bizum-button');
  const deliveryButton = document.querySelector('.delivery-button');

  emailForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const recipientEmailInput = document.getElementById('recipient-email');
    const emailValue = emailInput.value.trim();
    const recipientEmailValue = recipientEmailInput.value.trim();

    if (!isValidEmail(emailValue)) {
      showError('Por favor, introduce un correo electrónico válido.');
      return;
    }

    if (!isValidEmail(recipientEmailValue)) {
      showError('Por favor, introduce un correo para la entrega válido.');
      return;
    }

    showConfirmation(emailValue, recipientEmailValue);
  });

  paypalButton.addEventListener('mouseover', function () {
    paypalButton.style.backgroundColor = '#002a4e';
  });

  paypalButton.addEventListener('mouseout', function () {
    paypalButton.style.backgroundColor = '#00457c';
  });

  bizumButton.addEventListener('mouseover', function () {
    bizumButton.style.backgroundColor = '#c0392b';
  });

  bizumButton.addEventListener('mouseout', function () {
    bizumButton.style.backgroundColor = '#e74c3c';
  });

  deliveryButton.addEventListener('mouseover', function () {
    deliveryButton.style.backgroundColor = '#45a049';
  });

  deliveryButton.addEventListener('mouseout', function () {
    deliveryButton.style.backgroundColor = '#4caf50';
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
      title: '¡Correo Valido!',
      html: `Hemos recibido tu correo. <br> Se enviará a: ${recipientEmail}`,
      showCancelButton: false,
      confirmButtonText: 'OK',
      confirmButtonColor: '#00457c',
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    });
  }
});

