function validarPago() {
    var nombre = document.getElementById("nombre").value;
    var tarjeta = document.getElementById("tarjeta").value;
    var vencimiento = document.getElementById("vencimiento").value;
    var cvv = document.getElementById("cvv").value;
  
    if (nombre.trim() === "" || tarjeta.trim() === "" || vencimiento.trim() === "" || cvv.trim() === "") {
      mostrarError("Por favor, completa todos los campos.");
      return;
    }
  
    if (!validarTarjeta(tarjeta)) {
      mostrarError("El número de tarjeta es inválido.");
      return;
    }
  
    // Lógica para realizar el pago
    realizarPago(nombre, tarjeta, vencimiento, cvv);
  }
  
  function validarTarjeta(tarjeta) {
    // Lógica de validación de número de tarjeta (al menos 16 dígitos)
    return /^\d{16}$/.test(tarjeta);
  }
  
  function realizarPago(nombre, tarjeta, vencimiento, cvv) {
    // Simulación de conexión con la pasarela de pagos y transferencia a cuenta bancaria
    // En una implementación real, se utilizaría una pasarela de pagos real y se realizaría una transacción segura
    // Aquí solo se simula el proceso para propósitos de demostración
    var datosPago = {
      nombre: nombre,
      tarjeta: tarjeta,
      vencimiento: vencimiento,
      cvv: cvv,
      monto: 100 // Supongamos que el monto es de 100 unidades monetarias
    };
  
    // Simulamos una petición asíncrona a un servidor para procesar el pago
    fetch('https://api.pasarela-pagos.com/pagar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosPago)
    })
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Hubo un problema con la conexión a la pasarela de pagos.');
      }
      return response.json();
    })
    .then(function(data) {
      if (data.status === 'success') {
        mostrarExito(nombre);
        enviarTicketPorCorreo(nombre, tarjeta);
      } else {
        throw new Error(data.message);
      }
    })
    .catch(function(error) {
      mostrarError(error.message);
    });
  }
  
  function enviarTicketPorCorreo(nombre, tarjeta) {
    // Lógica para enviar el ticket por correo electrónico
    // Aquí se simula el envío del ticket
    // En una implementación real, se utilizaría un servicio de correo electrónico
    setTimeout(function() {
      alert('Se ha enviado el ticket de pago a ' + nombre + ' al correo asociado a la tarjeta ' + tarjeta);
    }, 3000); // Simulamos una demora de 3 segundos antes de enviar el ticket
  }
  
  function mostrarExito(nombre) {
    var respuesta = document.getElementById("respuesta");
    respuesta.innerHTML = '¡Pago exitoso para ' + nombre + '! 😊';
    respuesta.style.color = '#008000';
    respuesta.style.display = 'block';
  }
  
  function mostrarError(mensaje) {
    var respuesta = document.getElementById("respuesta");
    respuesta.innerHTML = 'Error: ' + mensaje + ' 😔';
    respuesta.style.color = '#ff0000';
    respuesta.style.display = 'block';
  }
  


  document.addEventListener("DOMContentLoaded", function() {
    
    function actualizarFechaHora() {
      var fechaActual = new Date();
      var fecha = fechaActual.toLocaleDateString("es-ES");
      var hora = fechaActual.toLocaleTimeString("es-ES");
      document.getElementById("fecha").innerText = fecha;
      document.getElementById("hora").innerText = hora;
    }
  
    
    actualizarFechaHora();
  
    
    setInterval(actualizarFechaHora, 60000); 
  });
