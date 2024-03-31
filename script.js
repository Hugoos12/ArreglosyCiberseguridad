document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    document.getElementById("contrato").classList.remove("contrato-oculto");
  }, 1000);

  document.getElementById("aceptar").addEventListener("click", function() {
    // Acciones al aceptar
    document.getElementById("boli").classList.add("animacion-boli-mover");
    setTimeout(function() {
      document.getElementById("firma-espacio").style.opacity = "1";
      document.getElementById("firma").classList.add("animacion-firma");
      document.getElementById("mensaje").innerText = "Has aceptado el contrato";
      setTimeout(function() {
        document.getElementById("contrato").classList.add("contrato-oculto"); // Ocultar contrato después de 2 segundos
      }, 2000);
    }, 1000);
    // Guardar que se ha aceptado en la base de datos
  });

  
  });


