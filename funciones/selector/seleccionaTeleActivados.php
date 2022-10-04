<?php

 require_once "../../conexion/conexion.php";

 $conexionRecuperada= new conexion();
 $conexionEstablecida=$conexionRecuperada->cConexion();

  date_default_timezone_set("America/Guayaquil");
  $fecha_actual = date('Y-m-d');
  $hora_actual = new dateTime();
  $hora_actual=$hora_actual->format('H:i:s');	

  extract($_POST);

  $data1=array();

  $query10="SELECT tipoTimbrada FROM th_teletrabajo_timbradas WHERE idUsuario='$idUsuarioRecuperandose' AND fecha='$fecha_actual';";
  $resultadoBase = $conexionEstablecida->query($query10);        

  while($itemBase = $resultadoBase->fetch()) {

    $tipoTimbrada=$itemBase['tipoTimbrada'];  
    array_push($data1, $tipoTimbrada);
          
  }

  $stringTipoT=  implode("------", $data1);

  $mensaje=1;
  $jason['mensaje']=$mensaje;
  $jason['stringTipoT']=$stringTipoT;
  echo json_encode($jason);