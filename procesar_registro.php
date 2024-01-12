<?php
session_start();

// Tu lógica de validación de registro aquí

// Verificar si el correo ya está registrado
$email = $_POST['email'];

// Tu lógica de validación de correo registrado aquí
$correoRegistrado = /* Implementa tu lógica para verificar si el correo está registrado */;

if ($correoRegistrado) {
    // El correo ya está registrado, mostrar un mensaje de error
    $_SESSION['registration_error'] = "Este correo ya está registrado.";
    header("Location: index.html"); 
    exit();
}

// Lógica para insertar el nuevo usuario en la base de datos (asegúrate de utilizar hash para la contraseña)

// Redireccionar a inicio.html después del registro exitoso
header("Location: inicio.html");
exit();
?>
