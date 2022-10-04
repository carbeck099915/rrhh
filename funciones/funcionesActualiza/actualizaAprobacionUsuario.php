<?php
	require_once "../../conexion/conexion.php";

	extract($_POST);

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();
	
	$query="UPDATE th_usuario SET loginOne = '1' WHERE id_usuario='$idUsuarios';";
	
	
	$resultado = $conexionEstablecida->exec($query);

	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);


