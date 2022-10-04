<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

 	

	extract($_POST);


	$query="UPDATE th_roles SET nombre='$nombreRol', estado='$estadoRol' WHERE id_rol='$id_rol';";
	$resultado = $conexionEstablecida->exec($query);


	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);