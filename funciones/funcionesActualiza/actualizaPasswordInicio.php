<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	$passwordEncriptado=sha1($nombrecontrasenaInicial);

	$query="UPDATE th_usuario SET `password`='$passwordEncriptado' WHERE id_usuario='$idPersonaRecupera';";
	$resultado = $conexionEstablecida->exec($query);

	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason);