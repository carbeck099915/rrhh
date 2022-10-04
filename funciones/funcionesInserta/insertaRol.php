<?php
	require_once "../../conexion/conexion.php";

	$conexionRecuperada= new conexion();
 	$conexionEstablecida=$conexionRecuperada->cConexion();

	extract($_POST);

	if (empty($nombreAgregarRol) || empty($tipodeRol)) {
		

		$mensaje=2;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}else{

		$query="INSERT INTO `ezonshar_mdepsaddb`.`th_roles`(`id_rol`, `nombre`, `estado`, `tipo`) VALUES (NULL, '$nombreAgregarRol', 'A','$tipodeRol');";
		$resultado = $conexionEstablecida->exec($query);
	
	

		$mensaje=1;
		$jason['mensaje']=$mensaje;
		echo json_encode($jason);

	}


