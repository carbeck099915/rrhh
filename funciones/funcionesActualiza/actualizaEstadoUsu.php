<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	

	date_default_timezone_set("America/Guayaquil");

		$fecha_actual = date('Y-m-d');


	$query="UPDATE th_usuario SET `estadoUsuario`='$estadoUsuAct', `fechaInactiva` = '$fecha_actual' WHERE id_usuario='$idUsuariosPassword1';";
	$resultado = $conexionEstablecida->exec($query);


	$query1="UPDATE `ezonshar_mdepsaddb`.`th_usuario_roles` SET  `estado` = '$estadoUsuAct' WHERE `id_usuarios_roles` = '$idUsuariosPassword1';";
	$resultado1 = $conexionEstablecida->exec($query1);

	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason); 



