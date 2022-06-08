<?php

@include 'connect to the database.php';

session_start();
session_unset();
session_destroy();

header('location:index.html');

?>
