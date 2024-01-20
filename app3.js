document.addEventListener('DOMContentLoaded', function () {
  const chatBody = document.getElementById('chatBody');
  const userInput = document.getElementById('userInput');
  const sendButton = document.getElementById('sendButton');
  const btnInicio = document.getElementById('btnInicio');
  const usageMessage = document.getElementById('usageMessage');
  const remainingUsesElement = document.getElementById('remainingUses');
  const lockMessage = document.getElementById('lockMessage');
  const timerContainer = document.getElementById('countdownTimer');
  const usageCountContainer = document.getElementById('usageCountNumber');
  const usageCountdownContainer = document.getElementById('usageCountdown');

  let questionsAsked = 0;
  let dailyResetInterval;
  let countdownInterval;
  

  const VALID_QUESTIONS = [
    'Problemas con el pago',
    'Problemas con la página',
    'Problemas con el producto',
    'Problemas con el envío',
    'Problemas con el vendedor',
    'Problemas varios',
    'Problemas con el servicio'
  ];

  const QUESTION_RESPONSES = {
    'Problemas con el pago': 'Sentimos mucho tu inconveniente. Por favor, ponte en contacto con nosotros urgentemente y resolveremos tu problema.',
    'Problemas con la página': 'Lo sentimos mucho. Si deseas contribuir o ayudar a mejorar la web, por favor, ponte en contacto con nosotros.',
    'Problemas con el producto': 'Lo sentimos mucho. Por favor, ponte en contacto con nosotros y, al responder, graba un video donde se muestre el problema para que podamos solucionarlo de manera efectiva.',
    'Problemas con el envío': 'Lo sentimos mucho. Contáctanos para resolver ese problema y te compensaremos de alguna manera.',
    'Problemas con el vendedor': 'Lo sentimos mucho. Contáctanos y explícanos tu problema para poder ayudarte.',
    'Problemas varios': 'Lo sentimos por los problemas que hayas experimentado con nuestro servicio, pago, página web, u otros. Si es necesario, por favor, ponte en contacto con nosotros para obtener más especificaciones.',
    'Problemas con el servicio': 'Lo sentimos mucho por cualquier inconveniente con el servicio. Por favor, ponte en contacto con nuestro equipo a través de la pestaña de contacto, y ellos te responderán al correo que hayas seleccionado.'
  };

  let remainingTime = parseInt(localStorage.getItem('remainingTime'), 10);
  if (isNaN(remainingTime)) {
    remainingTime = RESET_TIME;
  }

  if (remainingTime > 0) {
    showCountdownTimer();
  } else {
    showLockAnimation();
  }
  remainingUsesElement.textContent = remainingUses;

  window.addEventListener('beforeunload', function () {
    localStorage.setItem('remainingTime', remainingTime);
  });

  btnInicio.addEventListener('click', function () {
    window.location.href = 'inicio.html';
  });

  sendButton.addEventListener('click', function () {
    const userQuestion = userInput.value.trim();
    if (userQuestion !== '' && remainingTime > 0) {
      userInput.value = '';
      askQuestion(userQuestion);
    } else if (remainingTime <= 0) {
      showLockAnimation();
    }
  });

  function askQuestion(question) {
    if (questionsAsked < MAX_QUESTIONS_PER_DAY && remainingUses > 0) {
      displayMessage('user', question);

      if (VALID_QUESTIONS.includes(question)) {
        const response = QUESTION_RESPONSES[question] || 'Lo sentimos, pero no hay respuesta para esta pregunta.';
        displayMessage('bot', response);
      } else {
        displayMessage('bot', 'Lo sentimos, pero la pregunta no es válida. Intenta enviar una pregunta válida.');
      }

      questionsAsked++;
      remainingUses--;

      remainingUsesElement.textContent = remainingUses;
      updateUsageCountColor();

      if (remainingUses === 0) {
        showLockAnimation();
      }
    } else {
      showLockAnimation();
    }
  }

  function showLockAnimation() {
    lockMessage.classList.add('active');
    chatBody.classList.add('inactive');
    userInput.disabled = true;
    sendButton.disabled = true;

    setTimeout(function () {
      lockMessage.classList.remove('active');
      chatBody.classList.remove('inactive');
      userInput.disabled = false;
      sendButton.disabled = false;
      resetChat();
    }, remainingTime > 0 ? remainingTime : 1000);
  }

  function showCountdownTimer() {
    if (!countdownInterval) {
      startCountdownTimer();
    }
  }

  function startCountdownTimer() {
    countdownInterval = setInterval(function () {
      remainingTime -= 1000;

      const hours = Math.floor(remainingTime / (60 * 60 * 1000));
      const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

      timerContainer.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
      usageCountdownContainer.textContent = `Tiempo restante: ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

      localStorage.setItem('remainingTime', remainingTime);

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        resetChat();
      }
    }, 1000);
  }

  function formatTime(value) {
    return value < 10 ? `0${value}` : value;
  }

  function resetChat() {
    clearInterval(countdownInterval);
    countdownInterval = null;

    chatBody.innerHTML = '';
    questionsAsked = 0;
    remainingUses = 10;
    remainingUsesElement.textContent = remainingUses;
    usageMessage.textContent = `Quedan ${remainingUses} usos diarios.`;
    usageCountContainer.textContent = remainingUses;
    usageCountContainer.classList.remove('red');
    usageCountContainer.classList.add('green');

    remainingTime = RESET_TIME;
    localStorage.setItem('remainingTime', remainingTime);

    clearInterval(dailyResetInterval);
    dailyResetInterval = setInterval(function () {
      remainingUses = 10;
      remainingUsesElement.textContent = remainingUses;
      usageCountContainer.textContent = remainingUses;
      usageCountContainer.classList.remove('red');
      usageCountContainer.classList.add('green');
    }, RESET_TIME);
  }

  function updateUsageCountColor() {
    if (remainingUses <= 5) {
      usageCountContainer.classList.remove('green');
      usageCountContainer.classList.add('red');
    }
  }

  function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(`${sender}-message`);
    messageElement.textContent = message;

    chatBody.appendChild(messageElement);

    const botResponse = document.createElement('div');
    botResponse.classList.add('bot-message');
    botResponse.textContent = message;
    document.getElementById('botResponses').appendChild(botResponse);

    if (chatBody.children.length > 2) {
      chatBody.innerHTML = '';
    }

    if (sender === 'user' && !VALID_QUESTIONS.includes(message)) {
      displayMessage('bot', 'Lo sentimos, pero la pregunta no es válida. Intenta enviar una pregunta válida.');
    }
  }
});

const ratingStarsContainer = document.getElementById('ratingStars');
const sendRatingButton = document.getElementById('sendRatingButton');
let selectedRating = 0;

ratingStarsContainer.addEventListener('mouseover', handleStarHover);
ratingStarsContainer.addEventListener('mouseout', resetStars);
ratingStarsContainer.addEventListener('click', handleStarClick);
sendRatingButton.addEventListener('click', handleSendRating);

function handleStarHover(event) {
  const star = event.target;
  const starValue = parseInt(star.getAttribute('data-star'), 10);
  fillStars(starValue);
}

function resetStars() {
  fillStars(selectedRating);
}

function handleStarClick(event) {
  const star = event.target;
  selectedRating = parseInt(star.getAttribute('data-star'), 10);
  fillStars(selectedRating);
}

function fillStars(count) {
  for (let i = 1; i <= 5; i++) {
    const star = document.querySelector(`.star[data-star="${i}"]`);
    if (i <= count) {
      star.classList.add('filled');
    } else {
      star.classList.remove('filled');
    }
  }
}

function handleSendRating() {
  if (selectedRating > 0) {
    alert(`¡Gracias por calificar con ${selectedRating} estrella(s)!`);

    // Puedes agregar aquí la lógica para enviar la calificación a tu página de rankings.
   // window.location.href = '';
  } else {
    alert('Por favor, selecciona una calificación antes de enviar.');
  }
}



