<?php

  // conexion
  require_once "conexion/conexion.php";

  /*=====================================
  =            Controladores            =
  =====================================*/
  
  // plantilla de la aplicación
  require_once "controladores/plantilla.controlador.php";

  // controlador para manejar el ingreso de los usuarios
  require_once "controladores/ingreso.controlador.php";

  // controlador para manejar el ingreso de los usuarios
  require_once "controladores/controladoresFichas/fichas.controlador.php";  

  require_once "controladores/controladoresFichas/recuperador.controlador.php";  

  /*=====  End of Controladores  ======*/



  $plantilla= new ControladorPlantilla();
  
  $plantilla->ctrPlantilla();

