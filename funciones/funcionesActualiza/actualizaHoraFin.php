<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	date_default_timezone_set("America/Guayaquil");

	$fecha_actual = date('Y-m-d');

	$query2="SELECT a.idAlmuerzo,b.fisicamenteEstructura FROM th_almuerzo AS a 
	INNER JOIN th_usuario AS b ON a.idUsuario=b.id_usuario WHERE a.idUsuario='$idUsuario';";
	$resultado2 = $conexionEstablecida->query($query2);

	while($registro = $resultado2->fetch()) {

		$idAlmuerzo=$registro['idAlmuerzo'];
		$fisicamenteEstructura=$registro['fisicamenteEstructura'];		

	}


	if (empty($idAlmuerzo)) {
		
		$query="INSERT INTO `ezonshar_mdepsaddb`.`th_almuerzo` (`idAlmuerzo`, `idUsuario`, `horaInicio`, `horaFinal`, `fechaIngreso`) 
		VALUES (NULL, '$idUsuario', NULL, '$horaInicios', '$fecha_actual');";
		$resultado = $conexionEstablecida->exec($query);


	}else{

		$query="UPDATE th_almuerzo SET horaFinal='$horaInicios' WHERE idUsuario='$idUsuario';";
		$resultado = $conexionEstablecida->exec($query);

	}

	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);