<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	if ($legalizadorAtritutos=="aprobado") {
		
		$query="UPDATE th_teletrabajo SET estado='A' WHERE idTeletrabajo='$idTeletrabajo'";
		$resultado = $conexionEstablecida->exec($query);

		$mensaje=1;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);	

	}else{

		$query="UPDATE th_teletrabajo SET estado='N', observacionesDadas='$obseracionDefinida' WHERE idTeletrabajo='$idTeletrabajo'";
		$resultado = $conexionEstablecida->exec($query);

		$mensaje=2;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);	

	}


