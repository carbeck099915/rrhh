<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	$fecha_actual = date('Y-m-d');
	$hora_actual= date('H:i:s');

	$query1="UPDATE th_presencial SET estado='I', fechaNiega='$fecha_actual', horaNiega='$hora_actual',observaNegacion='$observacion' WHERE localStorage='$localStorage' AND idUsuario='$idUsuario';";
	$resultado1 = $conexionEstablecida->exec($query1);

	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason); 



