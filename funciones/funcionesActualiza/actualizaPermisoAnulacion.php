<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	date_default_timezone_set("America/Guayaquil");

			$fecha_actual = date('Y-m-d');
			$hora_actual= date('H:i:s');

	$query="UPDATE `ezonshar_mdepsaddb`.`th_generapermiso` SET `estado_permiso` = 'Z',  `PersonaAnula` = '$idPersonaRecupera', `ObservacionAprueba` = '$OnservacionNegacion', `FechaAnula` = '$fecha_actual', `HoraAnula` = '$hora_actual' WHERE `id_generaPermiso` = '$id_generaPermiso';";
	$resultado = $conexionEstablecida->exec($query);

	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);	