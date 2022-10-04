<?php

	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

 	extract($_POST);

	date_default_timezone_set("America/Guayaquil");

	$fecha_actual = date('Y-m-d');

	$hora_actual= date('H:i:s');

	$query2="SELECT idHoraAlmuerzo,horaAlmuerzo,horaInicio,horaFin,idFisicamenteEstructura,horaIngreso,horaSalida,estado,idUsuario,fecha,hora FROM th_ingresosadmin WHERE idHoraAlmuerzo='$idHoraAlmuerzo';";
	$resultado2 = $conexionEstablecida->query($query2);

	while($registro2 = $resultado2->fetch()) {

		$idHoraAlmuerzo=$registro2['idHoraAlmuerzo'];
		$horaAlmuerzo=$registro2['horaAlmuerzo'];
		$horaInicio=$registro2['horaInicio'];
		$horaFin=$registro2['horaFin'];
		$idFisicamenteEstructura=$registro2['idFisicamenteEstructura'];
		$horaIngreso=$registro2['horaIngreso'];
		$horaSalida=$registro2['horaSalida'];
		$estado=$registro2['estado'];
		$idUsuario=$registro2['idUsuario'];
		$fechaBaseDatos=$registro2['fecha'];
		$horaBaseDatos=$registro2['hora'];		
	}


 	$query3="INSERT INTO `ezonshar_mdepsaddb`.`th_ingresosadmin2` (`idHoraAlmuerzo`, `horaAlmuerzo`, `horaInicio`, `horaFin`, `idFisicamenteEstructura`, `horaIngreso`, `horaSalida`, `estado`, `idUsuario`, `fecha`, `hora`, `fecha2`, `hora2`) VALUES (NULL, '$horaAlmuerzo', '$horaInicio', '$horaFin', '$idFisicamenteEstructura', '$horaIngreso', '$horaSalida', 'I', '$idUsuario', '$fecha_actual', '$hora_actual', '$fechaBaseDatos', '$horaBaseDatos');";
	$resultado3 = $conexionEstablecida->exec($query3);	



 	$query="UPDATE th_ingresosadmin SET estado='I' WHERE idHoraAlmuerzo='$idHoraAlmuerzo';";
	$resultado = $conexionEstablecida->exec($query);	


	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);