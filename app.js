document.addEventListener('DOMContentLoaded', function () {
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const container = document.getElementById('container');

  const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_DOMINIO.firebaseapp.com",
    projectId: "TU_PROYECTO_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};
firebase.initializeApp(firebaseConfig);

  signUpButton.addEventListener('click', () => container.classList.add('right-panel-active'));
  signInButton.addEventListener('click', () => container.classList.remove('right-panel-active'));

  const googleSignInButton = document.getElementById('googleSignIn');
  googleSignInButton.addEventListener('click', async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
          const result = await firebase.auth().signInWithPopup(provider);
          
          window.location.href = 'inicio.html';
      } catch (error) {
          console.error(error.message);
      }
  });


  
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = this.querySelector('input[name="name"]').value;
      const email = this.querySelector('input[name="email"]').value;
      const password = this.querySelector('input[name="password"]').value;

      
      if (validateEmail(email) && validatePassword(password)) {
          // Envía los datos al servidor para el registro
          // Puedes usar Fetch API o AJAX para enviar estos datos al servidor
          console.log('Datos enviados para el registro:', name, email, password);
      } else {
          alert('Verifica que los datos ingresados sean válidos.');
      }
  });

  
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const email = this.querySelector('input[name="email"]').value;
      const password = this.querySelector('input[name="password"]').value;

      // Realizar validaciones y enviar datos al servidor para el inicio de sesión
      if (validateEmail(email) && validatePassword(password)) {
          // Envía los datos al servidor para el inicio de sesión
          // Puedes usar Fetch API o AJAX para enviar estos datos al servidor
          console.log('Datos enviados para el inicio de sesión:', email, password);
      } else {
          alert('Verifica que los datos ingresados sean válidos.');
      }
  });

  
  function validateEmail(email) {
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
  }

  
  function validatePassword(password) {
      return password.length >= 7;
  }
});
