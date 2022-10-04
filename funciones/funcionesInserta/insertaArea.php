<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	if (empty($nombreAgregarArea)) {
		

		$mensaje=2;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}else{

		$query="INSERT INTO `ezonshar_mdepsaddb`.`th_estructura1`(`id_estructura1`, `descripcionestructura1`, `estado`) VALUES (NULL, '$nombreAgregarArea', 'A');";
		$resultado = $conexionEstablecida->exec($query);
	
		

		$mensaje=1;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}


