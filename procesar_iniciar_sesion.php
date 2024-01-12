<?php
function iniciarSesion($email, $password) {
    session_start();

    // Conexion a la base de datos (reemplaza los valores con los de tu configuración)
    $servername = "tu_servidor";
    $username = "tu_usuario";
    $password = "tu_contrasena";
    $dbname = "tu_base_de_datos";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar la conexión a la base de datos
    if ($conn->connect_error) {
        die("Error de conexión a la base de datos: " . $conn->connect_error);
    }

    // Consultar si el correo electrónico existe en la base de datos
    $sql = "SELECT * FROM usuarios WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // El correo electrónico existe, verificar la contraseña
        $row = $result->fetch_assoc();
        $hashedPassword = $row['password']; // Asegúrate de que este sea el nombre correcto del campo de contraseña en tu base de datos

        if (password_verify($password, $hashedPassword)) {
            // Contraseña válida, iniciar sesión
            $_SESSION['user_id'] = $row['id']; // Puedes almacenar cualquier otra información de usuario que necesites
            header("Location: inicio.html");
            exit();
        } else {
            // Contraseña incorrecta, mostrar un mensaje de error
            $_SESSION['login_error'] = "Contraseña incorrecta.";
            header("Location: index.html"); // Cambia 'index.php' por la página principal de inicio de sesión
            exit();
        }
    } else {
        // El correo electrónico no está registrado, mostrar un mensaje de error
        $_SESSION['login_error'] = "Debes registrarte primero.";
        header("Location: index.html"); // Cambia 'index.php' por la página principal de inicio de sesión
        exit();
    }

    $conn->close();
}

// Puedes llamar a la función cuando sea necesario
// iniciarSesion($_POST['email'], $_POST['password']);
?>
