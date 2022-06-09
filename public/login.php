<?php
@include 'connnect to sql database.php';
session_start();
if(isset($_POST['login'])){

    $emails = mysqli_real_escape_string($conn, $_POST['emails']);
    $passwords = mysqli_real_escape_string($conn, $_POST['passwords']);
 

    $select = " SELECT * FROM accounts database WHERE 
    emails = '$emails' 
    && passwords = '$passwords'";

    $result = mysqli_query($conn, $select);
    
    if(mysqli_num_rows($result) > 0){

        $row = mysqli_fetch_array($result);


        if($row['rangerID'] == 'id in database')
        {
            
            header('location:rangerHome.html');
            
        }
  }
  else{
    $error[]= 'incorrect email and password';
}
};
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login page</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <script src="./public/login.js" defer></script>
  <link rel="stylesheet" href="../styles.css">
  <header class="container">
      
  </header>
</head>
<ul>
  <li><a href="index.html">Home</a></li>
  <li><a href="map.html">Map</a></li>
</ul>
<body>

<div class="container" id="loginContainer">
  <form id="loginForm" action="" method="POST">
    <label for="Email" class="loginLabels">Email</label>
    <input class="textInput" type="email" name="email" placeholder="..." id="email">
    <br>
    <label for="Password" class="loginLabels">Password</label>
    <input class="textInput" type="password" name="password" placeholder="..." id="password">
    <br>
    <input type="submit" id="login" value="Log In">
  </form>
</div>

</body>
</html>