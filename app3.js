document.addEventListener('DOMContentLoaded', function () {
  const chatBody = document.getElementById('chatBody');
  const userInput = document.getElementById('userInput');
  const sendButton = document.getElementById('sendButton');
  const btnInicio = document.getElementById('btnInicio');

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

  btnInicio.addEventListener('click', function () {
    window.location.href = 'inicio.html';
  });

  sendButton.addEventListener('click', function () {
    const userQuestion = userInput.value.trim();
    if (userQuestion !== '') {
      userInput.value = '';
      askQuestion(userQuestion);
    }
  });

  function askQuestion(question) {
    displayMessage('user', question);

    if (VALID_QUESTIONS.includes(question)) {
      const response = QUESTION_RESPONSES[question] || 'Lo sentimos, pero no hay respuesta para esta pregunta.';
      displayMessage('bot', response);
    } else {
      displayMessage('bot', 'Lo sentimos, pero la pregunta no es válida. Intenta enviar una pregunta válida.');
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
  } else {
    alert('Por favor, selecciona una calificación antes de enviar.');
  }
}
