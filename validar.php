<?php

$password=$_POST['Contraseña'];
$email=$_POST['Email'];
session_start();

$_SESSION['password']=$password;

$conn-mysqli_connect("localhost","root","","login");
$consulta="SELECT * FROM login WHERE password='$password and email='$email'";
$resultado-mysqli_query($conn,$consulta);
$filas=mysqli_num_rows($resultado);

if($filas)
{
  header("home.php");
}

else
{

?>


 <?php
  include("index.html")

  ?>

<h2 class="bad"> ERROR </H2>


}

  <?php
}



mysqli_free_result($resultado);
mysqli_close($conn);
  ?>
