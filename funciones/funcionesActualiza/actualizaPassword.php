<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	$passwordEncriptado=sha1($passwordModificado);

	$query="UPDATE th_usuario SET `password`='$passwordEncriptado', loginOne = '0' WHERE id_usuario='$idUsuariosPassword';";
	$resultado = $conexionEstablecida->exec($query);

	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);