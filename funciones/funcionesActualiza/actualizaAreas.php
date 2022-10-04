<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

 	

	extract($_POST);


	$query="UPDATE `ezonshar_mdepsaddb`.`th_estructura1` SET `descripcionestructura1` = '$nombreArea', `estado` = '$estadoArea' WHERE `id_estructura1` = '$id_area';";
	$resultado = $conexionEstablecida->exec($query);


	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);