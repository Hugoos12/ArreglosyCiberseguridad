<?php

$password=$_POST['Contraseña'];
$email=$_POST['Email'];
session_start();

$_SESSION['password']=$password;
