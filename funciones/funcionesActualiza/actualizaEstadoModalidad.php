<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	date_default_timezone_set("America/Guayaquil");

	$fecha_actual = date('Y-m-d');
	$hora_actual= date('H:i:s');


	$query1="UPDATE th_usuario SET modalidad2='$elemento' WHERE id_usuario='$id_usuario';";
	$resultado1 = $conexionEstablecida->exec($query1);

	$query="SELECT PersonaACargo FROM th_usuario WHERE id_usuario='$id_usuario';";
	$resultado = $conexionEstablecida->query($query);

	while($registro = $resultado->fetch()) {

		$PersonaACargo=$registro['PersonaACargo'];
				

	}

	if ($elemento=="presencial") {

		$query2="INSERT INTO `ezonshar_mdepsaddb`.`th_teletrabajo_acentado` (`idTeletratabjoRealizado`, `fecha`, `hora`, `idUsuario`, `accion`, `idUsuarioHabilit`) VALUES (NULL, '$fecha_actual', '$hora_actual', '$id_usuario', 'P', '$PersonaACargo');";
		$resultado2 = $conexionEstablecida->exec($query2);

	}else{

		$query2="INSERT INTO `ezonshar_mdepsaddb`.`th_teletrabajo_acentado` (`idTeletratabjoRealizado`, `fecha`, `hora`, `idUsuario`, `accion`, `idUsuarioHabilit`) VALUES (NULL, '$fecha_actual', '$hora_actual', '$id_usuario', 'T', '$PersonaACargo');";
		$resultado2 = $conexionEstablecida->exec($query2);

	}


	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason); 



