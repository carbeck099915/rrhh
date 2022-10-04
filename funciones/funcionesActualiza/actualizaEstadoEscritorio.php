<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	if ($habilitar=="A") {
		
		$query1="UPDATE th_usuario SET habilitar=NULL WHERE id_usuario='$id_usuario';";
				
	}else{

		$query1="UPDATE th_usuario SET habilitar='A' WHERE id_usuario='$id_usuario';";

	}

	$resultado1 = $conexionEstablecida->exec($query1);

	$mensaje=1;
	$jason['mensaje']=$mensaje;
	echo json_encode($jason); 



