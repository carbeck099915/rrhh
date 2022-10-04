<?php

  // requeridos
  require_once "../../conexion/conexion.php";

  extract($_POST);

  // conexionesd
  $conexionRecuperada= new conexion();
  $conexionEstablecida=$conexionRecuperada->cConexion();

  // variables longitud y latitud
  $lond = $_POST["ubilat"];
  $latd = $_POST["ubilon"];

  settype($latd, 'float'); 
  settype($lond, 'float'); 
       
  $varlt = $latd;
  $varlg = $lond;
       
  $varlt = (double) $varlt;
  $varlg = (double) $varlg;

  // horas y fechas
  date_default_timezone_set("America/Guayaquil");
  $fecha_actual = date('Y-m-d');
  $hora_actual = new dateTime();
  $hora_actual=$hora_actual->format('H:i:s');

  $query10="SELECT idTeletrabajoPresencia FROM th_teletrabajo_timbradas WHERE tipoTimbrada='$tipoTimbradas' AND fecha='$fecha_actual' AND idUsuario='$idUsuario';";
  $resultadoBase = $conexionEstablecida->query($query10);        

  while($itemBase = $resultadoBase->fetch()) {

    $idTeletrabajoPresencia=$itemBase['idTeletrabajoPresencia'];  
          
  }

  if ( $fecha_actual == $fecha_actual && !empty($idTeletrabajoPresencia)) {
  	
	$mensaje=2;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);

  }else{

  	 $query="INSERT INTO `ezonshar_mdepsaddb`.`th_teletrabajo_timbradas` (`idTeletrabajoPresencia`, `idUsuario`, `fecha`, `hora`, `longitud`, `latitud`, `ipPublica`, `tipoTimbrada`) VALUES (NULL, '$idUsuario', '$fecha_actual', '$hora_actual', '$varlg', '$varlt', '$ipEscogidas','$tipoTimbradas');";
  	$resultado = $conexionEstablecida->exec($query);

	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);

  }





